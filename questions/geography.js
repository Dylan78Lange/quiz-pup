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

  // ---------- MORE EASY ----------
  { level: "easy", question: "Which country has the Eiffel Tower?",
    answers: ["Italy", "France", "Spain", "England"], right: 1 },
  { level: "easy", question: "What is the coldest continent?",
    answers: ["Africa", "Asia", "Antarctica", "Europe"], right: 2 },
  { level: "easy", question: "Which country is famous for giant pandas?",
    answers: ["China", "Brazil", "Kenya", "Canada"], right: 0 },
  { level: "easy", question: "The Big Ben clock tower is in which city?",
    answers: ["Paris", "New York", "Rome", "London"], right: 3 },
  { level: "easy", question: "Which country has the famous pyramids of Giza?",
    answers: ["Mexico", "Egypt", "India", "Peru"], right: 1 },
  { level: "easy", question: "How many continents are there?",
    answers: ["5", "6", "7", "8"], right: 2 },
  { level: "easy", question: "What is the biggest country in the world?",
    answers: ["Russia", "China", "USA", "Canada"], right: 0 },
  { level: "easy", question: "The Statue of Liberty is in which country?",
    answers: ["France", "Canada", "England", "USA"], right: 3 },
  { level: "easy", question: "Which country is shaped like a boot?",
    answers: ["Greece", "Italy", "Spain", "Portugal"], right: 1 },
  { level: "easy", question: "What color is the circle on Japan's flag?",
    answers: ["Blue", "Yellow", "Red", "Green"], right: 2 },

  // ---------- MORE MEDIUM ----------
  { level: "medium", question: "What is the capital of Italy?",
    answers: ["Milan", "Venice", "Naples", "Rome"], right: 3 },
  { level: "medium", question: "What is the capital of Germany?",
    answers: ["Berlin", "Munich", "Hamburg", "Frankfurt"], right: 0 },
  { level: "medium", question: "What money do they use in the UK?",
    answers: ["Euro", "Dollar", "Pound", "Franc"], right: 2 },
  { level: "medium", question: "What language do people speak in Mexico?",
    answers: ["Portuguese", "Spanish", "English", "French"], right: 1 },
  { level: "medium", question: "What is the longest river in South America?",
    answers: ["Nile", "Mississippi", "Danube", "Amazon"], right: 3 },
  { level: "medium", question: "What is the tallest mountain in the world?",
    answers: ["Kilimanjaro", "Mount Everest", "Mont Blanc", "Mount Fuji"], right: 1 },
  { level: "medium", question: "Which country built the Great Wall?",
    answers: ["China", "Japan", "India", "Korea"], right: 0 },
  { level: "medium", question: "What is the biggest hot desert in the world?",
    answers: ["Gobi", "Kalahari", "Sahara", "Mojave"], right: 2 },
  { level: "medium", question: "What is the capital of Egypt?",
    answers: ["Alexandria", "Cairo", "Giza", "Luxor"], right: 1 },
  { level: "medium", question: "What money do they use in France and Germany?",
    answers: ["Pound", "Dollar", "Yen", "Euro"], right: 3 },

  // ---------- MORE HARD ----------
  { level: "hard", question: "What is the capital of Brazil?",
    answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], right: 2 },
  { level: "hard", question: "What is the capital of Turkey?",
    answers: ["Istanbul", "Ankara", "Izmir", "Antalya"], right: 1 },
  { level: "hard", question: "What is the capital of New Zealand?",
    answers: ["Wellington", "Auckland", "Christchurch", "Queenstown"], right: 0 },
  { level: "hard", question: "What money do they use in India?",
    answers: ["Yen", "Peso", "Rand", "Rupee"], right: 3 },
  { level: "hard", question: "What money do they use in South Africa?",
    answers: ["Dollar", "Rand", "Shilling", "Euro"], right: 1 },
  { level: "hard", question: "What language do people speak in Austria?",
    answers: ["French", "Italian", "German", "Dutch"], right: 2 },
  { level: "hard", question: "Which country has the most people in the world?",
    answers: ["India", "USA", "Brazil", "Russia"], right: 0 },
  { level: "hard", question: "The ancient city of Machu Picchu is in which country?",
    answers: ["Mexico", "Chile", "Bolivia", "Peru"], right: 3 },
  { level: "hard", question: "What is the capital of Norway?",
    answers: ["Stockholm", "Oslo", "Bergen", "Helsinki"], right: 1 },
  { level: "hard", question: "What language do people speak in the Netherlands?",
    answers: ["German", "Danish", "Dutch", "Swedish"], right: 2 },
]);
