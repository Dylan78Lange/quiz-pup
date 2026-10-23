// ============================================
//  PUP CARE  -  keep your pup happy!
//  Your pup has a happiness meter (5 hearts) next to its name.
//  Right answers make it happier, wrong ones make it sad.
//  After each level you can pet, play with and feed your pup (once each).
//  A totally happy pup gives you a bonus when you pass a level!
// ============================================
const HAPPY_START = 60;       // how happy a pup is at the start of the game (0 to 100)
const HAPPY_RIGHT = 5;        // a right answer
const HAPPY_WRONG = -15;      // a wrong answer
const HAPPY_BONUS_COINS = 100; // bonus for passing a level with a totally happy pup
const PUP_CARE = [
  { key: "pet",  emoji: "🤚", name: "Pet",  happy: 10, sound: "boing", says: "loves the cuddles!" },
  { key: "play", emoji: "🎾", name: "Play", happy: 15, sound: "bark",  says: "fetches the ball! Again! Again!" },
  { key: "feed", emoji: "🦴", name: "Feed", happy: 20, sound: "burp",  says: "gobbles up a yummy bone!" },
];

// Five hearts: full ones for each 20 happiness
function happyHearts(p) {
  const full = Math.round(p.happy / 20);
  return "❤️".repeat(full) + "🤍".repeat(5 - full);
}

// Make the pup happier (or sadder, with a minus number)
function cheerUpPup(p, amount) {
  p.happy = Math.max(0, Math.min(100, p.happy + amount));
  if (p.happy >= 100) giveSticker(p, "best-friends");
  showHappiness();
}

function showHappiness() {
  if (!players.length) return;
  const p = me();
  $("pup-happy").textContent = happyHearts(p);
  $("care-hearts").textContent = happyHearts(p);
}

// When you pass a level: a totally happy pup gives you bonus coins
function happyPupBonus(p) {
  if (p.happy < 100) return "";
  p.bank += HAPPY_BONUS_COINS;
  return " 💕 Happy pup bonus: +" + HAPPY_BONUS_COINS + " coins!";
}

// The Pup Care buttons on the end-of-level screen
function showPupCare(between) {
  const p = me();
  $("pup-care").classList.toggle("hidden", !between);
  if (!between) return;
  showHappiness();
  const buttonsEl = $("care-buttons");
  buttonsEl.innerHTML = "";
  PUP_CARE.forEach(care => {
    const btn = document.createElement("button");
    btn.className = "care-button";
    btn.textContent = care.emoji + " " + care.name;
    btn.disabled = p.careDone.includes(care.key);
    btn.addEventListener("click", () => {
      p.careDone.push(care.key);
      btn.disabled = true;
      cheerUpPup(p, care.happy);
      sfx[care.sound]();
      $("end-text").textContent = p.dogName + " " + care.says + " " + care.emoji;
      animate($("care-pup"), "happy");
    });
    buttonsEl.appendChild(btn);
  });
  $("care-pup").innerHTML = pupHtml(p);
}
