// ============================================
//  PUP SHOP  -  add your own things to buy!
//  type:  "treat" - the pup eats it right away
//         "toy"   - sits next to the pup on stage
//         "wear"  - the pup wears it on its head (one at a time)
//         "trick" - a button you can press to make the pup do it
//  price: how many coins it costs
// ============================================
const SHOP_ITEMS = [
  // Treats
  { type: "treat", emoji: "🦴", name: "Bone",        price: 50,  says: "Crunch crunch! The pup LOVES it!" },
  { type: "treat", emoji: "🧁", name: "Pupcake",     price: 150, says: "Sprinkles everywhere! Happiest pup ever!" },
  { type: "treat", emoji: "🥩", name: "Super Steak", price: 500, says: "POWER UP! +1 life!", life: true },

  // Toys
  { type: "toy", emoji: "🎾", name: "Tennis Ball", price: 100 },
  { type: "toy", emoji: "🥏", name: "Frisbee",     price: 150 },
  { type: "toy", emoji: "🧸", name: "Teddy",       price: 200 },

  // Dress-up
  { type: "wear", emoji: "🎀", name: "Bow",     price: 100 },
  { type: "wear", emoji: "🧢", name: "Cap",     price: 150 },
  { type: "wear", emoji: "🎩", name: "Top Hat", price: 250 },
  { type: "wear", emoji: "👑", name: "Crown",   price: 400 },

  // Tricks (emotes)
  { type: "trick", emoji: "🗣️", name: "Bark",      price: 50,  move: "naughty", effect: "WOOF! WOOF!", says: "The pup barks: WOOF WOOF!" },
  { type: "trick", emoji: "🌀", name: "Spin",      price: 100, move: "spin",    effect: "",            says: "Wheee! The pup spins around!" },
  { type: "trick", emoji: "🔄", name: "Roll Over", price: 150, move: "roll",    effect: "",            says: "The pup rolls over! Good pup!" },
  { type: "trick", emoji: "💃", name: "Dance",     price: 200, move: "happy",   effect: "🎵🎶🎵",       says: "Drop the beat! The pup is dancing!" },
  { type: "trick", emoji: "😜", name: "Raspberry", price: 300, move: "naughty", effect: "Pthhhbt! 😜",  says: "The pup blows a raspberry! Pthhhbt!" },
];

const SHOP_SECTIONS = [
  { type: "treat", title: "🍖 Treats" },
  { type: "toy",   title: "🧸 Toys" },
  { type: "wear",  title: "👑 Dress-up" },
  { type: "trick", title: "⭐ Tricks" },
];

// What the pup has this game
let owned = { toys: [], wear: "", tricks: [] };

const shopScreen = document.getElementById("shop-screen");
const shopSaysEl = document.getElementById("shop-says");

function resetShop() {
  owned = { toys: [], wear: "", tricks: [] };
  showPupStuff();
}

function hasItem(item) {
  if (item.type === "toy") return owned.toys.includes(item.emoji);
  if (item.type === "wear") return owned.wear === item.emoji;
  if (item.type === "trick") return owned.tricks.includes(item);
  return false;
}

// Put the hat, toys and trick buttons on the stage
function showPupStuff() {
  document.getElementById("hat").textContent = owned.wear;
  document.getElementById("shop-hat").textContent = owned.wear;
  document.getElementById("toys").textContent = owned.toys.join(" ");
  const tricksEl = document.getElementById("tricks");
  tricksEl.innerHTML = "";
  owned.tricks.forEach(trick => {
    const btn = document.createElement("button");
    btn.className = "trick-button";
    btn.textContent = trick.emoji + " " + trick.name;
    btn.addEventListener("click", () => doTrick(trick));
    tricksEl.appendChild(btn);
  });
}

function doTrick(trick) {
  dogEl.className = "";
  void dogEl.offsetWidth; // restart the animation
  dogEl.className = trick.move;
  effectEl.className = "";
  void effectEl.offsetWidth;
  effectEl.textContent = trick.effect;
  effectEl.className = "pop";
  hostSaysEl.textContent = trick.says;
}

function openShop() {
  shopSaysEl.textContent = "Welcome to the Pup Shop! What would you like?";
  showShop();
  shopScreen.classList.remove("hidden");
}

function showShop() {
  document.getElementById("shop-coins").textContent = bank;
  const itemsEl = document.getElementById("shop-items");
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
      if (hasItem(item)) {
        btn.textContent = item.type === "wear" ? "Wearing ✓" : "Got it ✓";
        btn.disabled = true;
      } else if (item.life && lives >= LIVES) {
        btn.textContent = "Lives full";
        btn.disabled = true;
      } else {
        btn.innerHTML = '<span class="coin">Q</span> ' + item.price;
        btn.disabled = bank < item.price;
        btn.addEventListener("click", () => buy(item));
      }
      card.appendChild(btn);
      row.appendChild(card);
    });
    itemsEl.appendChild(row);
  });
}

function buy(item) {
  bank -= item.price;

  if (item.type === "treat") {
    if (item.life) lives++;
    shopSaysEl.textContent = item.emoji + " " + item.says;
  } else if (item.type === "toy") {
    owned.toys.push(item.emoji);
    shopSaysEl.textContent = item.emoji + " A new " + item.name + "! Your pup will keep it on stage.";
  } else if (item.type === "wear") {
    owned.wear = item.emoji;
    shopSaysEl.textContent = item.emoji + " Looking fancy! Your pup is wearing the " + item.name + ".";
  } else if (item.type === "trick") {
    owned.tricks.push(item);
    shopSaysEl.textContent = item.emoji + " Your pup learned " + item.name + "! Press the button on stage to show it off.";
  }

  const shopDog = document.getElementById("shop-dog");
  shopDog.className = "";
  void shopDog.offsetWidth;
  shopDog.className = "happy";

  showHud();
  showPupStuff();
  showShop();
  document.getElementById("end-coins-num").textContent = bank;
}

document.getElementById("end-shop").addEventListener("click", openShop);
document.getElementById("shop-close").addEventListener("click", () => shopScreen.classList.add("hidden"));
