// ============================================
//  MY QUESTIONS  -  write your own quiz questions in the game!
//  They're saved in this browser only. With 3 or more, the
//  "✍️ My Questions" theme shows up in the theme picker.
//  Your questions can come up on any level (Easy, Medium or Hard).
// ============================================
const MY_THEME = { name: "My Questions", emoji: "✍️" };
const MY_QUESTIONS_KEY = "quiz-pup-my-questions";
const MAX_MY_QUESTIONS = 60;
const MAX_QUESTION_LENGTH = 120;
const MAX_ANSWER_LENGTH = 40;

let myRight = 0; // which answer is right in the form (0 = A)

// Saved questions, checked carefully: only plain text of the right length is kept
function loadMyQuestions() {
  try {
    const saved = JSON.parse(localStorage.getItem(MY_QUESTIONS_KEY));
    if (!Array.isArray(saved)) return [];
    return saved.map(cleanMyQuestion).filter(q => q !== null).slice(0, MAX_MY_QUESTIONS);
  } catch (e) {
    return [];
  }
}

function cleanMyQuestion(q) {
  if (!q || typeof q !== "object" || !Array.isArray(q.answers) || q.answers.length !== 4) return null;
  const text = (s, max) => typeof s === "string" ? s.trim().slice(0, max) : "";
  const question = text(q.question, MAX_QUESTION_LENGTH);
  const answers = q.answers.map(a => text(a, MAX_ANSWER_LENGTH));
  const right = Number(q.right);
  if (!question || answers.some(a => !a) || ![0, 1, 2, 3].includes(right)) return null;
  return { question: question, answers: answers, right: right };
}

function storeMyQuestions(list) {
  try {
    localStorage.setItem(MY_QUESTIONS_KEY, JSON.stringify(list));
  } catch (e) {
    $("myq-message").textContent = "Oops, this browser can't save questions.";
  }
}

// Put your questions into the game, and add the theme if there are enough of them
function useMyQuestions() {
  for (let i = QUESTIONS.length - 1; i >= 0; i--) {
    if (QUESTIONS[i].theme === MY_THEME.name) QUESTIONS.splice(i, 1);
  }
  const mine = loadMyQuestions();
  mine.forEach(q => QUESTIONS.push({ theme: MY_THEME.name, level: "any", anyLevel: true, ...q }));
  const hasTheme = THEMES.includes(MY_THEME);
  if (mine.length >= QUESTIONS_PER_LEVEL && !hasTheme) THEMES.push(MY_THEME);
  if (mine.length < QUESTIONS_PER_LEVEL && hasTheme) THEMES.splice(THEMES.indexOf(MY_THEME), 1);
}

// ---------- The "My Questions" screen ----------
function showMyQuestions() {
  $("myq-message").textContent = "";
  showRightPicker();
  showMyList();
  $("myq-screen").classList.remove("hidden");
}

function showRightPicker() {
  document.querySelectorAll(".myq-right").forEach((btn, i) => btn.classList.toggle("chosen", i === myRight));
}

function addMyQuestion() {
  const list = loadMyQuestions();
  if (list.length >= MAX_MY_QUESTIONS) {
    $("myq-message").textContent = "Wow, your quiz is full! Delete one to add a new one.";
    return;
  }
  const q = cleanMyQuestion({
    question: $("myq-question").value,
    answers: [0, 1, 2, 3].map(i => $("myq-answer" + i).value),
    right: myRight,
  });
  if (!q) {
    $("myq-message").textContent = "Fill in the question and all 4 answers first!";
    return;
  }
  list.push(q);
  storeMyQuestions(list);
  useMyQuestions();
  $("myq-question").value = "";
  [0, 1, 2, 3].forEach(i => { $("myq-answer" + i).value = ""; });
  $("myq-message").textContent = "✅ Saved! " + (list.length >= QUESTIONS_PER_LEVEL
    ? "Pick the ✍️ My Questions theme to play your quiz!"
    : "Write " + (QUESTIONS_PER_LEVEL - list.length) + " more to make your own theme!");
  sfx.coin();
  showMyList();
}

function deleteMyQuestion(index) {
  const list = loadMyQuestions();
  if (!confirm("Delete this question?\n\n" + list[index].question)) return;
  list.splice(index, 1);
  storeMyQuestions(list);
  useMyQuestions();
  showMyList();
}

// Your questions, each with a ✖ button to delete it
function showMyList() {
  const list = loadMyQuestions();
  $("myq-count").textContent = list.length === 1 ? "You have 1 question." : "You have " + list.length + " questions.";
  const box = $("myq-list");
  box.innerHTML = "";
  list.forEach((q, i) => {
    const row = document.createElement("div");
    row.className = "myq-row";
    const text = document.createElement("span");
    text.className = "myq-text";
    text.textContent = q.question + "  ✔ " + q.answers[q.right]; // added as plain text, never as HTML
    const del = document.createElement("button");
    del.className = "myq-delete";
    del.textContent = "✖";
    del.title = "Delete this question";
    del.addEventListener("click", () => deleteMyQuestion(i));
    row.append(text, del);
    box.appendChild(row);
  });
}

document.querySelectorAll(".myq-right").forEach((btn, i) => btn.addEventListener("click", () => {
  myRight = i;
  showRightPicker();
}));
$("home-myq").addEventListener("click", showMyQuestions);
$("myq-add").addEventListener("click", addMyQuestion);
$("myq-back").addEventListener("click", () => $("myq-screen").classList.add("hidden"));
useMyQuestions();
