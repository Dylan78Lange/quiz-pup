// ============================================
//  BEAT THE CLOCK  -  a countdown on Hard questions
//  Answer fast for a speedy bonus! If time runs out, it counts as a wrong answer.
//  Turn it on or off on the "Pick a Level" screen.
// ============================================
const CLOCK_SECONDS = 20;   // how long you get for each Hard question
const SPEEDY_SECONDS = 10;  // answer with at least this many seconds left for the bonus
const SPEEDY_BONUS = 100;   // the speedy bonus coins
const CLOCK_KEY = "quiz-pup-clock"; // remembers if the clock is on or off

let clockOn = loadClockChoice();
let clockTimer = null;
let clockEnds = 0;

function loadClockChoice() {
  try {
    return localStorage.getItem(CLOCK_KEY) !== "off";
  } catch (e) {
    return true;
  }
}

function toggleClock() {
  clockOn = !clockOn;
  try {
    localStorage.setItem(CLOCK_KEY, clockOn ? "on" : "off");
  } catch (e) {
    // can't remember it in this browser - that's OK
  }
  showClockToggle();
}

function showClockToggle() {
  $("clock-toggle").textContent = "⏱️ Beat the Clock on Hard: " + (clockOn ? "ON" : "OFF");
  $("clock-toggle").classList.toggle("off", !clockOn);
}

// Start the countdown (only on Hard, and only if the clock is on)
function startClock() {
  stopClock();
  if (!clockOn || level().key !== "hard") return;
  clockEnds = Date.now() + CLOCK_SECONDS * 1000;
  $("clock").classList.remove("hidden");
  let lastSecond = CLOCK_SECONDS;
  const update = () => {
    const left = Math.max(0, clockEnds - Date.now()) / 1000;
    $("clock-fill").style.width = (left / CLOCK_SECONDS * 100) + "%";
    $("clock-num").textContent = "⏱️ " + Math.ceil(left);
    $("clock").classList.toggle("hurry", left <= 5);
    if (Math.ceil(left) < lastSecond) {
      lastSecond = Math.ceil(left);
      if (left <= 5 && left > 0) sfx.tick();
    }
    if (left <= 0) {
      stopClock();
      chooseAnswer(-1); // time's up counts as a wrong answer
    }
  };
  update();
  clockTimer = setInterval(update, 100);
}

// Stop the countdown. Returns how many seconds were left (0 if it wasn't running).
function stopClock() {
  if (!clockTimer) {
    $("clock").classList.add("hidden");
    return 0;
  }
  clearInterval(clockTimer);
  clockTimer = null;
  return Math.max(0, clockEnds - Date.now()) / 1000;
}

// Answered right with lots of time left? Speedy bonus!
function speedyBonus(p, secondsLeft) {
  if (secondsLeft < SPEEDY_SECONDS) return "";
  p.pot += SPEEDY_BONUS;
  giveSticker(p, "speedy");
  return " ⏱️ Speedy bonus +" + SPEEDY_BONUS + "!";
}

$("clock-toggle").addEventListener("click", toggleClock);
showClockToggle();
