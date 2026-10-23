// ============================================
//  QUIZ PUP BACKGROUNDS  -  pick one with the 🎨 button on the home screen
//  Each background has:
//    name:    what it's called on its button
//    colors:  the top and bottom color of the sky (it fades from one to the other)
//    sprinkle: emoji scattered all over it (leave it out for none)
//    dark:    true if it's dark, so the words on the stage turn white
//    plain:   true for a plain color (shown under "Colors" on the picker)
//  Want a new one? Copy a line and change it!
// ============================================
const BACKGROUNDS = [
  { key: "classic", name: "Classic",       colors: ["#bfe6ff", "#7cc4f5"] },
  { key: "sunset",  name: "Sunset",        colors: ["#ffb36b", "#8e5bd6"], sprinkle: ["☁️"] },
  { key: "space",   name: "Space",         colors: ["#0b0630", "#2b1b6b"], sprinkle: ["⭐", "✨", "🪐"], dark: true },
  { key: "sea",     name: "Under the Sea", colors: ["#4fc3f7", "#01579b"], sprinkle: ["🐠", "🫧", "🐟"], dark: true },
  { key: "candy",   name: "Candy",         colors: ["#ffd1e8", "#ff9ccc"], sprinkle: ["🍭", "🍬", "🧁"] },
  { key: "flowers", name: "Flowers",       colors: ["#d8f8d0", "#7ed67a"], sprinkle: ["🌸", "🌼", "🌷"] },
  { key: "safari",  name: "Safari",        colors: ["#ffe0a3", "#e8b45a"], sprinkle: ["🦁", "🦒", "🌴", "🐘"] },
  { key: "bricks",  name: "Brick Wall",    bricks: true, dark: true },
  { key: "stage",   name: "Stage",         curtains: true, dark: true },
  { key: "city",    name: "City",          colors: ["#1a237e", "#5c6bc0"], sprinkle: ["🏙️", "🌃", "🚕"], dark: true },
  { key: "shop",    name: "Shop",          colors: ["#fff3c4", "#ffc4dd"], sprinkle: ["🛍️", "🛒", "🎁", "🧸"] },
  { key: "house",   name: "House",         colors: ["#fdf0d5", "#f2d6a2"], sprinkle: ["🖼️", "🪴", "🛋️"] },
  { key: "star",    name: "Movie Star",    colors: ["#2a0845", "#b3001b"], sprinkle: ["⭐", "📸", "🌟"], dark: true },
  { key: "sports",  name: "Sports",        colors: ["#a8e063", "#2e8b2e"], sprinkle: ["🏅", "⚽", "🏀", "🥇"] },

  // Plain colors
  { key: "pink",    name: "Pink",    plain: true, colors: ["#ffd6ec", "#ff8cc6"] },
  { key: "purple",  name: "Purple",  plain: true, colors: ["#e3d0ff", "#9b6dff"] },
  { key: "red",     name: "Red",     plain: true, colors: ["#ff8a80", "#d32f2f"], dark: true },
  { key: "orange",  name: "Orange",  plain: true, colors: ["#ffe0b2", "#ff9800"] },
  { key: "yellow",  name: "Yellow",  plain: true, colors: ["#fff9c4", "#ffd54f"] },
  { key: "green",   name: "Green",   plain: true, colors: ["#dcedc8", "#7cb342"] },
  { key: "teal",    name: "Teal",    plain: true, colors: ["#b2f5ea", "#26a69a"] },
  { key: "white",   name: "White",   plain: true, colors: ["#ffffff", "#e8e8f0"] },
  { key: "black",   name: "Black",   plain: true, colors: ["#3a3a4a", "#0d0d14"], dark: true },
];
const BACKGROUND_KEY = "quiz-pup-background"; // remembers which background you picked

// Turns a little SVG drawing into something CSS can use as a picture
function svgPicture(svg) {
  return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
}

// Emoji scattered on a 180 x 180 tile that repeats
function sprinklePicture(emojis) {
  const spots = [[16, 44], [104, 30], [58, 104], [140, 120], [20, 168], [100, 170]];
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><g opacity="0.45" font-size="30">';
  spots.forEach(([x, y], i) => {
    svg += '<text x="' + x + '" y="' + y + '">' + emojis[i % emojis.length] + "</text>";
  });
  return svgPicture(svg + "</g></svg>");
}

// The CSS background for one of the backgrounds above
function backgroundCss(bg) {
  if (bg.bricks) {
    const bricks = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40">' +
      '<rect width="60" height="40" fill="#d9c7b8"/><g fill="#b5543b">' +
      '<rect x="1" y="1" width="58" height="18"/><rect x="-29" y="21" width="58" height="18"/><rect x="31" y="21" width="58" height="18"/>' +
      "</g></svg>";
    return svgPicture(bricks);
  }
  if (bg.curtains) {
    return "radial-gradient(ellipse at 50% 0, rgba(255, 210, 63, 0.55), transparent 60%), " +
      "repeating-linear-gradient(90deg, #b3001b 0 22px, #7a0012 22px 44px)";
  }
  const sky = "linear-gradient(" + bg.colors[0] + ", " + bg.colors[1] + ")";
  return bg.sprinkle ? sprinklePicture(bg.sprinkle) + ", " + sky : sky;
}

function loadBackgroundChoice() {
  try {
    const key = localStorage.getItem(BACKGROUND_KEY);
    return BACKGROUNDS.some(b => b.key === key) ? key : BACKGROUNDS[0].key;
  } catch (e) {
    return BACKGROUNDS[0].key;
  }
}

let backgroundKey = loadBackgroundChoice();

function currentBackground() {
  return BACKGROUNDS.find(b => b.key === backgroundKey) || BACKGROUNDS[0];
}

// Paint the stage with the chosen background
function showBackground() {
  const bg = currentBackground();
  const stage = $("stage");
  stage.style.background = bg.key === "classic" ? "" : backgroundCss(bg);
  stage.classList.toggle("dark-bg", Boolean(bg.dark));
}

function chooseBackground(key) {
  backgroundKey = key;
  try {
    localStorage.setItem(BACKGROUND_KEY, key);
  } catch (e) {
    // can't remember it in this browser - that's OK
  }
  showBackground();
  showBackgroundPicker();
}

// The background picking screen: a button with a little preview for each one,
// pictures first and then plain colors
function showBackgroundPicker() {
  fillBackgroundButtons("background-pictures", BACKGROUNDS.filter(bg => !bg.plain));
  fillBackgroundButtons("background-colors", BACKGROUNDS.filter(bg => bg.plain));
  $("background-screen").classList.remove("hidden");
}

function fillBackgroundButtons(id, list) {
  const buttonsEl = $(id);
  buttonsEl.innerHTML = "";
  list.forEach(bg => {
    const btn = document.createElement("button");
    btn.className = "bg-button" + (bg.key === backgroundKey ? " chosen" : "");
    const preview = document.createElement("span");
    preview.className = "bg-preview";
    preview.style.background = backgroundCss(bg);
    btn.append(preview, bg.name);
    btn.addEventListener("click", () => chooseBackground(bg.key));
    buttonsEl.appendChild(btn);
  });
}

$("home-background").addEventListener("click", showBackgroundPicker);
$("background-done").addEventListener("click", () => $("background-screen").classList.add("hidden"));
showBackground();
