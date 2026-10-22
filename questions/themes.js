// ============================================
//  QUIZ PUP THEMES
//  Want a new theme? Add it here, then make a new file in this
//  folder (copy food.js!) and add it to index.html.
// ============================================
const THEMES = [
  { name: "Geography",      emoji: "🌍" },
  { name: "Video Games",    emoji: "🎮" },
  { name: "Kids' Movies",   emoji: "🎬" },
  { name: "Food",           emoji: "🍕" },
  { name: "Brand Icons",    emoji: "🏷️" },
  { name: "Famous People",  emoji: "🌟" },
];

const QUESTIONS = [];

// Each theme file calls this to add its questions
function addQuestions(theme, list) {
  list.forEach(q => QUESTIONS.push({ theme: theme, ...q }));
}
