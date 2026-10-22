// ============================================
//  QUIZ PUP DOGS  -  the 5 breeds and how they're drawn
//  Try changing the colors in DOG_LOOKS!
// ============================================
const BREEDS = [
  { key: "shiba",     name: "Shiba Inu" },
  { key: "pug",       name: "Pug" },
  { key: "husky",     name: "Husky" },
  { key: "poodle",    name: "Poodle" },
  { key: "dalmatian", name: "Dalmatian" },
];

const DOG_LOOKS = {
  shiba:     { fur: "#e8963d", ears: "pointy", earColor: "#e8963d", eyes: "#2b1a0f" },
  pug:       { fur: "#e3c08f", ears: "small",  earColor: "#3b2f2f", eyes: "#2b1a0f" },
  husky:     { fur: "#8a9bb0", ears: "pointy", earColor: "#8a9bb0", eyes: "#3fa9f5" },
  poodle:    { fur: "#f5d7b0", ears: "fluffy", earColor: "#f5d7b0", eyes: "#2b1a0f" },
  dalmatian: { fur: "#ffffff", ears: "floppy", earColor: "#222222", eyes: "#2b1a0f" },
};

const LINE = 'stroke="#1a1040" stroke-width="2.5" stroke-linejoin="round"';

// Makes a cartoon dog face as an SVG picture
function dogSvg(breed) {
  const d = DOG_LOOKS[breed] || DOG_LOOKS.shiba;
  let s = '<svg class="dog-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">';

  // Pointy ears go behind the head
  if (d.ears === "pointy") {
    s += '<path d="M20 48 L24 10 L48 30 Z" fill="' + d.earColor + '" ' + LINE + '/>';
    s += '<path d="M80 48 L76 10 L52 30 Z" fill="' + d.earColor + '" ' + LINE + '/>';
    s += '<path d="M27 40 L28 21 L41 31 Z" fill="#fff3e0"/>';
    s += '<path d="M73 40 L72 21 L59 31 Z" fill="#fff3e0"/>';
  }

  // Head
  s += '<ellipse cx="50" cy="56" rx="33" ry="30" fill="' + d.fur + '" ' + LINE + '/>';

  // Special markings for each breed
  if (breed === "shiba") {
    s += '<ellipse cx="50" cy="71" rx="23" ry="14" fill="#fff3e0"/>';
    s += '<circle cx="38" cy="45" r="3" fill="#fff3e0"/><circle cx="62" cy="45" r="3" fill="#fff3e0"/>';
  } else if (breed === "husky") {
    s += '<path d="M50 40 Q30 45 24 66 Q34 85 50 85 Q66 85 76 66 Q70 45 50 40 Z" fill="#ffffff"/>';
  } else if (breed === "pug") {
    s += '<ellipse cx="50" cy="69" rx="19" ry="14" fill="#3b2f2f"/>';
    s += '<path d="M40 38 Q50 33 60 38 M42 43 Q50 39 58 43" fill="none" stroke="#b8925c" stroke-width="2" stroke-linecap="round"/>';
  } else if (breed === "poodle") {
    s += '<ellipse cx="50" cy="71" rx="17" ry="13" fill="#fffaf2"/>';
  } else if (breed === "dalmatian") {
    s += '<ellipse cx="50" cy="71" rx="18" ry="13" fill="#ffffff"/>';
    s += '<circle cx="33" cy="40" r="4.5" fill="#222"/><circle cx="67" cy="37" r="3.5" fill="#222"/>';
    s += '<circle cx="75" cy="61" r="4" fill="#222"/><circle cx="26" cy="64" r="3" fill="#222"/>';
    s += '<circle cx="56" cy="44" r="2.2" fill="#222"/>';
  }

  // Floppy and fluffy ears hang over the side of the head
  if (d.ears === "floppy") {
    s += '<ellipse cx="20" cy="50" rx="11" ry="21" transform="rotate(20 20 50)" fill="' + d.earColor + '" ' + LINE + '/>';
    s += '<ellipse cx="80" cy="50" rx="11" ry="21" transform="rotate(-20 80 50)" fill="' + d.earColor + '" ' + LINE + '/>';
  } else if (d.ears === "small") {
    s += '<ellipse cx="24" cy="38" rx="9" ry="13" transform="rotate(40 24 38)" fill="' + d.earColor + '" ' + LINE + '/>';
    s += '<ellipse cx="76" cy="38" rx="9" ry="13" transform="rotate(-40 76 38)" fill="' + d.earColor + '" ' + LINE + '/>';
  } else if (d.ears === "fluffy") {
    s += '<g fill="' + d.fur + '" ' + LINE + '>';
    s += '<circle cx="18" cy="58" r="12"/><circle cx="20" cy="76" r="11"/>';
    s += '<circle cx="82" cy="58" r="12"/><circle cx="80" cy="76" r="11"/>';
    s += '<circle cx="37" cy="31" r="13"/><circle cx="63" cy="31" r="13"/><circle cx="50" cy="25" r="14"/>';
    s += '</g>';
  }

  // Eyes, nose, smile and tongue
  s += '<circle cx="38" cy="54" r="4.5" fill="' + d.eyes + '"/><circle cx="39.5" cy="52.5" r="1.5" fill="#fff"/>';
  s += '<circle cx="62" cy="54" r="4.5" fill="' + d.eyes + '"/><circle cx="63.5" cy="52.5" r="1.5" fill="#fff"/>';
  s += '<path d="M46 74 Q50 85 54 74 Z" fill="#ff6b8b" stroke="#1a1040" stroke-width="1.5"/>';
  s += '<path d="M50 68 L50 72 M42 72 Q46 76 50 72 Q54 76 58 72" fill="none" stroke="#1a1040" stroke-width="2" stroke-linecap="round"/>';
  s += '<ellipse cx="50" cy="65" rx="6" ry="4.5" fill="#1a1040"/>';

  return s + "</svg>";
}
