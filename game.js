// ============================================
//  QUIZ PUP  -  game code
// ============================================

// Game settings - try changing these!
const LIVES = 3;
const QUESTIONS_PER_LEVEL = 3;
const LEVELS = [
  { key: "easy",   name: "EASY",   coins: 100 },
  { key: "medium", name: "MEDIUM", coins: 250 },
  { key: "hard",   name: "HARD",   coins: 500 },
];

// The hosts and the things they say - add your own lines (or a whole new host!)
const HOSTS = [
  {
    key: "human", name: "Human", face: "🕺",
    hello: ["Welcome, welcome, WELCOME to Quiz Pup!", "It's showtime, baby!", "Are you ready to rumble... with your pup?"],
    ask:   ["Here comes your question...", "Ooh, this one's tricky!", "Think carefully...", "Final answer?"],
    right: ["That's... CORRECT!", "Fan-DOG-tastic!", "You're on fire!", "Woof-derful!"],
    wrong: ["Oooh, so close!", "Not quite, superstar!", "Ruh-roh!", "Better luck next time!"],
  },
  {
    key: "robot", name: "Robot", face: "🤖",
    hello: ["BEEP BOOP! WELCOME, HUMAN, TO QUIZ PUP!", "SHOWTIME MODE: ACTIVATED!", "GREETINGS, PUP OWNER. PREPARE TO QUIZ!"],
    ask:   ["COMPUTING QUESTION... BEEP!", "THIS ONE MAKES MY CIRCUITS TINGLE.", "PROCESSING... PLEASE ANSWER.", "FINAL ANSWER? BLEEP BLOOP?"],
    right: ["CORRECT! DOES NOT COMPUTE... YOU ARE TOO SMART!", "BEEP BEEP! WOOF-DERFUL!", "SUCCESS! MY LIGHTS ARE FLASHING!", "100% CORRECT. HIGH FIVE, HUMAN!"],
    wrong: ["ERROR! ERROR! WRONG ANSWER!", "BZZZT! NOT QUITE!", "SYSTEM SAYS: SO CLOSE!", "OOPS. RECALCULATING..."],
  },
];
const HOST_KEY = "quiz-pup-host"; // remembers which host you picked

// Naughty things the pup does when you get one wrong - add your own!
// "effect" is what shows up, "how" is the animation: "drop" falls from above, "pop" bursts in
const NAUGHTY_THINGS = [
  { says: "Uh-oh... the pup is peeing on your leg!", effect: "💦💦💦", how: "pop" },
  { says: "Ewww! The pup pooped on the stage!", effect: "💩", how: "drop" },
  { says: "GRRR! The pup is growling at you!", effect: "💢 GRRR! WOOF!", how: "pop" },
  { says: "CRASH! The pup knocked over the vase!", effect: "🏺💥", how: "drop" },
  { says: "The pup ate the host's homework... and burped!", effect: "📄💨", how: "pop" },
  { says: "The pup is chasing its own tail!", effect: "🌀🌀🌀", how: "pop" },
];

const PUP_NAMES = ["Biscuit", "Waffles", "Peanut", "Noodle"]; // if you don't name your pup
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
  $("host-face").firstChild.textContent = host().face;
  $("host").className = host().key;
  const buttonsEl = $("host-buttons");
  buttonsEl.innerHTML = "";
  HOSTS.forEach(h => {
    const btn = document.createElement("button");
    btn.className = "host-button" + (h.key === hostKey ? " chosen" : "");
    btn.innerHTML = '<span class="host-emoji">' + h.face + "</span>" + h.name;
    btn.addEventListener("click", () => chooseHost(h.key));
    buttonsEl.appendChild(btn);
  });
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
    theme: "",
    levelQuestions: [], // empty = needs to pick a theme for a new level
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

function stillPlaying() {
  return players.filter(p => !p.done);
}

function showOverlay(id) {
  document.querySelectorAll(".overlay").forEach(o => o.classList.add("hidden"));
  if (id) $(id).classList.remove("hidden");
}

// A pup picture with its hat on
function pupHtml(p) {
  return '<span class="hat">' + p.owned.wear + "</span>" + dogSvg(p.breed);
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
  $("pup-name").placeholder = PUP_NAMES[setupIndex];
  chosenBreed = BREEDS[setupIndex % BREEDS.length].key;
  showBreedButtons();
  $("setup-next").textContent = setupIndex + 1 < players.length ? "Next player ▶" : "Let's go! ★";
  $("player-name").focus();
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
  p.name = $("player-name").value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8) || "P" + (setupIndex + 1);
  p.dogName = $("pup-name").value.trim().slice(0, 12) || PUP_NAMES[setupIndex];
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
    if (players.length > 1) hostSaysEl.textContent = "Welcome back, " + me().name + "! " + hostSaysEl.textContent;
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
  const fresh = pickQuestions(p.theme, level().key, 1, p.levelQuestions);
  if (fresh.length > 0) p.levelQuestions[p.current] = fresh[0];
  endTurn();
}

// ---------- Stage ----------
function showHud() {
  const p = me();
  livesEl.textContent = "❤️".repeat(p.lives) + "🖤".repeat(Math.max(0, LIVES - p.lives));
  levelNameEl.textContent = (players.length > 1 ? p.name + " • " : "") + level().name;
  levelNameEl.className = level().key;
  bankNumEl.textContent = p.bank;
}

function showStage() {
  const p = me();
  showHud();
  dogEl.innerHTML = pupHtml(p);
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
// Pick some random questions, skipping any in "avoid"
function pickQuestions(themeName, levelKey, howMany, avoid) {
  const pool = QUESTIONS.filter(q => q.theme === themeName && q.level === levelKey && !avoid.includes(q));
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
    level().name + " level  •  each right answer = " + level().coins + " coins!";
  const buttonsEl = $("theme-buttons");
  buttonsEl.innerHTML = "";

  THEMES.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "theme-button";
    btn.innerHTML = '<span class="theme-emoji">' + t.emoji + "</span>";
    btn.append(t.name);
    btn.addEventListener("click", () => startLevel(t.name));
    buttonsEl.appendChild(btn);
  });

  const surprise = document.createElement("button");
  surprise.className = "theme-button surprise";
  surprise.innerHTML = '<span class="theme-emoji">🎲</span>Surprise me!';
  surprise.addEventListener("click", () => startLevel(pick(THEMES).name));
  buttonsEl.appendChild(surprise);

  showOverlay("theme-screen");
}

function startLevel(themeName) {
  const p = me();
  p.theme = themeName;
  p.pot = 0;
  p.current = 0;
  p.results = [];
  p.levelQuestions = pickQuestions(themeName, level().key, QUESTIONS_PER_LEVEL, []);
  showOverlay(null);
  showStage();
  showQuestion();
  hostSaysEl.textContent = pick(host().hello) + " Tonight's theme: " + themeName + "!";
}

function showQuestion() {
  const p = me();
  const q = p.levelQuestions[p.current];
  lastWrong = false;
  themeEl.textContent = q.theme + "  •  Question " + (p.current + 1) + " of " + p.levelQuestions.length;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  passBtn.classList.toggle("hidden", stillPlaying().length < 2);
  dogEl.className = "pup";
  effectEl.className = "";
  effectEl.textContent = "";
  hostSaysEl.textContent = pick(host().ask);
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
    hostSaysEl.textContent = pick(host().right) + " +" + level().coins + " coins!";
    dogEl.className = "pup happy";
    showPot(true);
    nextBtn.textContent = p.current + 1 < p.levelQuestions.length ? "Next question ▶" : "See results ★";
  } else {
    // A wrong answer costs a life and ends the level (you need all 3 right to pass)
    p.results.push(false);
    p.lives--;
    lastWrong = true;
    buttons[i].classList.add("wrong");
    const oops = pick(NAUGHTY_THINGS);
    hostSaysEl.textContent = pick(host().wrong) + " " + oops.says.replace("The pup", p.dogName).replace("the pup", p.dogName);
    dogEl.className = "pup naughty";
    effectEl.textContent = oops.effect;
    effectEl.className = oops.how;
    nextBtn.textContent = "Oh no... ▶";
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
    (players.length > 1 ? "Next turn, try " : "Try ") + level().name + " again!",
    players.length > 1 ? "Next player ▶" : "Try again ↺", endTurn, true);
}

function levelPassed() {
  const p = me();
  p.bank += p.pot;
  const won = p.pot;
  p.pot = 0;
  p.levelQuestions = [];
  showHud();

  if (p.levelIndex === LEVELS.length - 1) {
    p.done = true;
    p.ending = "won";
    showEnd("YOU WIN!!!",
      "You beat HARD level! " + p.dogName + " is doing the happiest dance EVER! 🐶💃",
      finishLabel(), endTurn, false);
    return;
  }

  p.levelIndex++;
  // A right answer means you keep your turn, so carry straight on
  showEnd("LEVEL PASSED!",
    won + " coins banked! " + p.dogName + " is SO proud! Ready for " + level().name + "?",
    "Next: " + level().name + " ▶", continueTurn, true);
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
function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(SCORES_KEY)) || memoryScores;
  } catch (e) {
    return memoryScores;
  }
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
    coins.innerHTML = '<span class="coin">Q</span> ' + s.coins;
    li.append(who, coins);
    list.appendChild(li);
  });
  showOverlay("scores-screen");
}

// ---------- Buttons ----------
nextBtn.addEventListener("click", () => {
  if (lastWrong) return levelFailed();
  const p = me();
  p.current++;
  if (p.current < p.levelQuestions.length) showQuestion();
  else levelPassed();
});
passBtn.addEventListener("click", passTurn);
$("start").addEventListener("click", newGame);
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
