// ============================================
//  QUESTION OF THE DAY  -  one special question every day!
//  Everybody gets the same question on the same day. Each name can try it once a day.
//  Get it right and coins go into your piggy bank.
// ============================================
const DAILY_COINS = 250;
const DAILY_KEY = "quiz-pup-daily"; // the last day each name tried it

let dailyName = "";

// Today's date, like "2026-10-23"
function today() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

// The same question for everybody today: the date is turned into a number to pick it
function dailyQuestion() {
  const pool = QUESTIONS.filter(q => !q.logo && !q.anyLevel);
  let n = 0;
  for (const ch of today()) n = (n * 31 + ch.charCodeAt(0)) % 100003;
  return pool[n % pool.length];
}

// When each name last tried it, checked carefully: names are letters only, dates look like dates
function loadDaily() {
  try {
    const saved = JSON.parse(localStorage.getItem(DAILY_KEY));
    const days = {};
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return days;
    Object.keys(saved).slice(0, 30).forEach(name => {
      if (/^[A-Z]{1,8}$/.test(name) && /^\d{4}-\d{2}-\d{2}$/.test(saved[name])) days[name] = saved[name];
    });
    return days;
  } catch (e) {
    return {};
  }
}

function markDailyDone(name) {
  const days = loadDaily();
  days[name] = today();
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify(days));
  } catch (e) {
    // can't save in this browser
  }
}

// Step 1: who's playing?
function showDaily() {
  $("daily-date").textContent = "📅 " + new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  $("daily-who").classList.remove("hidden");
  $("daily-play").classList.add("hidden");
  $("daily-message").textContent = "";
  $("daily-name").value = dailyName;
  $("daily-screen").classList.remove("hidden");
}

// Step 2: the question
function startDaily() {
  dailyName = $("daily-name").value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8);
  if (!dailyName) {
    $("daily-message").textContent = "Type your name first!";
    return;
  }
  if (loadDaily()[dailyName] === today()) {
    $("daily-message").textContent = "You already did today's question, " + dailyName + "! Come back tomorrow 🌙";
    return;
  }
  const q = dailyQuestion();
  $("daily-message").textContent = "";
  $("daily-who").classList.add("hidden");
  $("daily-play").classList.remove("hidden");
  $("daily-theme").textContent = q.theme + "  •  " + LEVELS.find(l => l.key === q.level).name;
  $("daily-question").textContent = q.question;
  const box = $("daily-answers");
  box.innerHTML = "";
  q.answers.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerHTML = '<span class="letter">' + LETTERS[i] + ":</span>";
    btn.append(text);
    btn.addEventListener("click", () => answerDaily(q, i));
    box.appendChild(btn);
  });
}

// Step 3: right or wrong?
function answerDaily(q, i) {
  const buttons = $("daily-answers").querySelectorAll(".answer");
  buttons.forEach(b => { b.disabled = true; });
  buttons[q.right].classList.add("right");
  markDailyDone(dailyName);
  if (i === q.right) {
    const p = piggyShopper(dailyName);
    saveToPiggy(p, piggyFor(dailyName).coins + DAILY_COINS);
    giveSticker(p, "daily-star");
    $("daily-message").textContent = "🎉 Correct! +" + DAILY_COINS + " coins in " + dailyName + "'s piggy bank! 🐷 Come back tomorrow!";
    sfx.right();
    confetti(30);
  } else {
    buttons[i].classList.add("wrong");
    $("daily-message").textContent = "Oh no! The answer was " + q.answers[q.right] + ". Try again tomorrow! 🌙";
    sfx.wrong();
  }
}

$("home-daily").addEventListener("click", showDaily);
$("daily-go").addEventListener("click", startDaily);
$("daily-name").addEventListener("keydown", e => { if (e.key === "Enter") startDaily(); });
$("daily-back").addEventListener("click", () => $("daily-screen").classList.add("hidden"));
