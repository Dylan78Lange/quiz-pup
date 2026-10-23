// ============================================
//  SPIN THE PRIZE WHEEL  -  one spin every time you pass a level!
//  Change the prizes here. Each one can give:
//    coins: that many coins       treat: true  - your pup eats a yummy bone
//    life: true  - +1 life        sticker: true - a mystery sticker
//  (no prize at all = "Oops! Nothing!")
// ============================================
const WHEEL_PRIZES = [
  { label: "+100",    emoji: "🪙", coins: 100,  color: "#ff3b8d" },
  { label: "+250",    emoji: "💰", coins: 250,  color: "#ffd23f" },
  { label: "Oops!",   emoji: "😜",              color: "#7b2cbf" },
  { label: "+500",    emoji: "💎", coins: 500,  color: "#2ecc40" },
  { label: "Treat",   emoji: "🦴", treat: true, color: "#4fc3f7" },
  { label: "+1000",   emoji: "🤑", coins: 1000, color: "#ff9800" },
  { label: "Life",    emoji: "❤️", life: true,  color: "#ff4136" },
  { label: "Sticker", emoji: "⭐", sticker: true, color: "#00bfa5" },
];
const SPIN_SECONDS = 4; // how long the wheel spins

const wheelEl = $("wheel");
let wheelTurn = 0;      // how far the wheel has turned so far (degrees)
let wheelSpinning = false;

// Draw the wheel: one colored slice per prize, starting at the top and going clockwise
function drawWheel() {
  const size = 360 / WHEEL_PRIZES.length;
  const point = angle => {
    const r = angle * Math.PI / 180;
    return (100 + 95 * Math.sin(r)).toFixed(2) + " " + (100 - 95 * Math.cos(r)).toFixed(2);
  };
  let s = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">';
  WHEEL_PRIZES.forEach((prize, i) => {
    const from = i * size;
    const middle = from + size / 2;
    s += '<path d="M100 100 L' + point(from) + " A95 95 0 0 1 " + point(from + size) + ' Z" fill="' + prize.color +
      '" stroke="#1a1040" stroke-width="2"/>';
    s += '<g transform="rotate(' + middle + ' 100 100)">';
    s += '<text x="100" y="32" text-anchor="middle" font-size="18">' + prize.emoji + "</text>";
    s += '<text x="100" y="50" text-anchor="middle" font-size="11" font-weight="900" font-family="sans-serif" fill="#1a1040">' +
      prize.label + "</text></g>";
  });
  s += '<circle cx="100" cy="100" r="95" fill="none" stroke="#ffd23f" stroke-width="5"/>';
  s += '<circle cx="100" cy="100" r="14" fill="#ffd23f" stroke="#1a1040" stroke-width="3"/>';
  wheelEl.innerHTML = s + "</svg>";
}

function openWheel() {
  $("wheel-result").textContent = "Spin to win a prize, " + me().name + "!";
  $("wheel-spin").textContent = "🎡 SPIN!";
  $("wheel-spin").classList.remove("hidden");
  $("wheel-done").classList.add("hidden");
  $("wheel-screen").classList.remove("hidden");
}

function spinWheel() {
  const p = me();
  if (wheelSpinning || !p.wheelReady) return;
  wheelSpinning = true;
  p.wheelReady = false;
  $("wheel-spin").classList.add("hidden");
  $("wheel-result").textContent = "Round and round it goes...";

  // Pick the prize first, then turn the wheel so that slice stops under the arrow
  const i = Math.floor(Math.random() * WHEEL_PRIZES.length);
  const size = 360 / WHEEL_PRIZES.length;
  const wobble = (Math.random() - 0.5) * size * 0.7; // don't always stop in the exact middle
  const target = 360 - (i * size + size / 2) + wobble;
  wheelTurn += 360 * 5 + ((target - wheelTurn) % 360 + 360) % 360;
  wheelEl.style.transitionDuration = SPIN_SECONDS + "s";
  wheelEl.style.transform = "rotate(" + wheelTurn + "deg)";

  // Tick-tick-tick, slowing down like the wheel
  let gap = 50;
  let at = 0;
  while (at < SPIN_SECONDS * 1000 - 200) {
    setTimeout(sfx.tick, at);
    at += gap;
    gap *= 1.09;
  }
  setTimeout(() => givePrize(p, WHEEL_PRIZES[i]), SPIN_SECONDS * 1000 + 100);
}

function givePrize(p, prize) {
  wheelSpinning = false;
  let text = prize.emoji + " ";
  let extraCoins = 0;
  if (prize.coins) {
    extraCoins = prize.coins;
    text += "+" + prize.coins + " coins for " + p.name + "!";
  } else if (prize.treat) {
    cheerUpPup(p, 20);
    text += p.dogName + " munches a yummy bone! Crunch crunch!";
  } else if (prize.life) {
    if (p.lives < LIVES) {
      p.lives++;
      text += "+1 life! You have " + p.lives + " now!";
    } else {
      extraCoins = 250;
      text += "Your lives are full, so here's 250 coins instead!";
    }
  } else if (prize.sticker) {
    const missing = STICKERS.filter(s => !stickersFor(p.name).includes(s.key));
    if (missing.length) {
      giveSticker(p, pick(missing).key);
      text += "A mystery sticker! Look at it go!";
    } else {
      extraCoins = 250;
      text += "You have every sticker, so here's 250 coins instead!";
    }
  } else {
    text += "Oops! Nothing this time. Better luck next spin!";
  }
  if (extraCoins) {
    p.bank += extraCoins;
    $("end-coins-num").textContent = p.bank;
    sfx.coin();
    confetti(20);
  } else if (prize.treat || prize.life || prize.sticker) {
    sfx.fanfare();
  } else {
    sfx.boing();
  }
  giveSticker(p, "lucky-spin");
  $("wheel-result").textContent = text;
  $("wheel-done").classList.remove("hidden");
  $("end-wheel").classList.add("hidden");
  showStage();
}

drawWheel();
$("end-wheel").addEventListener("click", openWheel);
$("wheel-spin").addEventListener("click", spinWheel);
$("wheel-done").addEventListener("click", () => $("wheel-screen").classList.add("hidden"));
