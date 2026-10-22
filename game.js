// ============================================
//  QUIZ PUP  -  game code
// ============================================
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

const questionEl =document.getElementById("question");
const themeEl = document.getElementById("theme");
const answersEl = document.getElementById("answers");
const hostSaysEl = document.getElementById("host-says");
const dogEl = document.getElementById("dog");
const nextBtn = document.getElementById("next");
const effectEl = document.getElementById("effect");

let current = 0;

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function showQuestion() {
  const q = QUESTIONS[current];
  themeEl.textContent = q.theme + "  •  Question " + (current + 1) + " of " + QUESTIONS.length;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  dogEl.className = "";
  effectEl.className = "";
  effectEl.textContent = "";
  hostSaysEl.textContent = "Here comes your question...";

  q.answers.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = text;
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
    hostSaysEl.textContent = pick(RIGHT_SAYS);
    dogEl.className = "happy";
  } else {
    buttons[i].classList.add("wrong");
    const oops = pick(NAUGHTY_THINGS);
    hostSaysEl.textContent = pick(WRONG_SAYS) + " " + oops.says;
    dogEl.className = "naughty";
    effectEl.textContent = oops.effect;
    effectEl.className = oops.how;
  }

  nextBtn.textContent = current + 1 < QUESTIONS.length ? "Next question ▶" : "Play again ↺";
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % QUESTIONS.length;
  showQuestion();
});

showQuestion();
