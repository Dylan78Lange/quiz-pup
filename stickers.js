// ============================================
//  QUIZ PUP STICKER BOOK  -  win stickers for doing cool things!
//  Every player name has its own sticker book, saved in this browser.
//  Open it with the 📒 button on the home screen.
//  Want a new sticker? Add it here, then call giveSticker(player, "its-key")
//  in the place in the game where you win it.
// ============================================
const STICKERS = [
  { key: "first-try",   emoji: "🎯", name: "First Try",     how: "Get your first right answer" },
  { key: "on-fire",     emoji: "🔥", name: "On Fire",       how: "Get 5 right answers in a row" },
  { key: "big-brain",   emoji: "🧠", name: "Big Brain",     how: "Get 10 right answers in one game" },
  { key: "easy",        emoji: "😊", name: "Easy Peasy",    how: "Beat an Easy level" },
  { key: "medium",      emoji: "😬", name: "Getting Tough", how: "Beat a Medium level" },
  { key: "hard",        emoji: "😱", name: "Brave Brain",   how: "Beat a Hard level" },
  { key: "champion",    emoji: "🏆", name: "Champion",      how: "Win the whole game" },
  { key: "explorer",    emoji: "🗺️", name: "Explorer",      how: "Play 3 different themes in one game" },
  { key: "pup-helper",  emoji: "🐶", name: "Pup Helper",    how: "Use Ask the Pup" },
  { key: "silly-pup",   emoji: "🤪", name: "Silly Pup",     how: "Your pup barks at a wrong answer" },
  { key: "slobbered",   emoji: "👅", name: "Slobbered",     how: "Your pup licks the screen" },
  { key: "shopper",     emoji: "🛍️", name: "Shopper",       how: "Buy something in the Pup Shop" },
  { key: "royal",       emoji: "👑", name: "Royal Pup",     how: "Buy the Crown" },
  { key: "piggy-rich",  emoji: "🐷", name: "Piggy Rich",    how: "Have 1,000 coins in your piggy bank" },
  { key: "party",       emoji: "🎉", name: "Party Time",    how: "Play with friends (2 or more players)" },
  { key: "never-give-up", emoji: "💪", name: "Never Give Up", how: "Keep trying until your lives run out" },
  { key: "lucky-spin",  emoji: "🎡", name: "Lucky Spin",    how: "Spin the Prize Wheel" },
  { key: "best-friends", emoji: "❤️", name: "Best Friends", how: "Make your pup totally happy (5 hearts)" },
  { key: "quiz-maker",  emoji: "✍️", name: "Quiz Maker",    how: "Play your own ✍️ My Questions quiz" },
  { key: "daily-star",  emoji: "📅", name: "Daily Star",    how: "Get the Question of the Day right" },
  { key: "speedy",      emoji: "⏱️", name: "Speedy",        how: "Beat the Clock with time to spare" },
];
const STICKER_KEY = "quiz-pup-sticker-books";
const MAX_BOOKS = 30; // how many names can have a sticker book

// Every saved sticker book, checked carefully: names are letters only, and only real stickers are kept
function loadStickerBooks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STICKER_KEY));
    const books = {};
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return books;
    Object.keys(saved).slice(0, MAX_BOOKS).forEach(name => {
      if (!/^[A-Z]{1,8}$/.test(name) || !Array.isArray(saved[name])) return;
      books[name] = [...new Set(saved[name].filter(key => STICKERS.some(s => s.key === key)))];
    });
    return books;
  } catch (e) {
    return {};
  }
}

function stickersFor(name) {
  return loadStickerBooks()[name] || [];
}

// Win a sticker! Does nothing if you already have it.
function giveSticker(p, key) {
  const sticker = STICKERS.find(s => s.key === key);
  if (!p || !sticker) return;
  const books = loadStickerBooks();
  const book = books[p.name] || [];
  if (book.includes(key)) return;
  if (!books[p.name] && Object.keys(books).length >= MAX_BOOKS) {
    // Full up: make room by removing the book with the fewest stickers
    const smallest = Object.keys(books).sort((a, b) => books[a].length - books[b].length)[0];
    delete books[smallest];
  }
  books[p.name] = book.concat(key);
  try {
    localStorage.setItem(STICKER_KEY, JSON.stringify(books));
  } catch (e) {
    // can't save in this browser - you still see the sticker pop up
  }
  popSticker(p, sticker);
}

// ---------- NEW STICKER! popup ----------
// If you win a few at once they pop up one after another
const stickerQueue = [];
let stickerShowing = false;

function popSticker(p, sticker) {
  stickerQueue.push({ who: p.name, sticker: sticker });
  if (!stickerShowing) showNextSticker();
}

function showNextSticker() {
  const next = stickerQueue.shift();
  if (!next) {
    stickerShowing = false;
    return;
  }
  stickerShowing = true;
  const box = document.createElement("div");
  box.className = "sticker-pop";
  const title = document.createElement("div");
  title.className = "sticker-pop-title";
  title.textContent = "NEW STICKER!";
  const emoji = document.createElement("div");
  emoji.className = "sticker-pop-emoji";
  emoji.textContent = next.sticker.emoji;
  const name = document.createElement("div");
  name.className = "sticker-pop-name";
  name.textContent = next.sticker.name + (players.length > 1 ? " for " + next.who : "");
  box.append(title, emoji, name);
  $("stage").appendChild(box);
  sfx.coin();
  setTimeout(() => {
    box.remove();
    showNextSticker();
  }, 2600);
}

// ---------- The sticker book ----------
// First pick whose book (like the piggy banks), then see all the stickers.
// Stickers you haven't won yet are grey, with a hint for how to win them.
function showStickerPicker() {
  const books = loadStickerBooks();
  const names = Object.keys(books).sort((a, b) => books[b].length - books[a].length);
  const list = $("sticker-names");
  list.innerHTML = "";
  $("sticker-empty").classList.toggle("hidden", names.length > 0);
  $("sticker-grid").innerHTML = "";
  $("sticker-who").textContent = names.length ? "Whose sticker book? (To delete one: swipe it left, or double-click it on a laptop)" : "";
  names.forEach(name => {
    // Each name sits on a red "delete" strip that shows when you swipe the name to the left
    const row = document.createElement("div");
    row.className = "swipe-row";
    const trash = document.createElement("div");
    trash.className = "swipe-trash";
    trash.textContent = "🗑️ Delete";
    trash.setAttribute("aria-hidden", "true");
    const btn = document.createElement("button");
    btn.className = "piggy-button";
    const who = document.createElement("span");
    who.textContent = "📒 " + name;
    const count = document.createElement("span");
    count.className = "score-coins";
    count.textContent = books[name].length + " / " + STICKERS.length;
    btn.append(who, count);
    addSwipeToDelete(btn, () => showStickerBook(name), () => deleteStickerBook(name));
    row.append(trash, btn);
    list.appendChild(row);
  });
  $("sticker-screen").classList.remove("hidden");
}

// On a phone: tap to open, swipe left far enough to delete.
// On a laptop: click to open, double-click to delete.
// (Either way it asks "are you sure?" before deleting.)
const SWIPE_DISTANCE = 90;     // how far you have to swipe, in pixels
const DOUBLE_CLICK_WAIT = 300; // a click waits this long (milliseconds) in case it's a double-click
function addSwipeToDelete(btn, onOpen, onDelete) {
  let startX = null;
  let moved = 0;
  let usingMouse = false;
  let clickTimer = null;

  btn.addEventListener("click", () => {
    if (btn.dataset.swiped) return; // a swipe isn't a tap
    if (!usingMouse) return onOpen();
    clearTimeout(clickTimer);
    clickTimer = setTimeout(onOpen, DOUBLE_CLICK_WAIT);
  });
  btn.addEventListener("dblclick", () => {
    if (!usingMouse) return;
    clearTimeout(clickTimer);
    onDelete();
  });

  btn.addEventListener("pointerdown", e => {
    usingMouse = e.pointerType === "mouse";
    delete btn.dataset.swiped;
    if (usingMouse) return; // swiping is for fingers
    startX = e.clientX;
    moved = 0;
    btn.classList.add("dragging");
    btn.setPointerCapture(e.pointerId);
  });
  btn.addEventListener("pointermove", e => {
    if (startX === null) return;
    moved = Math.min(0, e.clientX - startX); // only to the left
    btn.style.transform = "translateX(" + moved + "px)";
    btn.classList.toggle("swiped-far", moved < -SWIPE_DISTANCE);
  });
  const letGo = () => {
    if (startX === null) return;
    startX = null;
    if (moved < -10) btn.dataset.swiped = "yes"; // a swipe isn't a tap
    btn.style.transform = "";
    btn.classList.remove("swiped-far", "dragging");
    if (moved < -SWIPE_DISTANCE) onDelete();
  };
  btn.addEventListener("pointerup", letGo);
  btn.addEventListener("pointercancel", letGo);
}

function deleteStickerBook(name) {
  if (!confirm("Delete " + name + "'s sticker book? All their stickers will be gone for good!")) return;
  const books = loadStickerBooks();
  delete books[name];
  try {
    localStorage.setItem(STICKER_KEY, JSON.stringify(books));
  } catch (e) {
    // can't save in this browser
  }
  showStickerPicker();
}

function showStickerBook(name) {
  const got = stickersFor(name);
  $("sticker-names").innerHTML = "";
  $("sticker-who").textContent = name + "'s stickers: " + got.length + " of " + STICKERS.length;
  const grid = $("sticker-grid");
  grid.innerHTML = "";
  STICKERS.forEach(s => {
    const card = document.createElement("div");
    card.className = "sticker-card" + (got.includes(s.key) ? " got" : "");
    const emoji = document.createElement("div");
    emoji.className = "sticker-emoji";
    emoji.textContent = got.includes(s.key) ? s.emoji : "❔";
    const label = document.createElement("div");
    label.className = "sticker-name";
    label.textContent = s.name;
    const how = document.createElement("div");
    how.className = "sticker-how";
    how.textContent = s.how;
    card.append(emoji, label, how);
    grid.appendChild(card);
  });
}

$("home-stickers").addEventListener("click", showStickerPicker);
$("sticker-back").addEventListener("click", () => $("sticker-screen").classList.add("hidden"));
