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

function openShop() {
  shopScreen.classList.remove("peek");
  shopSaysEl.textContent = "Welcome to the Pup Shop, " + me().name + "! What would you like?";
  $("shop-close").textContent = "Back to the show ▶";
  showShop();
  shopScreen.classList.remove("hidden");
}

// From the cart on the home screen: look at everything, but nobody has coins yet
function peekShop() {
  shopScreen.classList.add("peek");
  shopSaysEl.textContent = "Have a look around! Win coins in the quiz to buy treats for your pup.";
  $("shop-close").textContent = "Back home 🏠";
  showShop();
  shopScreen.classList.remove("hidden");
}

function showShop() {
  const peeking = shopScreen.classList.contains("peek");
  const p = peeking ? null : me();
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
      if (!p) {
        btn.innerHTML = '<span class="coin">Q</span> ' + item.price;
        btn.disabled = true;
      } else if (hasItem(p, item)) {
        btn.textContent = item.type === "wear" ? "Wearing ✓" : "Got it ✓";
        btn.disabled = true;
      } else if (item.life && p.lives >= LIVES) {
        btn.textContent = "Lives full";
        btn.disabled = true;
      } else {
        btn.innerHTML = '<span class="coin">Q</span> ' + item.price;
        btn.disabled = p.bank < item.price;
        btn.addEventListener("click", () => buy(item));
      }
      card.appendChild(btn);
      row.appendChild(card);
    });
    itemsEl.appendChild(row);
  });
}

function buy(item) {
  const p = me();
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

  showShop();
  animate($("shop-dog"), "happy");
  const wallet = $("shop-coins");
  wallet.classList.remove("bump");
  void wallet.offsetWidth;
  wallet.classList.add("bump");
  showStage();
  $("end-coins-num").textContent = p.bank;
}

$("end-shop").addEventListener("click", openShop);
$("home-shop").addEventListener("click", peekShop);
$("shop-close").addEventListener("click", () => shopScreen.classList.add("hidden"));
