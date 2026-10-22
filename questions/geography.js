// ============================================
//  GEOGRAPHY QUESTIONS  -  add your own!
//  Each question has:
//    level    - "easy", "medium" or "hard"
//    question - what the host asks
//    answers  - 3 or 4 choices
//    right    - which answer is correct (0 is the first one!)
//  Each level picks 3 random questions, so more = more surprises.
// ============================================
addQuestions("Geography", [
  // ---------- EASY ----------
  { level: "easy", question: "What is the capital of France?",
    answers: ["London", "Paris", "Rome", "Madrid"], right: 1 },
  { level: "easy", question: "Which country is famous for kangaroos?",
    answers: ["Australia", "Brazil", "Canada", "India"], right: 0 },
  { level: "easy", question: "Which is the biggest ocean?",
    answers: ["Atlantic", "Indian", "Arctic", "Pacific"], right: 3 },
  { level: "easy", question: "Pizza and pasta first came from which country?",
    answers: ["Mexico", "Italy", "China", "Germany"], right: 1 },
  { level: "easy", question: "What money do they use in the USA?",
    answers: ["Dollar", "Pound", "Euro"], right: 0 },

  // ---------- MEDIUM ----------
  { level: "medium", question: "What money do they use in Japan?",
    answers: ["Dollar", "Pound", "Yen", "Euro"], right: 2 },
  { level: "medium", question: "What is the capital of Spain?",
    answers: ["Barcelona", "Madrid", "Seville", "Lisbon"], right: 1 },
  { level: "medium", question: "What language do people speak in Brazil?",
    answers: ["Spanish", "Portuguese", "English", "French"], right: 1 },
  { level: "medium", question: "What is the capital of Japan?",
    answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"], right: 2 },
  { level: "medium", question: "What is the longest river in Africa?",
    answers: ["Nile", "Amazon", "Thames", "Congo"], right: 0 },

  // ---------- HARD ----------
  { level: "hard", question: "What is the capital of Australia?",
    answers: ["Sydney", "Melbourne", "Canberra", "Perth"], right: 2 },
  { level: "hard", question: "What is the capital of Canada?",
    answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"], right: 2 },
  { level: "hard", question: "What money do they use in Switzerland?",
    answers: ["Euro", "Franc", "Krone", "Dollar"], right: 1 },
  { level: "hard", question: "What language do people speak in Argentina?",
    answers: ["Portuguese", "Spanish", "English", "Italian"], right: 1 },
  { level: "hard", question: "What is the smallest country in the world?",
    answers: ["Monaco", "Malta", "Vatican City", "Luxembourg"], right: 2 },
]);
