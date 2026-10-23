// ============================================
//  QUIZ PUP HOSTS  -  how the hosts are drawn
//  Every moving part has a class so style.css can animate it:
//    .eyes blink, .mouth-open / .mouth-closed swap while talking,
//    .arm-right waves, points, cheers and facepalms.
//  All hosts are drawn on a 100 x 120 grid.
// ============================================
const HOST_LINE = 'stroke="#1a1040" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';

function hostSvg(key) {
  if (key === "robot") return robotHostSvg();
  if (key === "alien") return alienHostSvg();
  if (key === "pirate") return pirateHostSvg();
  if (key === "mermaid") return mermaidHostSvg();
  if (key === "brick") return brickHostSvg();
  return humanHostSvg();
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

// A friendly green alien: three big eyes, wiggly antennae, and a little flying saucer
function alienHostSvg() {
  const skin = "#7ee05a";
  const suit = "#5b3fd1";
  let s = '<svg class="host-svg alien" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">';

  // Space suit with a star badge
  s += '<path d="M28 104 L31 80 Q50 70 69 80 L72 104 Z" fill="' + suit + '" ' + HOST_LINE + "/>";
  s += '<path d="M50 84 l2.4 5 l5.4 .6 l-4 3.7 l1.1 5.3 l-4.9 -2.7 l-4.9 2.7 l1.1 -5.3 l-4 -3.7 l5.4 -.6 z" fill="#ffd23f" stroke="#1a1040" stroke-width="1.2"/>';

  // Flying saucer the alien rides in, with blinking lights
  s += '<ellipse cx="50" cy="106" rx="40" ry="10" fill="#b0bec5" ' + HOST_LINE + "/>";
  s += '<ellipse cx="50" cy="102" rx="26" ry="5" fill="#cfd8dc"/>';
  s += '<circle class="light l1" cx="24" cy="108" r="3" fill="#ff5252"/><circle class="light l2" cx="50" cy="112" r="3" fill="#ffd23f"/>';
  s += '<circle class="light l3" cx="76" cy="108" r="3" fill="#39ff14"/>';

  // Neck and head
  s += '<rect x="45" y="62" width="10" height="12" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += '<g class="host-head">';

  // Wiggly antennae with bobbles on top
  s += '<g class="antennae" fill="none" stroke="#1a1040" stroke-width="2.5" stroke-linecap="round">';
  s += '<path d="M40 24 Q34 14 30 6"/><path d="M60 24 Q66 14 70 6"/></g>';
  s += '<circle class="antenna-light" cx="30" cy="6" r="4" fill="#ff3b8d" ' + HOST_LINE + "/>";
  s += '<circle class="antenna-light" cx="70" cy="6" r="4" fill="#ff3b8d" ' + HOST_LINE + "/>";

  // Big round head, wider at the top
  s += '<path d="M50 20 Q74 20 74 44 Q74 64 50 68 Q26 64 26 44 Q26 20 50 20 Z" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Three big shiny eyes and a happy "eyebrow" line
  s += '<g class="brows" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"><path d="M33 33 L41 32"/><path d="M59 32 L67 33"/></g>';
  s += '<g class="eyes">';
  s += '<ellipse cx="37" cy="42" rx="6" ry="7" fill="#1a1040"/><ellipse cx="63" cy="42" rx="6" ry="7" fill="#1a1040"/>';
  s += '<ellipse cx="50" cy="31" rx="4.5" ry="5" fill="#1a1040"/>';
  s += '<circle cx="39" cy="39" r="2" fill="#fff"/><circle cx="65" cy="39" r="2" fill="#fff"/><circle cx="51.5" cy="29.5" r="1.5" fill="#fff"/>';
  s += "</g>";
  s += '<circle cx="31" cy="53" r="3" fill="#ff9aa2" opacity="0.6"/><circle cx="69" cy="53" r="3" fill="#ff9aa2" opacity="0.6"/>';

  // Mouth: a little smile, and a round "ooo" mouth for talking
  s += '<path class="mouth-closed" d="M43 55 Q50 61 57 55" fill="none" stroke="#1a1040" stroke-width="2.5" stroke-linecap="round"/>';
  s += '<g class="mouth-open"><ellipse cx="50" cy="57" rx="4.5" ry="5" fill="#2e1a47" ' + HOST_LINE + "/></g>";
  s += "</g>";

  // Left arm holding the microphone (it stays put)
  s += '<path d="M31 84 L22 96 L34 72" fill="none" stroke="#1a1040" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M31 84 L22 96 L34 72" fill="none" stroke="' + suit + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M35 70 L39 62" stroke="#333" stroke-width="4" stroke-linecap="round"/>';
  s += '<circle cx="40" cy="59" r="4.5" fill="#9e9e9e" ' + HOST_LINE + "/>";
  s += '<circle cx="34" cy="72" r="4" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Right arm: this one does the gestures (it turns around the shoulder at 69, 82)
  s += '<g class="arm-right">';
  s += '<path d="M69 82 L77 100" stroke="#1a1040" stroke-width="11" stroke-linecap="round"/>';
  s += '<path d="M69 82 L77 100" stroke="' + suit + '" stroke-width="6" stroke-linecap="round"/>';
  s += '<circle cx="78" cy="102" r="4.5" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += "</g>";

  return s + "</svg>";
}

// A jolly pirate: red coat, pirate hat, eye patch, a big beard, and a parrot on his hat
function pirateHostSvg() {
  const skin = "#f5c99b";
  const coat = "#b3261e";
  let s = '<svg class="host-svg pirate" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">';

  // Coat, white shirt and gold buttons
  s += '<path d="M22 120 L28 82 Q50 72 72 82 L78 120 Z" fill="' + coat + '" ' + HOST_LINE + "/>";
  s += '<path d="M42 78 L50 100 L58 78 Z" fill="#ffffff" ' + HOST_LINE + "/>";
  s += '<g fill="#ffd23f" stroke="#1a1040" stroke-width="1"><circle cx="40" cy="96" r="2.2"/><circle cx="40" cy="106" r="2.2"/>';
  s += '<circle cx="60" cy="96" r="2.2"/><circle cx="60" cy="106" r="2.2"/></g>';

  // Neck and head
  s += '<rect x="45" y="64" width="10" height="12" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += '<g class="host-head">';
  s += '<circle cx="33" cy="52" r="4" fill="' + skin + '" ' + HOST_LINE + '/><circle cx="67" cy="52" r="4" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += '<ellipse cx="50" cy="50" rx="17" ry="19" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Big bushy beard
  s += '<path d="M33 52 Q32 74 50 76 Q68 74 67 52 Q60 61 50 60 Q40 61 33 52 Z" fill="#6d3f1e" ' + HOST_LINE + "/>";

  // Eyebrows, one eye (the other has an eye patch) and a rosy nose
  s += '<g class="brows" stroke="#4a2a12" stroke-width="2.5" stroke-linecap="round"><path d="M39 42 L46 41"/><path d="M54 41 L61 42"/></g>';
  s += '<g class="eyes" fill="#1a1040"><circle cx="43" cy="48" r="2.6"/></g>';
  s += '<path d="M34 41 L66 55" stroke="#1a1040" stroke-width="2"/>';
  s += '<ellipse cx="57" cy="49" rx="5" ry="4.5" fill="#1a1040"/>';
  s += '<circle cx="50" cy="54" r="3" fill="#f0a07a"/>';

  // Mouth inside the beard: a big grin, and an open mouth for talking
  s += '<path class="mouth-closed" d="M43 61 Q50 68 57 61 Z" fill="#ffffff" ' + HOST_LINE + "/>";
  s += '<g class="mouth-open"><ellipse cx="50" cy="63" rx="5.5" ry="4.5" fill="#7a1f2b" ' + HOST_LINE + "/></g>";

  // Pointy pirate hat with gold trim and a little skull and crossbones
  s += '<path d="M18 40 Q22 24 34 27 Q40 9 50 10 Q60 9 66 27 Q78 24 82 40 Q50 31 18 40 Z" fill="#222" ' + HOST_LINE + "/>";
  s += '<path d="M22 37 Q50 29 78 37" fill="none" stroke="#ffd23f" stroke-width="2.5"/>';
  s += '<path d="M44 30 L56 22 M44 22 L56 30" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>';
  s += '<circle cx="50" cy="21" r="4.5" fill="#ffffff"/><rect x="47.5" y="23" width="5" height="4" rx="1" fill="#ffffff"/>';
  s += '<circle cx="48.3" cy="20.5" r="1.2" fill="#222"/><circle cx="51.7" cy="20.5" r="1.2" fill="#222"/>';

  // Parrot sitting on the hat
  s += '<g class="parrot">';
  s += '<g transform="translate(6 2)">';
  s += '<path d="M64 20 Q60 32 70 38 L74 30 Z" fill="#2e9e44" ' + HOST_LINE + "/>";
  s += '<ellipse cx="70" cy="22" rx="7" ry="9" fill="#e53935" ' + HOST_LINE + "/>";
  s += '<path d="M71 25 Q66 26 66 20" fill="none" stroke="#2e9e44" stroke-width="3" stroke-linecap="round"/>';
  s += '<circle cx="72" cy="12" r="5.5" fill="#e53935" ' + HOST_LINE + "/>";
  s += '<path d="M77 11 Q83 13 77 17 Z" fill="#ffd23f" ' + HOST_LINE + "/>";
  s += '<circle cx="73" cy="11" r="1.3" fill="#1a1040"/>';
  s += "</g>";
  s += "</g>";
  s += "</g>";

  // Left arm holding the microphone (it stays put)
  s += '<path d="M30 86 L20 100 L33 74" fill="none" stroke="#1a1040" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M30 86 L20 100 L33 74" fill="none" stroke="' + coat + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M34 72 L38 64" stroke="#333" stroke-width="4" stroke-linecap="round"/>';
  s += '<circle cx="39" cy="61" r="4.5" fill="#9e9e9e" ' + HOST_LINE + "/>";
  s += '<circle cx="33" cy="74" r="4" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Right arm: this one does the gestures (it turns around the shoulder at 70, 86)
  s += '<g class="arm-right">';
  s += '<path d="M70 86 L78 112" stroke="#1a1040" stroke-width="12" stroke-linecap="round"/>';
  s += '<path d="M70 86 L78 112" stroke="' + coat + '" stroke-width="7" stroke-linecap="round"/>';
  s += '<circle cx="79" cy="114" r="4.5" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += "</g>";

  return s + "</svg>";
}

// A friendly mermaid: long red hair with a starfish clip, a shell top and a sparkly tail
function mermaidHostSvg() {
  const skin = "#f8cfa6";
  const hair = "#e8553e";
  const tail = "#1fb5a8";
  let s = '<svg class="host-svg mermaid" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">';

  // Long hair behind her (drawn first so it goes behind everything)
  s += '<path d="M30 50 Q26 18 50 17 Q74 18 70 50 Q74 70 72 88 L60 74 L40 74 L28 88 Q26 70 30 50 Z" fill="' + hair + '" ' + HOST_LINE + "/>";

  // Sparkly tail with a big fin, and little bubbles
  s += '<path d="M32 94 L68 94 Q70 108 60 113 Q50 117 42 112 Q32 106 32 94 Z" fill="' + tail + '" ' + HOST_LINE + "/>";
  s += '<path d="M56 112 Q70 104 84 99 Q80 108 88 117 Q74 116 58 118 Z" fill="' + tail + '" ' + HOST_LINE + "/>";
  s += '<g fill="none" stroke="#a7f3e8" stroke-width="1.5" stroke-linecap="round">';
  s += '<path d="M38 100 q3 3 6 0 M46 100 q3 3 6 0 M54 100 q3 3 6 0 M42 106 q3 3 6 0 M50 106 q3 3 6 0"/></g>';
  s += '<g class="bubbles" fill="#d9f6ff" stroke="#4fc3f7" stroke-width="1">';
  s += '<circle cx="90" cy="86" r="3"/><circle cx="85" cy="76" r="2"/><circle cx="91" cy="68" r="1.5"/></g>';

  // Body with a purple shell top
  s += '<path d="M30 96 L33 80 Q50 73 67 80 L70 96 Z" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += '<g fill="#9c4dcc" stroke="#1a1040" stroke-width="1.8"><path d="M38 88 Q38 80 45 80 Q50 82 49 89 Z"/><path d="M62 88 Q62 80 55 80 Q50 82 51 89 Z"/></g>';

  // Neck and head
  s += '<rect x="45" y="64" width="10" height="12" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += '<g class="host-head">';
  s += '<ellipse cx="50" cy="50" rx="17" ry="19" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Bangs and a starfish hair clip
  s += '<path d="M33 46 Q34 25 50 25 Q66 25 67 46 Q62 34 50 34 Q40 34 33 46 Z" fill="' + hair + '" ' + HOST_LINE + "/>";
  s += '<path d="M64 26 l2 4.5 l5 .5 l-3.7 3.3 l1.1 4.9 l-4.4 -2.6 l-4.4 2.6 l1.1 -4.9 l-3.7 -3.3 l5 -.5 z" fill="#ffd23f" stroke="#1a1040" stroke-width="1.2"/>';

  // Eyebrows, big eyes with lashes, and rosy cheeks
  s += '<g class="brows" stroke="#b5402c" stroke-width="2" stroke-linecap="round"><path d="M39 42 L46 41"/><path d="M54 41 L61 42"/></g>';
  s += '<g class="eyes"><circle cx="43" cy="49" r="3.2" fill="#1a6e8f"/><circle cx="57" cy="49" r="3.2" fill="#1a6e8f"/>';
  s += '<circle cx="44" cy="48" r="1.1" fill="#fff"/><circle cx="58" cy="48" r="1.1" fill="#fff"/>';
  s += '<path d="M39 46 L37 44 M61 46 L63 44" stroke="#1a1040" stroke-width="1.5" stroke-linecap="round"/></g>';
  s += '<circle cx="39" cy="57" r="3" fill="#ff9aa2" opacity="0.7"/><circle cx="61" cy="57" r="3" fill="#ff9aa2" opacity="0.7"/>';

  // Mouth: a sweet smile, and an open mouth for talking
  s += '<path class="mouth-closed" d="M44 59 Q50 65 56 59" fill="none" stroke="#1a1040" stroke-width="2.5" stroke-linecap="round"/>';
  s += '<g class="mouth-open"><ellipse cx="50" cy="61" rx="5" ry="4.5" fill="#c2185b" ' + HOST_LINE + "/></g>";
  s += "</g>";

  // Left arm holding the microphone (it stays put)
  s += '<path d="M31 84 L20 100 L33 74" fill="none" stroke="#1a1040" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M31 84 L20 100 L33 74" fill="none" stroke="' + skin + '" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<path d="M34 72 L38 64" stroke="#333" stroke-width="4" stroke-linecap="round"/>';
  s += '<circle cx="39" cy="61" r="4.5" fill="#9e9e9e" ' + HOST_LINE + "/>";
  s += '<circle cx="33" cy="74" r="3.5" fill="' + skin + '" ' + HOST_LINE + "/>";

  // Right arm: this one does the gestures (it turns around the shoulder at 69, 84)
  s += '<g class="arm-right">';
  s += '<path d="M69 84 L77 108" stroke="#1a1040" stroke-width="10" stroke-linecap="round"/>';
  s += '<path d="M69 84 L77 108" stroke="' + skin + '" stroke-width="5.5" stroke-linecap="round"/>';
  s += '<circle cx="78" cy="110" r="4" fill="' + skin + '" ' + HOST_LINE + "/>";
  s += "</g>";

  return s + "</svg>";
}

// Brick Man: a toy brick figure with a yellow head, a stud on top, a red shirt and blue legs
function brickHostSvg() {
  const yellow = "#ffd23f";
  const shirt = "#e53935";
  const legs = "#1e63c6";
  let s = '<svg class="host-svg brick" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">';

  // Legs, feet and hips
  s += '<rect x="33" y="96" width="16" height="20" rx="1" fill="' + legs + '" ' + HOST_LINE + "/>";
  s += '<rect x="51" y="96" width="16" height="20" rx="1" fill="' + legs + '" ' + HOST_LINE + "/>";
  s += '<rect x="32" y="114" width="17" height="5" rx="1" fill="' + legs + '" ' + HOST_LINE + "/>";
  s += '<rect x="51" y="114" width="17" height="5" rx="1" fill="' + legs + '" ' + HOST_LINE + "/>";
  s += '<rect x="32" y="90" width="36" height="7" rx="1" fill="' + legs + '" ' + HOST_LINE + "/>";

  // Shirt (a block that's wider at the bottom) with a gold "Q" badge
  s += '<path d="M32 91 L37 64 L63 64 L68 91 Z" fill="' + shirt + '" ' + HOST_LINE + "/>";
  s += '<path d="M44 64 L50 71 L56 64" fill="none" stroke="#ffffff" stroke-width="2"/>';
  s += '<circle cx="50" cy="80" r="5.5" fill="' + yellow + '" stroke="#1a1040" stroke-width="1.5"/>';
  s += '<text x="50" y="83.5" text-anchor="middle" font-size="8" font-weight="900" font-family="sans-serif" fill="#8a6200">Q</text>';

  // Neck, head and the stud on top
  s += '<rect x="45" y="59" width="10" height="6" fill="' + yellow + '" ' + HOST_LINE + "/>";
  s += '<g class="host-head">';
  s += '<rect x="43" y="17" width="14" height="8" rx="2" fill="' + yellow + '" ' + HOST_LINE + "/>";
  s += '<rect x="35" y="23" width="30" height="37" rx="8" fill="' + yellow + '" ' + HOST_LINE + "/>";

  // Simple toy face: eyebrows, dot eyes and a big smile
  s += '<g class="brows" stroke="#1a1040" stroke-width="2" stroke-linecap="round"><path d="M41 34 L46 33"/><path d="M54 33 L59 34"/></g>';
  s += '<g class="eyes" fill="#1a1040"><circle cx="44" cy="39" r="2.6"/><circle cx="56" cy="39" r="2.6"/></g>';
  s += '<path class="mouth-closed" d="M42 47 Q50 55 58 47" fill="none" stroke="#1a1040" stroke-width="2.5" stroke-linecap="round"/>';
  s += '<g class="mouth-open"><path d="M42 47 Q50 58 58 47 Z" fill="#7a1f2b" ' + HOST_LINE + "/></g>";
  s += "</g>";

  // Left arm holding the microphone with a C-shaped toy hand (it stays put)
  s += '<path d="M36 68 L26 84" stroke="#1a1040" stroke-width="11" stroke-linecap="round"/>';
  s += '<path d="M36 68 L26 84" stroke="' + shirt + '" stroke-width="6.5" stroke-linecap="round"/>';
  s += '<path d="M24 82 L24 70" stroke="#333" stroke-width="4" stroke-linecap="round"/>';
  s += '<circle cx="24" cy="67" r="4.5" fill="#9e9e9e" ' + HOST_LINE + "/>";
  s += '<path d="M20 86 A5 5 0 1 1 29 88" fill="none" stroke="#1a1040" stroke-width="7" stroke-linecap="round"/>';
  s += '<path d="M20 86 A5 5 0 1 1 29 88" fill="none" stroke="' + yellow + '" stroke-width="3.5" stroke-linecap="round"/>';

  // Right arm: this one does the gestures (it turns around the shoulder at 64, 68)
  s += '<g class="arm-right">';
  s += '<path d="M64 68 L74 86" stroke="#1a1040" stroke-width="11" stroke-linecap="round"/>';
  s += '<path d="M64 68 L74 86" stroke="' + shirt + '" stroke-width="6.5" stroke-linecap="round"/>';
  s += '<path d="M71 92 A5 5 0 1 1 80 90" fill="none" stroke="#1a1040" stroke-width="7" stroke-linecap="round"/>';
  s += '<path d="M71 92 A5 5 0 1 1 80 90" fill="none" stroke="' + yellow + '" stroke-width="3.5" stroke-linecap="round"/>';
  s += "</g>";

  return s + "</svg>";
}
