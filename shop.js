// ============================================
//  PUP SHOP  -  add your own things to buy!
//  type:  "treat" - the pup eats it right away
//         "toy"   - sits next to the pup on stage
//         "wear"  - the pup wears it on its head (one at a time)
//         "trick" - a button you can press to make the pup do it,
//                   or to tease the other players!
//  price: how many coins it costs
// ============================================
const SHOP_ITEMS = [
  // Treats
  { type: "treat", emoji: "🦴", name: "Bone",        price: 100,  says: "Crunch crunch! Your pup LOVES it!" },
  { type: "treat", emoji: "🧁", name: "Pupcake",     price: 300, says: "Sprinkles everywhere! Happiest pup ever!" },
  { type: "treat", emoji: "🥩", name: "Super Steak", price: 1000, says: "POWER UP! +1 life!", life: true },

  // Toys
  { type: "toy", emoji: "🎾", name: "Tennis Ball", price: 200 },
  { type: "toy", emoji: "🥏", name: "Frisbee",     price: 300 },
  { type: "toy", emoji: "🧸", name: "Teddy",       price: 400 },

  // Dress-up
  { type: "wear", emoji: "🎀", name: "Bow",     price: 200 },
  { type: "wear", emoji: "🧢", name: "Cap",     price: 300 },
  { type: "wear", emoji: "🎩", name: "Top Hat", price: 500 },
  { type: "wear", emoji: "👑", name: "Crown",   price: 800 },

  // Tricks (emotes)
  // "sound" is one of the sounds in sound.js
  { type: "trick", emoji: "🗣️", name: "Bark",      price: 100,  move: "naughty", effect: "WOOF! WOOF!", sound: "bark",
    says: "barks: WOOF WOOF!",          tease: "barks at" },
  { type: "trick", emoji: "🌀", name: "Spin",      price: 200, move: "spin",    effect: "",            sound: "boing",
    says: "spins around! Wheee!",       tease: "spins around showing off to" },
  { type: "trick", emoji: "🔄", name: "Roll Over", price: 300, move: "roll",    effect: "",            sound: "boing",
    says: "rolls over! Good pup!",      tease: "rolls over laughing at" },
  { type: "trick", emoji: "💃", name: "Dance",     price: 400, move: "happy",   effect: "🎵🎶🎵",       sound: "fanfare",
    says: "drops the beat and DANCES!", tease: "does a victory dance in front of" },
  { type: "trick", emoji: "😜", name: "Raspberry", price: 600, move: "naughty", effect: "Pthhhbt! 😜",  sound: "raspberry",
    says: "blows a raspberry! Pthhhbt!", tease: "blows a raspberry at" },
];

const SHOP_SECTIONS = [
  { type: "treat", title: "🍖 Treats" },
  { type: "toy",   title: "🧸 Toys" },
  { type: "wear",  title: "👑 Dress-up" },
  { type: "trick", title: "⭐ Tricks" },
];

const shopScreen = $("shop-screen");
const shopSaysEl = $("shop-says");

function hasItem(p, item) {
  if (item.type === "toy") return p.owned.toys.includes(item.emoji);
  if (item.type === "wear") return p.owned.wear === item.emoji;
  if (item.type === "trick") return p.owned.tricks.includes(item);
  return false;
}

// Trick buttons under the pup on stage
function showTricks() {
  const tricksEl = $("tricks");
  tricksEl.innerHTML = "";
  me().owned.tricks.forEach(trick => {
    const btn = document.createElement("button");
    btn.className = "trick-button";
    btn.textContent = trick.emoji + " " + trick.name;
    btn.addEventListener("click", () => doTrick(trick));
    tricksEl.appendChild(btn);
  });
}

// Make a pup picture move, starting the animation again if it's already going
function animate(el, move) {
  el.classList.remove("happy", "naughty", "spin", "roll", "pee", "poop", "growl", "vase", "homework", "chase", "lick");
  void el.offsetWidth;
  el.classList.add(move);
}

function popEffect(text) {
  effectEl.className = "";
  void effectEl.offsetWidth;
  effectEl.textContent = text;
  effectEl.className = "pop";
}

function doTrick(trick) {
  animate(dogEl, trick.move);
  popEffect(trick.effect);
  sfx[trick.sound]();
  say(me().dogName + " " + trick.says);
}

// Another player's pup teases the player whose turn it is
function tease(owner, trick, pupEl) {
  animate(pupEl, trick.move);
  popEffect(trick.effect || trick.emoji);
  sfx[trick.sound]();
  say(owner.dogName + " " + trick.tease + " " + me().name + "! " + trick.emoji);
}

// Who is shopping right now: a player in the game, someone spending their piggy bank
// from the home screen, or nobody (just looking)
let shopper = null;

function openShop() {
  shopper = me();
  shopScreen.classList.remove("home");
  shopSaysEl.textContent = "Welcome to the Pup Shop, " + shopper.name + "! What would you like?";
  $("wallet-label").textContent = "COINS TO SPEND";
  $("shop-close").textContent = "Back to the show ▶";
  showShop();
  shopScreen.classList.remove("hidden");
}

// From the cart on the home screen: spend the coins in your piggy bank
function homeShop(name) {
  shopper = piggyShopper(name);
  shopScreen.classList.add("home");
  shopSaysEl.textContent = "Hi " + name + "! Things you buy here are yours to keep in every game. " +
    "Treats get eaten, so you buy those during a game.";
  $("wallet-label").textContent = "🐷 PIGGY BANK";
  $("shop-close").textContent = "Back home 🏠";
  $("piggy-screen").classList.add("hidden");
  showShop();
  shopScreen.classList.remove("hidden");
}

// Just looking: nobody has a piggy bank yet
function peekShop() {
  shopper = null;
  shopScreen.classList.add("home");
  shopSaysEl.textContent = "Have a look around! Win coins in the quiz and they go in your piggy bank.";
  $("shop-close").textContent = "Back home 🏠";
  $("piggy-screen").classList.add("hidden");
  showShop();
  shopScreen.classList.remove("hidden");
}

function showShop() {
  const p = shopper;
  const atHome = shopScreen.classList.contains("home");
  $("shop-wallet").classList.toggle("hidden", !p);
  if (p) {
    $("shop-coins").textContent = p.bank;
    $("shop-dog").innerHTML = pupHtml(p);
  } else {
    $("shop-dog").innerHTML = dogSvg("shiba");
  }
  const itemsEl = $("shop-items");
  itemsEl.innerHTML = "";

  SHOP_SECTIONS.forEach(section => {
    const title = document.createElement("h2");
    title.className = "shop-section";
    title.textContent = section.title;
    itemsEl.appendChild(title);

    const row = document.createElement("div");
    row.className = "shop-row";
    SHOP_ITEMS.filter(item => item.type === section.type).forEach(item => {
      const card = document.createElement("div");
      card.className = "shop-card";
      card.innerHTML = '<div class="shop-emoji">' + item.emoji + '</div><div class="shop-name">' + item.name + "</div>";

      const btn = document.createElement("button");
      btn.className = "buy-button";
      if (p && hasItem(p, item)) {
        btn.textContent = item.type === "wear" ? "Wearing ✓" : "Got it ✓";
        btn.disabled = true;
      } else if (p && atHome && item.type === "treat") {
        btn.textContent = "In a game";
        btn.disabled = true;
      } else if (p && item.life && p.lives >= LIVES) {
        btn.textContent = "Lives full";
        btn.disabled = true;
      } else {
        btn.innerHTML = '<span class="coin">Q</span> ' + item.price;
        btn.disabled = !p || p.bank < item.price;
        if (p) btn.addEventListener("click", () => buy(item));
      }
      card.appendChild(btn);
      row.appendChild(card);
    });
    itemsEl.appendChild(row);
  });
}

function buy(item) {
  const p = shopper;
  const atHome = shopScreen.classList.contains("home");
  p.bank -= item.price;
  sfx.coin();

  if (item.type === "treat") {
    if (item.life) p.lives++;
    shopSaysEl.textContent = item.emoji + " " + item.says;
  } else if (item.type === "toy") {
    p.owned.toys.push(item.emoji);
    shopSaysEl.textContent = item.emoji + " A new " + item.name + "! " + p.dogName + " will keep it on stage.";
  } else if (item.type === "wear") {
    p.owned.wear = item.emoji;
    shopSaysEl.textContent = item.emoji + " Looking fancy! " + p.dogName + " is wearing the " + item.name + ".";
  } else if (item.type === "trick") {
    p.owned.tricks.push(item);
    shopSaysEl.textContent = item.emoji + " " + p.dogName + " learned " + item.name + "! Press the button on stage to show it off" +
      (players.length > 1 ? " - or to tease the other players!" : ".");
  }

  // Toys, hats and tricks are kept forever, so save them (and the piggy bank coins at home)
  saveToPiggy(p, atHome ? p.bank : piggyFor(p.name).coins);

  showShop();
  animate($("shop-dog"), "happy");
  const wallet = $("shop-coins");
  wallet.classList.remove("bump");
  void wallet.offsetWidth;
  wallet.classList.add("bump");
  if (!atHome) {
    showStage();
    $("end-coins-num").textContent = p.bank;
  }
}

// ---------- Piggy bank ----------
// Every player name has a piggy bank, saved in this browser. Coins you bank in a game go in
// when the game ends. Toys, hats and tricks you buy are kept forever. Saved data could be
// anything, so it's always checked against the real shop items before it's used.
const PIGGY_KEY = "quiz-pup-piggy-banks";
const MAX_PIGGY_COINS = 9999999;
const MAX_PIGGIES = 30; // how many names can have a piggy bank

function itemNamed(type, name) {
  return SHOP_ITEMS.find(item => item.type === type && item.name === name);
}

function itemWithEmoji(type, emoji) {
  return SHOP_ITEMS.find(item => item.type === type && item.emoji === emoji);
}

function emptyPiggy(name) {
  return { name: name, coins: 0, breed: BREEDS[0].key, dogName: "Biscuit", toys: [], wear: "", tricks: [] };
}

// Check one saved piggy bank: names are letters only, and only real shop items are kept
function cleanPiggy(name, pig) {
  if (!/^[A-Z]{1,8}$/.test(name) || !pig || typeof pig !== "object") return null;
  const realItems = (type, list) => Array.isArray(list)
    ? [...new Set(list.filter(n => itemNamed(type, n)))] : [];
  const coins = Math.floor(Number(pig.coins));
  return {
    name: name,
    coins: Number.isFinite(coins) ? Math.min(Math.max(coins, 0), MAX_PIGGY_COINS) : 0,
    breed: BREEDS.some(b => b.key === pig.breed) ? pig.breed : BREEDS[0].key,
    dogName: typeof pig.dogName === "string" && pig.dogName.trim() ? pig.dogName.trim().slice(0, 14) : "Biscuit",
    toys: realItems("toy", pig.toys),
    wear: itemNamed("wear", pig.wear) ? pig.wear : "",
    tricks: realItems("trick", pig.tricks),
  };
}

function loadPiggies() {
  try {
    const saved = JSON.parse(localStorage.getItem(PIGGY_KEY));
    const piggies = {};
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return piggies;
    Object.keys(saved).slice(0, MAX_PIGGIES).forEach(name => {
      const pig = cleanPiggy(name, saved[name]);
      if (pig) piggies[name] = pig;
    });
    return piggies;
  } catch (e) {
    return {};
  }
}

function piggyFor(name) {
  return loadPiggies()[name] || emptyPiggy(name);
}

// Save a player's kept things and set their piggy bank coins
function saveToPiggy(p, coins) {
  const piggies = loadPiggies();
  if (!piggies[p.name] && Object.keys(piggies).length >= MAX_PIGGIES) {
    // Full up: make room by removing the piggy bank with the fewest coins
    const smallest = Object.values(piggies).sort((a, b) => a.coins - b.coins)[0];
    delete piggies[smallest.name];
  }
  const pig = cleanPiggy(p.name, {
    coins: coins,
    breed: p.breed,
    dogName: p.dogName,
    toys: p.owned.toys.map(emoji => (itemWithEmoji("toy", emoji) || {}).name),
    wear: (itemWithEmoji("wear", p.owned.wear) || {}).name,
    tricks: p.owned.tricks.map(trick => trick.name),
  });
  if (!pig) return;
  piggies[p.name] = pig;
  try {
    localStorage.setItem(PIGGY_KEY, JSON.stringify(piggies));
  } catch (e) {
    // can't save in this browser - it still works for this game
  }
  return pig;
}

// A player starting a game gets the toys, hat and tricks they bought before
function loadKeptItems(p) {
  const pig = piggyFor(p.name);
  p.owned.toys = pig.toys.map(name => itemNamed("toy", name).emoji);
  p.owned.wear = pig.wear ? itemNamed("wear", pig.wear).emoji : "";
  p.owned.tricks = pig.tricks.map(name => itemNamed("trick", name));
}

// Someone shopping from the home screen, with their piggy bank coins to spend
function piggyShopper(name) {
  const pig = piggyFor(name);
  const p = { name: name, dogName: pig.dogName, breed: pig.breed, bank: pig.coins, lives: LIVES,
    owned: { toys: [], wear: "", tricks: [] } };
  loadKeptItems(p);
  return p;
}

// At the end of a game, everyone's banked coins go into their piggy bank
function fillPiggyBanks() {
  return players.map(p => {
    const pig = saveToPiggy(p, piggyFor(p.name).coins + p.bank);
    return { name: p.name, added: p.bank, total: pig ? pig.coins : p.bank };
  });
}

// The cart on the home screen: pick whose piggy bank to spend
function showPiggyPicker() {
  const piggies = Object.values(loadPiggies()).sort((a, b) => b.coins - a.coins);
  const list = $("piggy-list");
  list.innerHTML = "";
  $("piggy-empty").classList.toggle("hidden", piggies.length > 0);
  piggies.forEach(pig => {
    const btn = document.createElement("button");
    btn.className = "piggy-button";
    const who = document.createElement("span");
    who.textContent = "🐷 " + pig.name;
    const coins = document.createElement("span");
    coins.className = "score-coins";
    coins.innerHTML = '<span class="coin">Q</span> ';
    coins.append(String(pig.coins)); // added as plain text, never as HTML
    btn.append(who, coins);
    btn.addEventListener("click", () => homeShop(pig.name));
    list.appendChild(btn);
  });
  $("piggy-screen").classList.remove("hidden");
}

$("end-shop").addEventListener("click", openShop);
$("home-shop").addEventListener("click", showPiggyPicker);
$("piggy-look").addEventListener("click", peekShop);
$("piggy-back").addEventListener("click", () => $("piggy-screen").classList.add("hidden"));
$("shop-close").addEventListener("click", () => shopScreen.classList.add("hidden"));
