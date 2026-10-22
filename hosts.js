// ============================================
//  QUIZ PUP HOSTS  -  how the two hosts are drawn
//  Every moving part has a class so style.css can animate it:
//    .eyes blink, .mouth-open / .mouth-closed swap while talking,
//    .arm-right waves, points, cheers and facepalms.
//  Both hosts are drawn on a 100 x 120 grid.
// ============================================
const HOST_LINE = 'stroke="#1a1040" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';

function hostSvg(key) {
  return key === "robot" ? robotHostSvg() : humanHostSvg();
}

// A cool 90s game-show presenter: big hair, shiny purple suit, bow tie and a mic
function humanHostSvg() {
  const skin = "#f5c99b";
  const suit = "#7b2cbf";
  let s = '<svg class="host-svg human" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">';

  // Suit, shirt, bow tie, and shiny suit sparkles
  s += '<path d="M22 120 L28 82 Q50 72 72 82 L78 120 Z" fill="' + suit + '" ' + HOST_LINE + "/>";
  s += '<path d="M43 78 L50 98 L57 78 Z" fill="#ffffff" ' + HOST_LINE + "/>";
  s += '<path d="M42 80 L50 84 L42 88 Z M58 80 L50 84 L58 88 Z" fill="#ff3b8d" ' + HOST_LINE + "/>";
  s += '<g class="sparkles" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8">';
  s += '<path d="M33 96 l4 -4 M66 104 l4 -4 M36 110 l3 -3"/></g>';

  // Neck, head and ears
  s += '<rect x="45" y="64" width="10" height="12" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += '<g class="host-head">';
  s += '<circle cx="33" cy="52" r="4" fill="' + skin + '" ' + HOST_LINE + '/><circle cx="67" cy="52" r="4" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += '<ellipse cx="50" cy="50" rx="17" ry="19" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Big 90s pompadour hair and sideburns
  s += '<path d="M32 46 Q28 22 46 19 Q56 8 70 18 Q76 28 68 40 Q64 30 52 32 Q40 30 34 46 Z" fill="#3b2314" ' + HOST_LINE + "/>";
  s += '<path d="M47 22 Q55 15 64 21" fill="none" stroke="#6d4a2f" stroke-width="2"/>';

  // Eyebrows, eyes and rosy cheeks
  s += '<g class="brows" stroke="#3b2314" stroke-width="2.5" stroke-linecap="round"><path d="M39 43 L46 42"/><path d="M54 42 L61 43"/></g>';
  s += '<g class="eyes" fill="#1a1040"><circle cx="43" cy="49" r="2.6"/><circle cx="57" cy="49" r="2.6"/></g>';
  s += '<circle cx="39" cy="57" r="3" fill="#ff9aa2" opacity="0.6"/><circle cx="61" cy="57" r="3" fill="#ff9aa2" opacity="0.6"/>';

  // Mouth: a big smile, and an open mouth for talking
  s += '<path class="mouth-closed" d="M42 59 Q50 66 58 59 Z" fill="#ffffff" ' + HOST_LINE + "/>";
  s += '<g class="mouth-open"><ellipse cx="50" cy="61" rx="6" ry="5" fill="#7a1f2b" ' + HOST_LINE + "/>";
  s += '<rect x="45" y="56.5" width="10" height="2.5" fill="#ffffff"/></g>';
  s += "</g>";

  // Left arm holding the microphone up to his mouth (it stays put)
  s += '<path d="M30 86 L20 100 L33 74" fill="none" stroke="#1a1040" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M30 86 L20 100 L33 74" fill="none" stroke="' + suit + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M34 72 L38 64" stroke="#333" stroke-width="4" stroke-linecap="round"/>';
  s += '<circle cx="39" cy="61" r="4.5" fill="#9e9e9e" ' + HOST_LINE + "/>";
  s += '<circle cx="33" cy="74" r="4" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Right arm: this one does all the gestures (it turns around the shoulder at 70, 86)
  s += '<g class="arm-right">';
  s += '<path d="M70 86 L78 112" stroke="#1a1040" stroke-width="12" stroke-linecap="round"/>';
  s += '<path d="M70 86 L78 112" stroke="' + suit + '" stroke-width="7" stroke-linecap="round"/>';
  s += '<circle cx="79" cy="114" r="4.5" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += "</g>";

  return s + "</svg>";
}

// A friendly robot: blinking antenna, screen face with LED eyes and an equalizer mouth
function robotHostSvg() {
  const metal = "#b0bec5";
  let s = '<svg class="host-svg robot" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">';

  // Wheels and body with flashing chest lights and a bow tie
  s += '<rect x="30" y="104" width="40" height="14" rx="7" fill="#37474f" ' + HOST_LINE + "/>";
  s += '<circle cx="40" cy="111" r="3" fill="#90a4ae"/><circle cx="50" cy="111" r="3" fill="#90a4ae"/><circle cx="60" cy="111" r="3" fill="#90a4ae"/>';
  s += '<rect x="26" y="58" width="48" height="46" rx="7" fill="#90a4ae" ' + HOST_LINE + "/>";
  s += '<rect x="34" y="72" width="32" height="20" rx="4" fill="#37474f" ' + HOST_LINE + "/>";
  s += '<g class="chest-lights"><circle class="light l1" cx="42" cy="82" r="3.5" fill="#ff5252"/>';
  s += '<circle class="light l2" cx="50" cy="82" r="3.5" fill="#ffd23f"/><circle class="light l3" cx="58" cy="82" r="3.5" fill="#39ff14"/></g>';
  s += '<path d="M42 60 L50 64 L42 68 Z M58 60 L50 64 L58 68 Z" fill="#ff3b8d" ' + HOST_LINE + "/>";

  // Neck, head, antenna and side bolts
  s += '<rect x="45" y="50" width="10" height="8" fill="#78909c" ' + HOST_LINE + "/>";
  s += '<g class="host-head">';
  s += '<path d="M50 14 L50 5" stroke="#1a1040" stroke-width="2.5"/>';
  s += '<circle class="antenna-light" cx="50" cy="5" r="4" fill="#ff3b8d" ' + HOST_LINE + "/>";
  s += '<rect x="24" y="26" width="6" height="12" rx="2" fill="#78909c" ' + HOST_LINE + "/>";
  s += '<rect x="70" y="26" width="6" height="12" rx="2" fill="#78909c" ' + HOST_LINE + "/>";
  s += '<rect x="28" y="14" width="44" height="38" rx="9" fill="' + metal + '" ' + HOST_LINE + "/>";
  s += '<rect x="33" y="19" width="34" height="27" rx="5" fill="#0b1a0b" ' + HOST_LINE + "/>";

  // LED eyes, flat mouth, and equalizer-bar mouth for talking
  s += '<g class="eyes" fill="#39ff14"><rect x="38" y="25" width="7" height="7" rx="2"/><rect x="55" y="25" width="7" height="7" rx="2"/></g>';
  s += '<path class="mouth-closed" d="M40 39 Q50 43 60 39" fill="none" stroke="#39ff14" stroke-width="2.5" stroke-linecap="round"/>';
  s += '<g class="mouth-open" fill="#39ff14">';
  [40, 44, 48, 52, 56].forEach((x, i) => {
    s += '<rect class="bar bar' + i + '" x="' + x + '" y="35" width="3" height="8"/>';
  });
  s += "</g></g>";

  // Left arm holding a microphone (it stays put)
  s += '<path d="M27 66 L16 82 L32 58" fill="none" stroke="#1a1040" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M27 66 L16 82 L32 58" fill="none" stroke="#78909c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M33 56 L36 48" stroke="#333" stroke-width="4" stroke-linecap="round"/>';
  s += '<circle cx="37" cy="45" r="4.5" fill="#9e9e9e" ' + HOST_LINE + "/>";

  // Right arm with a claw hand: this one does the gestures (turns around the shoulder at 73, 66)
  s += '<g class="arm-right">';
  s += '<path d="M73 66 L82 92" stroke="#1a1040" stroke-width="10" stroke-linecap="round"/>';
  s += '<path d="M73 66 L82 92" stroke="#78909c" stroke-width="6" stroke-linecap="round"/>';
  s += '<path d="M78 94 L80 101 M86 94 L84 101" stroke="#1a1040" stroke-width="3.5" stroke-linecap="round"/>';
  s += '<circle cx="82" cy="93" r="4" fill="#ffd23f" ' + HOST_LINE + "/>";
  s += "</g>";

  return s + "</svg>";
}
