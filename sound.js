// ============================================
//  QUIZ PUP SOUNDS AND MUSIC
//  Every sound is made with code - no sound files to download!
//  Try changing the beat speed, the chords or the volumes.
// ============================================
const MUSIC_VOLUME = 0.22;
const SOUND_VOLUME = 0.5;
const BEAT_SPEED = 90; // beats per minute - classic hip hop speed!

// The piano chords in the music (as piano key numbers: 60 = middle C)
// Am, F, C, G - one chord per bar, then it loops
const CHORDS = [
  [57, 60, 64],
  [53, 57, 60],
  [48, 52, 55],
  [55, 59, 62],
];

// Which steps of the bar the drums play on (8 steps per bar)
const KICK_STEPS = [0, 3, 5];
const SNARE_STEPS = [2, 6];

let audio = null;
let sfxOut = null;
let musicOut = null;
let noiseBuffer = null;
let soundOn = loadSetting("quiz-pup-sound", true);
let musicOn = loadSetting("quiz-pup-music", true);
let musicTimer = null;
let nextStepTime = 0;
let stepCount = 0;

function loadSetting(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value === "on";
  } catch (e) {
    return fallback;
  }
}

function saveSetting(key, on) {
  try {
    localStorage.setItem(key, on ? "on" : "off");
  } catch (e) {
    // can't remember it in this browser - that's OK
  }
}

// Browsers only allow sound after you click something, so this starts it up the first time
function getAudio() {
  if (!audio) {
    const AudioMaker = window.AudioContext || window.webkitAudioContext;
    if (!AudioMaker) return null;
    audio = new AudioMaker();
    sfxOut = audio.createGain();
    sfxOut.gain.value = SOUND_VOLUME;
    sfxOut.connect(audio.destination);
    musicOut = audio.createGain();
    musicOut.gain.value = MUSIC_VOLUME;
    musicOut.connect(audio.destination);
  }
  if (audio.state === "suspended") audio.resume();
  return audio;
}

function noteFreq(key) {
  return 440 * Math.pow(2, (key - 69) / 12);
}

// ---------- Sound building blocks ----------
// One beep. "slideTo" makes the pitch slide (for woofs and boings).
function tone(freq, start, length, wave, volume, out, slideTo) {
  const osc = audio.createOscillator();
  const vol = audio.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, start);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, start + length);
  vol.gain.setValueAtTime(0.0001, start);
  vol.gain.exponentialRampToValueAtTime(volume, start + 0.01);
  vol.gain.exponentialRampToValueAtTime(0.0001, start + length);
  osc.connect(vol);
  vol.connect(out);
  osc.start(start);
  osc.stop(start + length + 0.05);
}

// A piano-ish note that fades out
function piano(key, start, length, volume, out) {
  tone(noteFreq(key), start, length, "triangle", volume, out);
  tone(noteFreq(key + 12), start, length * 0.6, "sine", volume * 0.3, out);
}

// A burst of hiss, shaped by a filter (for drums, splats and crashes)
function noise(start, length, volume, out, filterType, filterFreq) {
  if (!noiseBuffer) {
    noiseBuffer = audio.createBuffer(1, audio.sampleRate, audio.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = audio.createBufferSource();
  src.buffer = noiseBuffer;
  const filter = audio.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  const vol = audio.createGain();
  vol.gain.setValueAtTime(volume, start);
  vol.gain.exponentialRampToValueAtTime(0.0001, start + length);
  src.connect(filter);
  filter.connect(vol);
  vol.connect(out);
  src.start(start);
  src.stop(start + length + 0.05);
}

// ---------- Sound effects ----------
function play(makeSound) {
  if (!soundOn || !getAudio()) return;
  makeSound(audio.currentTime + 0.02, sfxOut);
}

const sfx = {
  click: () => play((t, out) => tone(880, t, 0.05, "square", 0.05, out)),

  // Happy piano run up
  right: () => play((t, out) => [72, 76, 79, 84].forEach((k, i) => piano(k, t + i * 0.09, 0.5, 0.35, out))),

  // Sad trombone: wah wah wah waaaah
  wrong: () => play((t, out) => {
    [58, 57, 56].forEach((k, i) => tone(noteFreq(k), t + i * 0.3, 0.28, "sawtooth", 0.08, out));
    tone(noteFreq(55), t + 0.9, 0.9, "sawtooth", 0.08, out, noteFreq(52));
  }),

  coin: () => play((t, out) => {
    tone(988, t, 0.08, "square", 0.1, out);
    tone(1319, t + 0.08, 0.35, "square", 0.1, out);
  }),

  // Level passed: a little piano fanfare
  fanfare: () => play((t, out) => {
    [60, 64, 67].forEach((k, i) => piano(k, t + i * 0.12, 0.4, 0.3, out));
    [72, 76, 79].forEach(k => piano(k, t + 0.4, 1.2, 0.25, out));
  }),

  // You win: da da da DAAAA!
  win: () => play((t, out) => {
    [[67, 0], [67, 0.15], [67, 0.3]].forEach(([k, at]) => piano(k, t + at, 0.15, 0.35, out));
    piano(72, t + 0.45, 0.5, 0.4, out);
    [72, 76, 79, 84].forEach(k => piano(k, t + 0.95, 1.8, 0.25, out));
    noise(t + 0.95, 1.2, 0.15, out, "highpass", 6000);
  }),

  bark: () => play((t, out) => {
    [0, 0.22].forEach(at => {
      tone(420, t + at, 0.14, "sawtooth", 0.2, out, 160);
      noise(t + at, 0.08, 0.25, out, "bandpass", 900);
    });
  }),

  boing: () => play((t, out) => tone(150, t, 0.4, "sine", 0.4, out, 700)),
  splat: () => play((t, out) => {
    noise(t, 0.3, 0.5, out, "lowpass", 500);
    tone(140, t, 0.25, "sine", 0.4, out, 50);
  }),
  hiss: () => play((t, out) => noise(t, 0.9, 0.12, out, "highpass", 4000)),
  crash: () => play((t, out) => {
    noise(t, 0.6, 0.4, out, "highpass", 2500);
    [1200, 1700, 2300].forEach((f, i) => tone(f, t + i * 0.04, 0.4, "triangle", 0.08, out));
  }),
  burp: () => play((t, out) => tone(110, t, 0.45, "sawtooth", 0.15, out, 60)),
  raspberry: () => play((t, out) => {
    tone(90, t, 0.5, "sawtooth", 0.15, out, 70);
    noise(t, 0.5, 0.2, out, "bandpass", 300);
  }),

  // Robot host talking: bleep bloop
  robotTalk: () => play((t, out) => {
    for (let i = 0; i < 4; i++) tone(300 + Math.random() * 600, t + i * 0.07, 0.06, "square", 0.05, out);
  }),

  // A new player's turn
  turn: () => play((t, out) => {
    piano(67, t, 0.2, 0.3, out);
    piano(72, t + 0.15, 0.5, 0.3, out);
  }),
};

// ---------- Music: a hip hop beat with piano chords ----------
function startMusic() {
  if (!musicOn || musicTimer || !getAudio()) return;
  nextStepTime = audio.currentTime + 0.1;
  stepCount = 0;
  musicTimer = setInterval(planMusic, 50);
}

function stopMusic() {
  clearInterval(musicTimer);
  musicTimer = null;
}

// Plan the next few steps of music a little ahead, so it never stutters
function planMusic() {
  const stepLength = 60 / BEAT_SPEED / 2;
  while (nextStepTime < audio.currentTime + 0.2) {
    // Hip hop swing: every other step is a little late
    const swing = stepCount % 2 === 1 ? stepLength * 0.18 : 0;
    playStep(stepCount, nextStepTime + swing, stepLength);
    nextStepTime += stepLength;
    stepCount++;
  }
}

function playStep(count, t, stepLength) {
  const step = count % 8;
  const chord = CHORDS[Math.floor(count / 8) % CHORDS.length];

  if (KICK_STEPS.includes(step)) {
    tone(150, t, 0.3, "sine", 0.9, musicOut, 40);                  // kick drum
    tone(noteFreq(chord[0] - 24), t, 0.35, "sine", 0.35, musicOut); // bass
  }
  if (SNARE_STEPS.includes(step)) {
    noise(t, 0.15, 0.45, musicOut, "bandpass", 1800);               // snare
    tone(190, t, 0.08, "triangle", 0.2, musicOut);
  }
  noise(t, 0.04, step % 2 === 0 ? 0.12 : 0.06, musicOut, "highpass", 7000); // hi-hat

  if (step === 0) chord.forEach(k => piano(k, t, stepLength * 7, 0.09, musicOut));
  if (step === 3) chord.forEach(k => piano(k + 12, t, stepLength * 1.5, 0.05, musicOut));
}

// ---------- On/off buttons ----------
function showSoundButtons() {
  const soundBtn = document.getElementById("toggle-sound");
  const musicBtn = document.getElementById("toggle-music");
  soundBtn.textContent = soundOn ? "🔊" : "🔇";
  soundBtn.title = soundOn ? "Sound effects: ON" : "Sound effects: OFF";
  musicBtn.classList.toggle("off", !musicOn);
  musicBtn.title = musicOn ? "Music: ON" : "Music: OFF";
}

document.getElementById("toggle-sound").addEventListener("click", () => {
  soundOn = !soundOn;
  saveSetting("quiz-pup-sound", soundOn);
  showSoundButtons();
  sfx.click();
});

document.getElementById("toggle-music").addEventListener("click", () => {
  musicOn = !musicOn;
  saveSetting("quiz-pup-music", musicOn);
  showSoundButtons();
  if (musicOn) startMusic();
  else stopMusic();
});

// The first click anywhere starts the music. Most buttons also go "blip".
const QUIET_BUTTONS = ".answer, .buy-button, .trick-button, .tease-button, #toggle-sound, #toggle-music";
document.addEventListener("click", e => {
  startMusic();
  const btn = e.target.closest("button");
  if (btn && !btn.matches(QUIET_BUTTONS)) sfx.click();
});

// The robot host bleeps whenever it talks
new MutationObserver(() => {
  if (host().key === "robot") sfx.robotTalk();
}).observe(document.getElementById("host-says"), { childList: true, characterData: true, subtree: true });

showSoundButtons();
