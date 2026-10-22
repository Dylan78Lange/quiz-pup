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

// Makes a cartoon dog face as an SVG picture (used for small pups: strip, shop, setup)
function dogSvg(breed) {
  return '<svg class="dog-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' + dogFace(breed) + "</svg>";
}

// The face drawing itself, on a 100 x 100 grid
function dogFace(breed) {
  const d = DOG_LOOKS[breed] || DOG_LOOKS.shiba;
  let s = "";

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
  s += '<g class="eyes">';
  s += '<circle cx="38" cy="54" r="4.5" fill="' + d.eyes + '"/><circle cx="39.5" cy="52.5" r="1.5" fill="#fff"/>';
  s += '<circle cx="62" cy="54" r="4.5" fill="' + d.eyes + '"/><circle cx="63.5" cy="52.5" r="1.5" fill="#fff"/>';
  s += "</g>";
  s += '<path d="M46 74 Q50 85 54 74 Z" fill="#ff6b8b" stroke="#1a1040" stroke-width="1.5"/>';
  s += '<path d="M50 68 L50 72 M42 72 Q46 76 50 72 Q54 76 58 72" fill="none" stroke="#1a1040" stroke-width="2" stroke-linecap="round"/>';
  s += '<ellipse cx="50" cy="65" rx="6" ry="4.5" fill="#1a1040"/>';

  return s;
}

// Chest and paw colors for the full-body pup
const BODY_LOOKS = {
  shiba:     { chest: "#fff3e0", tail: "curl" },
  pug:       { chest: "#f0d5ab", tail: "curl" },
  husky:     { chest: "#ffffff", tail: "bushy" },
  poodle:    { chest: "#fffaf2", tail: "pom" },
  dalmatian: { chest: "#ffffff", tail: "thin" },
};

// The big full-body pup on stage. Every part has a class so CSS can animate it:
// .tail wags, .head tilts, .eyes blink, .hind-leg lifts, .puddle grows, .hearts float up.
// It's drawn on a 140 x 150 grid, sitting and facing you.
function dogBodySvg(breed) {
  const d = DOG_LOOKS[breed] || DOG_LOOKS.shiba;
  const b = BODY_LOOKS[breed] || BODY_LOOKS.shiba;
  const fur = 'fill="' + d.fur + '" ' + LINE;
  let s = '<svg class="dog-body" viewBox="0 0 140 150" xmlns="http://www.w3.org/2000/svg">';

  // Pee puddle, splash drops and stream (hidden until the pup pees)
  s += '<ellipse class="puddle" cx="124" cy="146" rx="26" ry="6" fill="#ffd21f" stroke="#c99a00" stroke-width="1.5"/>';
  s += '<g class="splash" fill="#ffd21f" stroke="#c99a00" stroke-width="1">';
  s += '<circle cx="108" cy="140" r="2.5"/><circle cx="138" cy="139" r="2"/><circle cx="130" cy="136" r="1.8"/></g>';
  s += '<path class="stream" d="M102 126 Q124 120 124 144" fill="none" stroke="#ffd21f" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="5 3"/>';

  // Tail: a thick dark line with a thinner fur-colored line on top
  const tailPath = b.tail === "curl" ? "M100 118 Q126 112 120 92 Q114 80 106 90"
    : b.tail === "bushy" ? "M100 118 Q128 110 122 82"
    : b.tail === "pom" ? "M100 118 Q118 112 118 94"
    : "M100 118 Q126 114 126 92";
  const tailWidth = b.tail === "bushy" ? 12 : b.tail === "thin" ? 6 : 9;
  s += '<g class="tail">';
  s += '<path d="' + tailPath + '" fill="none" stroke="#1a1040" stroke-width="' + (tailWidth + 5) + '" stroke-linecap="round"/>';
  s += '<path d="' + tailPath + '" fill="none" stroke="' + d.fur + '" stroke-width="' + tailWidth + '" stroke-linecap="round"/>';
  if (b.tail === "pom") s += '<circle cx="118" cy="90" r="9" ' + fur + "/>";
  s += "</g>";

  // Body, then the back legs (haunches) on top - the right one can lift up
  s += '<ellipse cx="70" cy="114" rx="33" ry="30" ' + fur + "/>";
  s += '<ellipse cx="40" cy="132" rx="14" ry="11" ' + fur + "/>";
  s += '<g class="hind-leg"><ellipse cx="100" cy="132" rx="14" ry="11" ' + fur + "/>";
  s += '<ellipse cx="106" cy="142" rx="9" ry="5" fill="' + b.chest + '" ' + LINE + "/></g>";

  // Chest
  s += '<ellipse cx="70" cy="118" rx="16" ry="20" fill="' + b.chest + '"/>';
  if (breed === "dalmatian") {
    s += '<circle cx="50" cy="104" r="4" fill="#222"/><circle cx="92" cy="110" r="3.5" fill="#222"/>';
    s += '<circle cx="86" cy="126" r="3" fill="#222"/><circle cx="48" cy="124" r="3" fill="#222"/>';
  }

  // Front legs and paws
  s += '<path d="M58 118 L58 140 M82 118 L82 140" stroke="#1a1040" stroke-width="14" stroke-linecap="round"/>';
  s += '<path d="M58 118 L58 140 M82 118 L82 140" stroke="' + d.fur + '" stroke-width="9" stroke-linecap="round"/>';
  s += '<ellipse cx="57" cy="143" rx="10" ry="6" fill="' + b.chest + '" ' + LINE + "/>";
  s += '<ellipse cx="83" cy="143" rx="10" ry="6" fill="' + b.chest + '" ' + LINE + "/>";
  if (breed === "poodle") {
    s += '<circle cx="57" cy="138" r="7" ' + fur + '/><circle cx="83" cy="138" r="7" ' + fur + "/>";
  }

  // Head (the same face as the small pups)
  s += '<g class="head"><svg x="20" y="0" width="100" height="100" viewBox="0 0 100 100" overflow="visible">' + dogFace(breed) + "</svg></g>";

  // Hearts that float up when the pup is happy
  s += '<g class="hearts" fill="#ff3b8d" stroke="#1a1040" stroke-width="1">';
  s += '<path class="heart h1" d="M30 30 c-4 -6 -12 -2 -8 4 l8 8 l8 -8 c4 -6 -4 -10 -8 -4 z"/>';
  s += '<path class="heart h2" d="M110 24 c-4 -6 -12 -2 -8 4 l8 8 l8 -8 c4 -6 -4 -10 -8 -4 z"/>';
  s += '<path class="heart h3" d="M70 8 c-4 -6 -12 -2 -8 4 l8 8 l8 -8 c4 -6 -4 -10 -8 -4 z"/>';
  s += "</g>";

  return s + "</svg>";
}
