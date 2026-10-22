// ============================================
//  QUIZ PUP  -  game code
// ============================================
const RIGHT_SAYS = ["That's... CORRECT!", "Fan-DOG-tastic!", "You're on fire!", "Woof-derful!"];
const WRONG_SAYS = ["Oooh, so close!", "Not quite, superstar!", "Ruh-roh!", "Better luck next time!"];

const questionEl = document.getElementById("question");
const themeEl = document.getElementById("theme");
const answersEl = document.getElementById("answers");
const hostSaysEl = document.getElementById("host-says");
const dogEl = document.getElementById("dog");
const nextBtn = document.getElementById("next");

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
    hostSaysEl.textContent = pick(WRONG_SAYS);
    dogEl.className = "sad";
  }

  nextBtn.textContent = current + 1 < QUESTIONS.length ? "Next question ▶" : "Play again ↺";
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % QUESTIONS.length;
  showQuestion();
});

showQuestion();
