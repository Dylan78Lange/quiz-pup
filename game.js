// ============================================
//  QUIZ PUP  -  game code
// ============================================

// Game settings - try changing these!
const LIVES = 3;
const QUESTIONS_PER_LEVEL = 3;
const HARD_ROUNDS = 3; // to win, beat Hard in this many different themes
const LOGO_QUESTIONS_PER_LEVEL = 2; // in Brand Icons, at least this many questions show a real logo
const LEVELS = [
  { key: "easy",   name: "EASY",   coins: 100 },
  { key: "medium", name: "MEDIUM", coins: 250 },
  { key: "hard",   name: "HARD",   coins: 500 },
];

// The hosts and the things they say - add your own lines (or a whole new host!)
const HOSTS = [
  {
    key: "human", name: "Human", // drawn in hosts.js
    hello: ["Welcome, welcome, WELCOME to Quiz Pup!", "It's showtime, baby!", "Are you ready to rumble... with your pup?"],
    ask:   ["Here comes your question...", "Ooh, this one's tricky!", "Think carefully...", "Final answer?"],
    right: ["That's... CORRECT!", "Fan-DOG-tastic!", "You're on fire!", "Woof-derful!"],
    wrong: ["Oooh, so close!", "Not quite, superstar!", "Ruh-roh!", "Better luck next time!"],
  },
  {
    key: "robot", name: "Robot",
    hello: ["BEEP BOOP! WELCOME, HUMAN, TO QUIZ PUP!", "SHOWTIME MODE: ACTIVATED!", "GREETINGS, PUP OWNER. PREPARE TO QUIZ!"],
    ask:   ["COMPUTING QUESTION... BEEP!", "THIS ONE MAKES MY CIRCUITS TINGLE.", "PROCESSING... PLEASE ANSWER.", "FINAL ANSWER? BLEEP BLOOP?"],
    right: ["CORRECT! DOES NOT COMPUTE... YOU ARE TOO SMART!", "BEEP BEEP! WOOF-DERFUL!", "SUCCESS! MY LIGHTS ARE FLASHING!", "100% CORRECT. HIGH FIVE, HUMAN!"],
    wrong: ["ERROR! ERROR! WRONG ANSWER!", "BZZZT! NOT QUITE!", "SYSTEM SAYS: SO CLOSE!", "OOPS. RECALCULATING..."],
  },
];
const HOST_KEY = "quiz-pup-host"; // remembers which host you picked

// Naughty things the pup does when you get one wrong - add your own!
// "move" is the animation the full-body pup does (see "Full-body pup" in style.css)
// "sound" is one of the sounds in sound.js
// (You can also use "effect" for an emoji that pops up above the pup, with "how": "pop" or "drop")
const NAUGHTY_THINGS = [
  { says: "Uh-oh... the pup is peeing on the stage!", move: "pee", sound: "hiss" },
  { says: "Ewww! The pup pooped on the stage!", move: "poop", sound: "splat" },
  { says: "GRRR! The pup is growling at you!", move: "growl", sound: "bark" },
  { says: "CRASH! The pup knocked over the vase!", move: "vase", sound: "crash" },
  { says: "The pup ate the host's homework... and burped!", move: "homework", sound: "burp" },
  { says: "The pup is chasing its own tail!", move: "chase", sound: "boing" },
];

// Fun names for players who don't type one (letters only, up to 8)
const PLAYER_NAMES = ["ROCKSTAR", "CHAMP", "GENIUS", "WIZARD", "LEGEND", "TURBO", "MAESTRO",
  "SPARKY", "BRAINIAC", "HOTSHOT", "ACE", "BLAZE", "COMET", "ZIGZAG", "DJ", "MC"];
// Fun names for pups (up to 14 letters)
const PUP_NAMES = ["Biscuit", "Waffles", "Noodle", "Sir Barksalot", "Captain Fluff", "DJ Woofer",
  "Professor Paws", "Sprinkles", "Meatball", "Pickles", "Mr Wiggles", "Princess Pom",
  "Beethoven", "Lil Woof", "MC Barkley", "Cookie Dough"];

const LETTERS = ["A", "B", "C", "D"];
const MAX_SCORES = 10;               // how many players fit on the Top Score Board
const SCORES_KEY = "quiz-pup-scores"; // where scores are saved in the browser

const $ = id => document.getElementById(id);
const questionEl = $("question");
const themeEl = $("theme");
const answersEl = $("answers");
const hostSaysEl = $("host-says");
const dogEl = $("dog");
const effectEl = $("effect");
const progressEl = $("progress");
const potEl = $("pot");
const livesEl = $("lives");
const levelNameEl = $("level-name");
const bankNumEl = $("bank-num");
const nextBtn = $("next");
const passBtn = $("pass");

let players = [];     // everyone playing (see makePlayer)
let turn = 0;         // whose turn it is (0 = player 1)
let setupIndex = 0;   // which player is filling in their name
let chosenBreed = BREEDS[0].key;
let lastWrong = false;
let afterEnd = null;  // what the big button on the end screen does
let savedIds = [];    // scores saved at the end of the last game
let memoryScores = []; // backup in case the browser can't save
let hostKey = loadHostChoice();

// ---------- Host ----------
function host() {
  return HOSTS.find(h => h.key === hostKey) || HOSTS[0];
}

function loadHostChoice() {
  try {
    return localStorage.getItem(HOST_KEY) || HOSTS[0].key;
  } catch (e) {
    return HOSTS[0].key;
  }
}

function chooseHost(key) {
  hostKey = key;
  try {
    localStorage.setItem(HOST_KEY, key);
  } catch (e) {
    // can't remember it in this browser - that's OK
  }
  showHost();
}

// Put the chosen host on stage and light up their button on the start screen
function showHost() {
  $("host-face").innerHTML = hostSvg(host().key);
  $("host").className = host().key;
  const buttonsEl = $("host-buttons");
  buttonsEl.innerHTML = "";
  HOSTS.forEach(h => {
    const btn = document.createElement("button");
    btn.className = "host-button" + (h.key === hostKey ? " chosen" : "");
    btn.innerHTML = '<span class="host-mini">' + hostSvg(h.key) + "</span>" + h.name;
    btn.addEventListener("click", () => chooseHost(h.key));
    buttonsEl.appendChild(btn);
  });
}

// The host says something: the words type out, the mouth moves, and they can do a gesture
// ("wave", "point", "cheer" or "facepalm")
let lastSaid = "";
let typingTimer = null;
let talkingTimer = null;

function say(text, gesture) {
  const face = $("host-face");
  lastSaid = text;
  clearInterval(typingTimer);
  clearTimeout(talkingTimer);

  // Type the words out a couple of letters at a time
  let shown = 0;
  hostSaysEl.textContent = "";
  typingTimer = setInterval(() => {
    shown += 2;
    hostSaysEl.textContent = text.slice(0, shown);
    if (shown >= text.length) clearInterval(typingTimer);
  }, 35);

  // Talk for as long as the typing takes
  face.classList.add("talking");
  talkingTimer = setTimeout(() => face.classList.remove("talking"), Math.max(600, text.length * 18));
  if (host().key === "robot") sfx.robotTalk();

  if (gesture) {
    face.classList.remove("wave", "point", "cheer", "facepalm");
    void face.offsetWidth; // restart the animation if it's the same gesture again
    face.classList.add(gesture);
  }
}

function makePlayer(number) {
  return {
    name: "P" + number,
    dogName: "Biscuit",
    breed: BREEDS[0].key,
    lives: LIVES,
    bank: 0,          // coins saved forever (banked)
    pot: 0,           // coins won this level, not banked yet
    levelIndex: 0,    // 0 = easy, 1 = medium, 2 = hard
    hardWins: [],     // themes this player has beaten on Hard
    theme: "",
    levelQuestions: [], // empty = needs to pick a theme for a new level
    seen: [],         // questions already asked this game (so they don't come back)
    current: 0,
    results: [],      // true for a right answer, false for wrong
    owned: { toys: [], wear: "", tricks: [] }, // things from the Pup Shop
    done: false,      // finished playing (won, quit or out of lives)
    ending: "",       // "won", "quit" or "out"
  };
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function me() {
  return players[turn];
}

function level() {
  return LEVELS[me().levelIndex];
}

function onHard(p) {
  return p.levelIndex === LEVELS.length - 1;
}

// "EASY", "MEDIUM", or "HARD 2 of 3" on the last level
function levelLabel() {
  const p = me();
  if (!onHard(p)) return level().name;
  return level().name + " " + Math.min(p.hardWins.length + 1, HARD_ROUNDS) + " of " + HARD_ROUNDS;
}

function stillPlaying() {
  return players.filter(p => !p.done);
}

function showOverlay(id) {
  document.querySelectorAll(".overlay").forEach(o => o.classList.add("hidden"));
  if (id) $(id).classList.remove("hidden");
  $("go-home").classList.toggle("hidden", id === "start-screen"); // no home button on the home screen
}

// The 🏠 button: go back to the home screen (asks first if a game is still going)
function goHome() {
  const playing = players.length > 0 && stillPlaying().length > 0;
  if (playing && !confirm("Go back to the home screen? This game will end.")) return;
  players = [];
  turn = 0;
  showOverlay("start-screen");
}

// A pup picture with its hat on. "full" = the big full-body pup for the stage.
function pupHtml(p, full) {
  return '<span class="hat">' + p.owned.wear + "</span>" + (full ? dogBodySvg(p.breed) : dogSvg(p.breed));
}

// ---------- Setup ----------
function newGame() {
  $("setup-count").classList.remove("hidden");
  $("setup-player").classList.add("hidden");
  showOverlay("setup-screen");
}

function chooseCount(howMany) {
  players = [];
  for (let i = 1; i <= howMany; i++) players.push(makePlayer(i));
  setupIndex = 0;
  $("setup-count").classList.add("hidden");
  $("setup-player").classList.remove("hidden");
  showPlayerForm();
}

function showPlayerForm() {
  $("setup-title").textContent = players.length > 1 ? "PLAYER " + (setupIndex + 1) : "WHO'S PLAYING?";
  $("player-name").value = "";
  $("pup-name").value = "";
  $("player-name").placeholder = freshName(PLAYER_NAMES, "name");
  $("pup-name").placeholder = freshName(PUP_NAMES, "dogName");
  chosenBreed = BREEDS[setupIndex % BREEDS.length].key;
  showBreedButtons();
  $("setup-next").textContent = setupIndex + 1 < players.length ? "Next player ▶" : "Let's go! ★";
  $("player-name").focus();
}

// A random name nobody else in this game has yet
function freshName(list, field) {
  const taken = players.slice(0, setupIndex).map(p => p[field]);
  const free = list.filter(n => !taken.includes(n));
  return pick(free.length > 0 ? free : list);
}

// The 🎲 buttons: fill in a new random name
function rollName(inputId, list, field) {
  const input = $(inputId);
  let name = freshName(list, field);
  if (name === input.value && list.length > 1) name = freshName(list.filter(n => n !== name), field);
  input.value = name;
}

function showBreedButtons() {
  const el = $("breed-buttons");
  el.innerHTML = "";
  BREEDS.forEach(b => {
    const btn = document.createElement("button");
    btn.className = "breed-button" + (b.key === chosenBreed ? " chosen" : "");
    btn.innerHTML = dogSvg(b.key) + "<span>" + b.name + "</span>";
    btn.addEventListener("click", () => { chosenBreed = b.key; showBreedButtons(); });
    el.appendChild(btn);
  });
}

function savePlayerForm() {
  const p = players[setupIndex];
  // Names are letters only, like an arcade game
  p.name = $("player-name").value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || $("player-name").placeholder;
  p.dogName = $("pup-name").value.trim().slice(0, 14) || $("pup-name").placeholder;
  p.breed = chosenBreed;
  setupIndex++;
  if (setupIndex < players.length) {
    showPlayerForm();
  } else {
    turn = 0;
    startTurn();
  }
}

// ---------- Turns ----------
function startTurn() {
  showStage();
  if (players.length > 1) {
    const p = me();
    $("turn-dog").innerHTML = pupHtml(p);
    $("turn-title").textContent = p.name + "'S TURN!";
    $("turn-text").textContent = "Pass the laptop to " + p.name + ". " + p.dogName + " is ready!";
    showOverlay("turn-screen");
    sfx.turn();
  } else {
    continueTurn();
  }
}

function continueTurn() {
  showOverlay(null);
  showStage();
  if (me().levelQuestions.length === 0) {
    showThemePicker();
  } else {
    showQuestion();
    if (players.length > 1) say("Welcome back, " + me().name + "! " + lastSaid, "wave");
  }
}

// Move on to the next player who is still playing
function endTurn() {
  if (stillPlaying().length === 0) return showFinal();
  do {
    turn = (turn + 1) % players.length;
  } while (me().done);
  startTurn();
}

// Pass: hand over to the next player. You get a different question when it's your turn again.
function passTurn() {
  const p = me();
  const fresh = pickQuestions(p.theme, level().key, 1, p.levelQuestions.concat(p.seen));
  if (fresh.length > 0) {
    p.levelQuestions[p.current] = fresh[0];
    p.seen.push(fresh[0]);
  }
  endTurn();
}

// ---------- Stage ----------
function showHud() {
  const p = me();
  livesEl.textContent = "❤️".repeat(p.lives) + "🖤".repeat(Math.max(0, LIVES - p.lives));
  levelNameEl.textContent = (players.length > 1 ? p.name + " • " : "") + levelLabel();
  levelNameEl.className = level().key;
  bankNumEl.textContent = p.bank;
}

function showStage() {
  const p = me();
  showHud();
  dogEl.innerHTML = pupHtml(p, true);
  $("toys").textContent = p.owned.toys.join(" ");
  $("dog-name").textContent = p.dogName;
  showTricks();
  showPlayersStrip();
}

// The row of players at the bottom (only with 2+ players)
function showPlayersStrip() {
  const strip = $("players-strip");
  strip.innerHTML = "";
  if (players.length < 2) return;

  players.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "player-card" + (i === turn ? " now" : "") + (p.done ? " done" : "");

    const pup = document.createElement("div");
    pup.className = "pup mini";
    pup.innerHTML = pupHtml(p);

    const name = document.createElement("div");
    name.className = "player-name";
    name.textContent = p.name;

    const info = document.createElement("div");
    info.className = "player-info";
    info.innerHTML = "❤️" + p.lives + ' <span class="coin">Q</span> ' + p.bank;

    card.append(pup, name, info);

    // Other players can tease with tricks they bought!
    if (i !== turn && p.owned.tricks.length > 0) {
      const teases = document.createElement("div");
      teases.className = "teases";
      p.owned.tricks.forEach(trick => {
        const btn = document.createElement("button");
        btn.className = "tease-button";
        btn.textContent = trick.emoji;
        btn.title = "Tease with " + trick.name;
        btn.addEventListener("click", () => tease(p, trick, pup));
        teases.appendChild(btn);
      });
      card.appendChild(teases);
    }
    strip.appendChild(card);
  });
}

// Stars under the host: ⭐ right, ❌ wrong, ⚪ not answered yet
function showProgress() {
  const p = me();
  let stars = "";
  for (let i = 0; i < QUESTIONS_PER_LEVEL; i++) {
    if (i < p.results.length) stars += p.results[i] ? "⭐" : "❌";
    else stars += "⚪";
  }
  progressEl.textContent = stars;
}

function showPot(justWon) {
  const p = me();
  if (p.pot === 0) {
    potEl.textContent = "Each right answer = " + level().coins + " coins!";
  } else {
    potEl.innerHTML = 'This level: <span class="coin">Q</span> <span class="' + (justWon ? "pop" : "") + '">' + p.pot + "</span> (get all 3 right to bank it!)";
  }
}

// ---------- Themes and questions ----------
// The questions for a new level. If the theme has logo questions, some are always logos.
function pickLevelQuestions(themeName, levelKey, avoid) {
  const logos = pickQuestions(themeName, levelKey, LOGO_QUESTIONS_PER_LEVEL, avoid, q => q.logo);
  const rest = pickQuestions(themeName, levelKey, QUESTIONS_PER_LEVEL - logos.length, avoid.concat(logos));
  return shuffle(logos.concat(rest));
}

function shuffle(list) {
  return list.map(item => [Math.random(), item]).sort((a, b) => a[0] - b[0]).map(pair => pair[1]);
}

// Pick some random questions, skipping any in "avoid" (unless there aren't enough left).
// "only" can limit it to some questions, like only logo ones.
function pickQuestions(themeName, levelKey, howMany, avoid, only = () => true) {
  const all = QUESTIONS.filter(q => q.theme === themeName && q.level === levelKey && only(q));
  let pool = all.filter(q => !avoid.includes(q));
  if (pool.length < howMany) pool = all;
  const chosen = [];
  while (chosen.length < howMany && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    chosen.push(pool.splice(i, 1)[0]);
  }
  return chosen;
}

// Show a big button for every theme, plus a surprise button
function showThemePicker() {
  $("theme-level").textContent = (players.length > 1 ? me().name + "  •  " : "") +
    levelLabel() + "  •  each right answer = " + level().coins + " coins!" +
    (onHard(me()) ? "  •  Beat HARD in " + HARD_ROUNDS + " different themes to win!" : "");
  const buttonsEl = $("theme-buttons");
  buttonsEl.innerHTML = "";

  // On Hard, themes you've already beaten are ticked and can't be picked again
  const beaten = onHard(me()) ? me().hardWins : [];
  THEMES.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "theme-button";
    btn.innerHTML = '<span class="theme-emoji">' + (beaten.includes(t.name) ? "✅" : t.emoji) + "</span>";
    btn.append(t.name);
    if (beaten.includes(t.name)) {
      btn.disabled = true;
      btn.title = "You already beat HARD " + t.name + "!";
    }
    btn.addEventListener("click", () => startLevel(t.name));
    buttonsEl.appendChild(btn);
  });

  const surprise = document.createElement("button");
  surprise.className = "theme-button surprise";
  surprise.innerHTML = '<span class="theme-emoji">🎲</span>Surprise me!';
  surprise.addEventListener("click", () => startLevel(pick(THEMES.filter(t => !beaten.includes(t.name))).name));
  buttonsEl.appendChild(surprise);

  showOverlay("theme-screen");
}

function startLevel(themeName) {
  const p = me();
  p.theme = themeName;
  p.pot = 0;
  p.current = 0;
  p.results = [];
  p.levelQuestions = pickLevelQuestions(themeName, level().key, p.seen);
  p.seen.push(...p.levelQuestions);
  showOverlay(null);
  showStage();
  showQuestion();
  say(pick(host().hello) + " Tonight's theme: " + themeName + "!", "wave");
}

function showQuestion() {
  const p = me();
  const q = p.levelQuestions[p.current];
  lastWrong = false;
  themeEl.textContent = q.theme + "  •  Question " + (p.current + 1) + " of " + p.levelQuestions.length;
  questionEl.textContent = q.question;
  showLogo(q);
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  passBtn.classList.toggle("hidden", stillPlaying().length < 2);
  dogEl.className = "pup full";
  effectEl.className = "";
  effectEl.textContent = "";
  say(pick(host().ask), "point");
  showProgress();
  showPot(false);

  q.answers.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerHTML = '<span class="letter">' + LETTERS[i] + ":</span>";
    btn.append(text);
    btn.addEventListener("click", () => chooseAnswer(i));
    answersEl.appendChild(btn);
  });
}

// Picture questions have a "logo" - one of the names in logos.js
function showLogo(q) {
  const card = $("logo-card");
  card.classList.toggle("hidden", !q.logo);
  $("logo").innerHTML = q.logo ? logoSvg(q.logo) : "";
}

function chooseAnswer(i) {
  const p = me();
  const q = p.levelQuestions[p.current];
  const buttons = answersEl.querySelectorAll(".answer");
  buttons.forEach(b => b.disabled = true);
  buttons[q.right].classList.add("right");
  passBtn.classList.add("hidden");

  if (i === q.right) {
    p.results.push(true);
    p.pot += level().coins;
    say(pick(host().right) + " +" + level().coins + " coins!", "cheer");
    dogEl.className = "pup full happy";
    showPot(true);
    sfx.right();
    nextBtn.textContent = p.current + 1 < p.levelQuestions.length ? "Next question ▶" : "See results ★";
  } else {
    // A wrong answer costs a life and ends the level (you need all 3 right to pass)
    p.results.push(false);
    p.lives--;
    lastWrong = true;
    buttons[i].classList.add("wrong");
    const oops = pick(NAUGHTY_THINGS);
    say(pick(host().wrong) + " " + oops.says.replace("The pup", p.dogName).replace("the pup", p.dogName), "facepalm");
    dogEl.className = "pup full " + (oops.move || "naughty");
    effectEl.textContent = oops.effect || "";
    effectEl.className = oops.how || "";
    nextBtn.textContent = "Oh no... ▶";
    sfx.wrong();
    setTimeout(sfx[oops.sound], 1400); // the naughty noise comes after the sad trombone
  }

  showHud();
  showProgress();
  showPlayersStrip();
  nextBtn.classList.remove("hidden");
}

// ---------- End of a level ----------
// "between" = between levels, so show the shop and quit buttons
function showEnd(title, text, mainLabel, mainAction, between) {
  $("end-title").textContent = title;
  $("end-text").textContent = text;
  $("end-stars").textContent = progressEl.textContent;
  $("end-coins-num").textContent = me().bank;
  $("end-main").textContent = mainLabel;
  afterEnd = mainAction;
  $("end-quit").classList.toggle("hidden", !between);
  $("end-shop").classList.toggle("hidden", !between);
  showOverlay("end-screen");
}

// What the button says after someone finishes for good
function finishLabel() {
  return stillPlaying().length === 0 ? "See final scores ★" : "Next player ▶";
}

function levelFailed() {
  const p = me();
  p.levelQuestions = [];
  p.pot = 0;

  if (p.lives === 0) {
    p.done = true;
    p.ending = "out";
    showEnd("GAME OVER",
      "Out of lives! " + p.dogName + " needs a nap. You keep your " + p.bank + " banked coins.",
      finishLabel(), endTurn, false);
    return;
  }

  showEnd("SO CLOSE!",
    "You need all 3 right to bank the coins. " +
    (players.length > 1 ? "Next turn, try " : "Try ") + levelLabel() + " again!",
    players.length > 1 ? "Next player ▶" : "Try again ↺", endTurn, true);
}

function levelPassed() {
  const p = me();
  p.bank += p.pot;
  const won = p.pot;
  p.pot = 0;
  p.levelQuestions = [];
  showHud();

  if (onHard(p)) {
    p.hardWins.push(p.theme);
    if (p.hardWins.length >= HARD_ROUNDS) {
      p.done = true;
      p.ending = "won";
      showEnd("YOU WIN!!!",
        "You beat HARD in " + HARD_ROUNDS + " themes! " + p.dogName + " is doing the happiest dance EVER! 🐶💃",
        finishLabel(), endTurn, false);
      sfx.win();
      confetti(80);
      return;
    }
    sfx.fanfare();
    confetti(30);
    // Stay on Hard, but next time it has to be a different theme
    showEnd("HARD " + p.hardWins.length + " OF " + HARD_ROUNDS + " DONE!",
      won + " coins banked! You beat HARD " + p.theme + ". Beat HARD in " +
      (HARD_ROUNDS - p.hardWins.length) + " more theme" + (HARD_ROUNDS - p.hardWins.length > 1 ? "s" : "") + " to win!",
      "Next: " + levelLabel() + " ▶", continueTurn, true);
    return;
  }
  sfx.fanfare();
  confetti(30);

  p.levelIndex++;
  // A right answer means you keep your turn, so carry straight on
  showEnd("LEVEL PASSED!",
    won + " coins banked! " + p.dogName + " is SO proud! Ready for " + levelLabel() + "?",
    "Next: " + levelLabel() + " ▶", continueTurn, true);
}

function quitGame() {
  const p = me();
  p.done = true;
  p.ending = "quit";
  p.levelQuestions = [];
  showEnd("SEE YOU NEXT TIME!",
    "Smart move, " + p.name + "! You walk away with all " + p.bank + " banked coins.",
    finishLabel(), endTurn, false);
}

// ---------- Final results ----------
function showFinal() {
  saveAllScores();
  const ranked = [...players].sort((a, b) => b.bank - a.bank);
  const icons = { won: "🏆", quit: "👋", out: "💤" };

  if (players.length === 1) {
    $("final-title").textContent = "FINAL SCORE";
  } else if (ranked[0].bank > 0 && ranked[0].bank === ranked[1].bank) {
    $("final-title").textContent = "IT'S A TIE!";
  } else {
    $("final-title").textContent = ranked[0].name + " WINS!";
  }

  const list = $("final-list");
  list.innerHTML = "";
  ranked.forEach((p, i) => {
    const li = document.createElement("li");
    if (i === 0 && players.length > 1) li.className = "winner";
    const pup = document.createElement("span");
    pup.className = "pup mini";
    pup.innerHTML = pupHtml(p);
    const who = document.createElement("span");
    who.className = "final-who";
    who.textContent = p.name + " & " + p.dogName + " " + icons[p.ending];
    const coins = document.createElement("span");
    coins.className = "score-coins";
    coins.innerHTML = '<span class="coin">Q</span> ' + p.bank;
    li.append(pup, who, coins);
    list.appendChild(li);
  });
  showOverlay("final-screen");
}

// ---------- Top Score Board ----------
// Scores are saved only in this browser, on this computer.
// Saved data can be changed from outside the game, so only keep scores that look right.
function loadScores() {
  try {
    const saved = JSON.parse(localStorage.getItem(SCORES_KEY));
    if (!Array.isArray(saved)) return memoryScores;
    return saved.map(cleanScore).filter(s => s !== null).slice(0, MAX_SCORES);
  } catch (e) {
    return memoryScores;
  }
}

// A score is a name (letters only), a whole number of coins, and a time
function cleanScore(s) {
  if (!s || typeof s !== "object") return null;
  const initials = String(s.initials || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8);
  const coins = Math.floor(Number(s.coins));
  const when = Number(s.when);
  if (!initials || !Number.isFinite(coins) || coins < 0 || coins > 1000000 || !Number.isFinite(when)) return null;
  return { initials: initials, coins: coins, when: when };
}

function storeScores(scores) {
  memoryScores = scores;
  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  } catch (e) {
    // can't save in this browser - the scores still last until the page closes
  }
}

function saveAllScores() {
  const scores = loadScores();
  const now = Date.now();
  savedIds = [];
  players.forEach((p, i) => {
    if (p.bank > 0) {
      scores.push({ initials: p.name, coins: p.bank, when: now + i });
      savedIds.push(now + i);
    }
  });
  scores.sort((a, b) => b.coins - a.coins);
  storeScores(scores.slice(0, MAX_SCORES));
}

// "newOnes" = highlight scores that were just saved
function showScores(newOnes) {
  const list = $("scores-list");
  const medals = ["🥇", "🥈", "🥉"];
  list.innerHTML = "";
  const scores = loadScores();
  if (scores.length === 0) {
    list.innerHTML = '<li class="empty">No scores yet - be the first!</li>';
  }
  scores.forEach((s, i) => {
    const li = document.createElement("li");
    if (newOnes.includes(s.when)) li.className = "new";
    const who = document.createElement("span");
    who.textContent = (medals[i] || (i + 1) + ".") + " " + s.initials;
    const coins = document.createElement("span");
    coins.className = "score-coins";
    coins.innerHTML = '<span class="coin">Q</span> ';
    coins.append(String(s.coins)); // added as plain text, never as HTML
    li.append(who, coins);
    list.appendChild(li);
  });
  showOverlay("scores-screen");
}

// ---------- Confetti ----------
const CONFETTI = ["🎉", "⭐", "🎊", "🐾", "✨", "🦴"];

function confetti(howMany) {
  const stage = $("stage");
  for (let i = 0; i < howMany; i++) {
    const bit = document.createElement("span");
    bit.className = "confetti";
    bit.textContent = pick(CONFETTI);
    bit.style.left = Math.random() * 100 + "%";
    bit.style.animationDuration = 1.5 + Math.random() * 2 + "s";
    bit.style.animationDelay = Math.random() * 0.8 + "s";
    stage.appendChild(bit);
    setTimeout(() => bit.remove(), 4500);
  }
}

// ---------- Keyboard shortcuts ----------
// A/B/C/D or 1/2/3/4 to answer, Enter or Space for the next question
document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (document.querySelector(".overlay:not(.hidden)")) return;
  const key = e.key.toUpperCase();
  let choice = LETTERS.indexOf(key);
  if (choice === -1) choice = ["1", "2", "3", "4"].indexOf(key);
  const answers = answersEl.querySelectorAll(".answer");
  if (choice >= 0 && answers[choice] && !answers[choice].disabled) {
    answers[choice].click();
  } else if ((e.key === "Enter" || e.key === " ") && e.target.tagName !== "BUTTON" &&
             !nextBtn.classList.contains("hidden")) {
    e.preventDefault();
    nextBtn.click();
  }
});

// ---------- Buttons ----------
$("roll-player").addEventListener("click", () => rollName("player-name", PLAYER_NAMES, "name"));
$("roll-pup").addEventListener("click", () => rollName("pup-name", PUP_NAMES, "dogName"));
nextBtn.addEventListener("click", () => {
  if (lastWrong) return levelFailed();
  const p = me();
  p.current++;
  if (p.current < p.levelQuestions.length) showQuestion();
  else levelPassed();
});
passBtn.addEventListener("click", passTurn);
$("start").addEventListener("click", newGame);
$("go-home").addEventListener("click", goHome);
document.querySelectorAll(".count-button").forEach(btn =>
  btn.addEventListener("click", () => chooseCount(Number(btn.dataset.count))));
$("setup-next").addEventListener("click", savePlayerForm);
$("pup-name").addEventListener("keydown", e => { if (e.key === "Enter") savePlayerForm(); });
$("turn-go").addEventListener("click", continueTurn);
$("end-main").addEventListener("click", () => afterEnd());
$("end-quit").addEventListener("click", quitGame);
$("final-again").addEventListener("click", newGame);
$("final-scores").addEventListener("click", () => showScores(savedIds));
$("show-scores").addEventListener("click", () => showScores([]));
$("scores-play").addEventListener("click", newGame);

$("start-dog").innerHTML = '<div class="pup">' + dogSvg("shiba") + "</div>";
showHost();

// ---------- Fit on small phones ----------
// If the game is still taller than a phone screen, shrink the whole stage a little
// so nobody has to scroll. On bigger screens it stays full size.
const PHONE_WIDTH = 520; // same as the phone size in style.css
const stageEl = $("stage");
function fitToScreen() {
  let zoom = "";
  if (window.innerWidth <= PHONE_WIDTH) {
    stageEl.style.zoom = "";
    // Find the bottom of the lowest thing on the stage (not the pop-up screens or lights)
    let bottom = 0;
    for (const el of stageEl.children) {
      if (el.offsetHeight && getComputedStyle(el).position === "static") {
        bottom = Math.max(bottom, el.getBoundingClientRect().bottom + window.scrollY);
      }
    }
    bottom += 12;
    if (bottom > window.innerHeight) zoom = String(window.innerHeight / bottom);
  }
  if (stageEl.style.zoom !== zoom) stageEl.style.zoom = zoom;
}
let fitWaiting = false;
function fitSoon() {
  if (fitWaiting) return;
  fitWaiting = true;
  requestAnimationFrame(() => { fitWaiting = false; fitToScreen(); });
}
new MutationObserver(fitSoon).observe(stageEl, { childList: true, subtree: true, attributeFilter: ["class"] });
window.addEventListener("resize", fitSoon);
fitSoon();
