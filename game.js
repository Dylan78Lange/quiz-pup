// ============================================
//  QUIZ PUP  -  game code
// ============================================

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

const QUESTIONS_PER_LEVEL = 3;
const LETTERS = ["A", "B", "C", "D"];

const questionEl = document.getElementById("question");
const themeEl = document.getElementById("theme");
const answersEl = document.getElementById("answers");
const hostSaysEl = document.getElementById("host-says");
const dogEl = document.getElementById("dog");
const effectEl = document.getElementById("effect");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");

let current = 0;
let results = []; // true for a right answer, false for wrong

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Stars at the top: ⭐ right, ❌ wrong, ⚪ not answered yet
function showProgress() {
  let stars = "";
  for (let i = 0; i < QUESTIONS_PER_LEVEL; i++) {
    if (i < results.length) stars += results[i] ? "⭐" : "❌";
    else stars += "⚪";
  }
  progressEl.textContent = stars;
}

function startLevel() {
  current = 0;
  results = [];
  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  showQuestion();
  hostSaysEl.textContent = pick(HELLO_SAYS);
}

function showQuestion() {
  const q = QUESTIONS[current];
  themeEl.textContent = q.theme + "  •  Question " + (current + 1) + " of " + QUESTIONS_PER_LEVEL;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  dogEl.className = "";
  effectEl.className = "";
  effectEl.textContent = "";
  hostSaysEl.textContent = pick(ASK_SAYS);
  showProgress();

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
  const q = QUESTIONS[current];
  const buttons = answersEl.querySelectorAll(".answer");
  buttons.forEach(b => b.disabled = true);
  buttons[q.right].classList.add("right");

  if (i === q.right) {
    results.push(true);
    hostSaysEl.textContent = pick(RIGHT_SAYS);
    dogEl.className = "happy";
  } else {
    results.push(false);
    buttons[i].classList.add("wrong");
    const oops = pick(NAUGHTY_THINGS);
    hostSaysEl.textContent = pick(WRONG_SAYS) + " " + oops.says;
    dogEl.className = "naughty";
    effectEl.textContent = oops.effect;
    effectEl.className = oops.how;
  }

  showProgress();
  nextBtn.textContent = current + 1 < QUESTIONS_PER_LEVEL ? "Next question ▶" : "See results ★";
  nextBtn.classList.remove("hidden");
}

function endLevel() {
  const right = results.filter(r => r).length;
  document.getElementById("end-stars").textContent = progressEl.textContent;
  if (right === QUESTIONS_PER_LEVEL) {
    document.getElementById("end-title").textContent = "LEVEL PASSED!";
    document.getElementById("end-text").textContent = "All " + right + " right! Your pup is SO proud! 🐶💖";
  } else {
    document.getElementById("end-title").textContent = "SO CLOSE!";
    document.getElementById("end-text").textContent = "You got " + right + " out of " + QUESTIONS_PER_LEVEL + ". Get all 3 to pass the level!";
  }
  endScreen.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < QUESTIONS_PER_LEVEL) showQuestion();
  else endLevel();
});
document.getElementById("start").addEventListener("click", startLevel);
document.getElementById("again").addEventListener("click", startLevel);
