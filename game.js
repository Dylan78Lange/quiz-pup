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

// Things the host says - add your own!
const HELLO_SAYS = ["Welcome, welcome, WELCOME to Quiz Pup!", "It's showtime, baby!", "Are you ready to rumble... with your pup?"];
const ASK_SAYS = ["Here comes your question...", "Ooh, this one's tricky!", "Think carefully...", "Final answer?"];
const RIGHT_SAYS = ["That's... CORRECT!", "Fan-DOG-tastic!", "You're on fire!", "Woof-derful!"];
const WRONG_SAYS = ["Oooh, so close!", "Not quite, superstar!", "Ruh-roh!", "Better luck next time!"];

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

const LETTERS = ["A", "B", "C", "D"];
const MAX_SCORES = 10;               // how many players fit on the Top Score Board
const SCORES_KEY = "quiz-pup-scores"; // where scores are saved in the browser

const questionEl = document.getElementById("question");
const themeEl = document.getElementById("theme");
const answersEl = document.getElementById("answers");
const hostSaysEl = document.getElementById("host-says");
const dogEl = document.getElementById("dog");
const effectEl = document.getElementById("effect");
const progressEl = document.getElementById("progress");
const potEl = document.getElementById("pot");
const livesEl = document.getElementById("lives");
const levelNameEl = document.getElementById("level-name");
const bankNumEl = document.getElementById("bank-num");
const nextBtn = document.getElementById("next");
const startScreen = document.getElementById("start-screen");
const themeScreen = document.getElementById("theme-screen");
const endScreen = document.getElementById("end-screen");
const endMainBtn = document.getElementById("end-main");
const endQuitBtn = document.getElementById("end-quit");

let lives = LIVES;
let bank = 0;        // coins saved forever (banked)
let pot = 0;         // coins won this level, not banked yet
let levelIndex = 0;  // 0 = easy, 1 = medium, 2 = hard
let theme = "";      // the theme picked for this level
let levelQuestions = [];
let current = 0;
let results = [];    // true for a right answer, false for wrong
let afterEnd = null; // what the big button on the end screen does
let memoryScores = []; // backup in case the browser can't save

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Pick some random questions for this level
function pickQuestions(themeName, levelKey, howMany) {
  const pool = QUESTIONS.filter(q => q.theme === themeName && q.level === levelKey);
  const chosen = [];
  while (chosen.length < howMany && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    chosen.push(pool.splice(i, 1)[0]);
  }
  return chosen;
}

function level() {
  return LEVELS[levelIndex];
}

function showHud() {
  livesEl.textContent = "❤️".repeat(lives) + "🖤".repeat(LIVES - lives);
  levelNameEl.textContent = level().name;
  levelNameEl.className = level().key;
  bankNumEl.textContent = bank;
}

// Stars under the host: ⭐ right, ❌ wrong, ⚪ not answered yet
function showProgress() {
  let stars = "";
  for (let i = 0; i < levelQuestions.length; i++) {
    if (i < results.length) stars += results[i] ? "⭐" : "❌";
    else stars += "⚪";
  }
  progressEl.textContent = stars;
}

function showPot(justWon) {
  if (pot === 0) {
    potEl.textContent = "Each right answer = " + level().coins + " coins!";
  } else {
    potEl.innerHTML = 'This level: <span class="coin">Q</span> <span class="' + (justWon ? "pop" : "") + '">' + pot + "</span> (get all 3 right to bank it!)";
  }
}

function newGame() {
  lives = LIVES;
  bank = 0;
  levelIndex = 0;
  resetShop();
  startScreen.classList.add("hidden");
  showThemePicker();
}

// Show a big button for every theme, plus a surprise button
function showThemePicker() {
  endScreen.classList.add("hidden");
  document.getElementById("theme-level").textContent =
    level().name + " level  •  each right answer = " + level().coins + " coins!";
  const buttonsEl = document.getElementById("theme-buttons");
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

  themeScreen.classList.remove("hidden");
}

function startLevel(themeName) {
  theme = themeName;
  pot = 0;
  current = 0;
  results = [];
  levelQuestions = pickQuestions(theme, level().key, QUESTIONS_PER_LEVEL);
  themeScreen.classList.add("hidden");
  showHud();
  showQuestion();
  hostSaysEl.textContent = pick(HELLO_SAYS) + " Tonight's theme: " + theme + "!";
}

function showQuestion() {
  const q = levelQuestions[current];
  themeEl.textContent = q.theme + "  •  Question " + (current + 1) + " of " + levelQuestions.length;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  dogEl.className = "";
  effectEl.className = "";
  effectEl.textContent = "";
  hostSaysEl.textContent = pick(ASK_SAYS);
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
  const q = levelQuestions[current];
  const buttons = answersEl.querySelectorAll(".answer");
  buttons.forEach(b => b.disabled = true);
  buttons[q.right].classList.add("right");

  if (i === q.right) {
    results.push(true);
    pot += level().coins;
    hostSaysEl.textContent = pick(RIGHT_SAYS) + " +" + level().coins + " coins!";
    dogEl.className = "happy";
    showPot(true);
  } else {
    results.push(false);
    lives--;
    buttons[i].classList.add("wrong");
    const oops = pick(NAUGHTY_THINGS);
    hostSaysEl.textContent = pick(WRONG_SAYS) + " " + oops.says;
    dogEl.className = "naughty";
    effectEl.textContent = oops.effect;
    effectEl.className = oops.how;
  }

  showHud();
  showProgress();
  if (lives === 0) nextBtn.textContent = "Uh-oh... ▶";
  else if (current + 1 < levelQuestions.length) nextBtn.textContent = "Next question ▶";
  else nextBtn.textContent = "See results ★";
  nextBtn.classList.remove("hidden");
}

// Show the end screen. "quit" = show the quit button too.
// "canSave" = the game is over, so let the player save their score.
function showEnd(title, text, mainLabel, mainAction, quit, canSave) {
  const saveBox = document.getElementById("save-score");
  saveBox.classList.toggle("hidden", !(canSave && bank > 0));
  document.getElementById("initials").value = "";
  document.getElementById("end-title").textContent = title;
  document.getElementById("end-text").textContent = text;
  document.getElementById("end-stars").textContent = progressEl.textContent;
  document.getElementById("end-coins-num").textContent = bank;
  endMainBtn.textContent = mainLabel;
  afterEnd = mainAction;
  endQuitBtn.classList.toggle("hidden", !quit);
  document.getElementById("end-shop").classList.toggle("hidden", !quit); // shop is open between levels
  endScreen.classList.remove("hidden");
}

function endLevel() {
  const allRight = results.every(r => r);

  if (!allRight) {
    showEnd("SO CLOSE!",
      "Get all 3 right to bank the coins. Try " + level().name + " again?",
      "Try again ↺", showThemePicker, true);
    return;
  }

  bank += pot;
  showHud();
  bankNumEl.className = "bump";

  if (levelIndex === LEVELS.length - 1) {
    showEnd("YOU WIN!!!",
      "You beat HARD level! Your pup is doing the happiest dance EVER! 🐶💃",
      "Play again ↺", newGame, false, true);
    return;
  }

  const nextLevel = LEVELS[levelIndex + 1];
  showEnd("LEVEL PASSED!",
    pot + " coins banked! Your pup is SO proud! Ready for " + nextLevel.name + "?",
    "Next: " + nextLevel.name + " ▶", () => { levelIndex++; showThemePicker(); }, true);
}

function gameOver() {
  showEnd("GAME OVER",
    "Out of lives! The pup needs a nap. You keep your banked coins.",
    "Play again ↺", newGame, false, true);
}

function quitGame() {
  showEnd("SEE YOU NEXT TIME!",
    "Smart move! You walk away with all your banked coins.",
    "Play again ↺", newGame, false, true);
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

function saveScore() {
  const input = document.getElementById("initials");
  const initials = input.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
  if (initials === "") {
    input.classList.remove("oops");
    void input.offsetWidth; // restart the wobble
    input.classList.add("oops");
    return;
  }
  const entry = { initials: initials, coins: bank, when: Date.now() };
  const scores = loadScores();
  scores.push(entry);
  scores.sort((a, b) => b.coins - a.coins);
  storeScores(scores.slice(0, MAX_SCORES));
  showScores(entry.when);
}

// "newOne" = highlight the score that was just saved
function showScores(newOne) {
  const list = document.getElementById("scores-list");
  const medals = ["🥇", "🥈", "🥉"];
  list.innerHTML = "";
  const scores = loadScores();
  if (scores.length === 0) {
    list.innerHTML = '<li class="empty">No scores yet - be the first!</li>';
  }
  scores.forEach((s, i) => {
    const li = document.createElement("li");
    if (s.when === newOne) li.className = "new";
    li.innerHTML = "<span>" + (medals[i] || (i + 1) + ".") + " " + s.initials + "</span>" +
      '<span class="score-coins"><span class="coin">Q</span> ' + s.coins + "</span>";
    list.appendChild(li);
  });
  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  document.getElementById("scores-screen").classList.remove("hidden");
}

document.getElementById("save-btn").addEventListener("click", saveScore);
document.getElementById("initials").addEventListener("keydown", e => {
  if (e.key === "Enter") saveScore();
});
document.getElementById("show-scores").addEventListener("click", () => showScores());
document.getElementById("scores-play").addEventListener("click", () => {
  document.getElementById("scores-screen").classList.add("hidden");
  newGame();
});

nextBtn.addEventListener("click", () => {
  if (lives === 0) return gameOver();
  current++;
  if (current < levelQuestions.length) showQuestion();
  else endLevel();
});
document.getElementById("start").addEventListener("click", newGame);
endMainBtn.addEventListener("click", () => afterEnd());
endQuitBtn.addEventListener("click", quitGame);
