# Game Design: Quiz Pup

A 90s game-show quiz ("Who Wants to Be a Millionaire" style) where each player has a pet dog.
Right answers make the dog happy; wrong answers cost lives. Win coins, spend them on treats, toys and emotes.

## The look
- 90s game-show vibe: stage lights, a host character, light-blue background.
- Question across the top of the screen, 3-4 answers in boxes underneath, pick one.
- Each player has a dog at the bottom of the screen that reacts:
  - Right answer: wagging tail, jumping for joy
  - Wrong answer: the pup does something naughty and random, animated on the pup itself:
    - Pee: lifts its back leg, a stream arcs out, a puddle spreads (and stays)
    - Poop: strains and wobbles, a poop plops out beside it with stink lines (and stays)
    - Growl: crouches and shakes, angry eyebrows, "GRRR!" speech bubble
    - Vase: a vase appears, the tail swipes it, it wobbles, tips and smashes into shards
    - Homework: chews a sheet of paper (bits fall), belly puffs, big "BURP!" cloud
    - Tail chase: spins round and round, then swirly dizzy eyes with circling stars
    Silly cartoon fun, never scary.
- The stage pup is a full-body drawing (dogs.js, dogBodySvg) that is always alive: wagging tail,
  blinking eyes, little head tilts. Happy = bouncy squash-and-stretch jump with floating hearts.
- Retro chunky fonts and colors, drawn with simple shapes/emoji (no downloads).

## How a round works
1. Levels go in order: Easy, then Medium, then Hard. Hard has to be beaten 3 times, each in a
   different theme (HARD 1 of 3, 2 of 3, 3 of 3). Beaten themes get a ✅ and can't be picked again.
   Change HARD_ROUNDS at the top of game.js to make it easier or harder.
2. Before every level (and every retry) you pick a theme, or hit "Surprise me!" for a random one.
3. Host asks 3 random questions from that theme and level, one at a time.
4. Answer all 3 right to pass the level. A wrong answer ends the level straight away (you can't
   pass it any more) - you lose a life and the pot, and retry that level next turn.

## Themes (3 levels each, 3 questions per level)
1. Geography: countries, capitals, currency, languages
2. Video games
3. Kids' movies
4. Food
5. Brand icons
6. Famous people

Brand Icons also has 60 "whose logo is this?" picture questions (20 per level) that show a real
logo on the question board, in its brand color. Every Brand Icons level has at least 2 logo
questions out of 3 (LOGO_QUESTIONS_PER_LEVEL in game.js). The logos come from Simple Icons and
live in `logos.js`. Only logos without the brand name written in them are used.

Each theme has at least 15 questions per level (330 questions in all). Each level picks 3 at random.
A player won't get the same question twice in one game (until a pool runs out).

## Coins
- Easy: 100 coins per right answer
- Medium: 250 coins per right answer
- Hard: 500 coins per right answer
- Each coin shows the first letter of the game's name: "Q"
- Coins won during a level sit in "the pot". Get all 3 right and the pot is banked.
  Miss one and the pot is lost, and you try that level again with new random questions.
- After passing a level you choose: go on to the next level, or quit and keep your banked coins.
- A perfect game banks 300 + 750 + 1500 + 1500 + 1500 = 5550 coins.

## Lives
- Each player has 3 lives for the whole game. A wrong answer costs one.
- Out of lives = you're out, but you keep your banked coins.

## Players
- 1 to 4 players on one laptop. Each player types a name (letters only, up to 8),
  names their pup, and picks a breed. The boxes suggest fun random names (like LEGEND and
  Sir Barksalot) - leave a box empty to use the suggestion, or press 🎲 to roll a new one.
  The name lists are PLAYER_NAMES and PUP_NAMES at the top of game.js.
- Everyone has their own lives, coins, level and shop stuff.
- Turns:
  - Right answer: you keep going (and after passing a level you carry straight on to the next).
  - Wrong answer: lose a life and it's the next player's turn.
  - Pass: hand over to the next player before answering. No life lost, you keep your pot,
    and you get a different question when your turn comes back.
- A "PLAYER'S TURN!" screen shows who should take the laptop.
- A strip at the bottom shows every player's pup, lives and coins.
- Teasing: if you've bought tricks, your trick buttons show on your card in the strip during
  other players' turns - press them to tease whoever is playing.
- The game ends when everyone has won, quit or run out of lives. The final screen ranks everyone.

## Winning and the scoreboard
- Win by beating Hard in 3 different themes.
- When the game ends, every player with banked coins is saved to the Top Score Board under their name automatically.
- The board keeps the top 10, with 🥇🥈🥉 for the top 3. Open it from the start screen with "🏆 Top Scores".
- Scoreboard is saved only in this browser on this computer (no online, no personal info - first names or initials only).

## Shop
- The Pup Shop opens between levels (the "🛒 Pup Shop" button on the end-of-level screen).
- A big gold "COINS TO SPEND" wallet at the top shows how many coins you have.
- Spending uses your banked coins, so it lowers your Top Score Board score - spend or save?
- Treats: the pup eats them right away. Super Steak (500) gives +1 life (up to 3).
- Toys: sit next to the pup on stage.
- Dress-up: one hat at a time on the pup's head (bow, cap, top hat, crown).
- Tricks (emotes): buttons under the pup - bark, spin, roll over, dance, raspberry.
  In multiplayer they're also for teasing the other players (keep it silly and friendly).
- Everything you buy lasts for one game.
- Items live in `shop.js` - easy to add more.

## Sound and music
- Everything is made with code in `sound.js` (no sound files).
- Music: a hip hop beat (90 beats per minute, with swing) with piano chords Am - F - C - G.
  It starts on the first click.
- Sounds: piano run for right answers, sad trombone for wrong ones, a noise for each naughty
  thing (hiss, splat, bark, crash, burp, boing), coin ding in the shop, fanfare for passing a
  level, a big "da da da DAAA" for winning, a jingle for each new turn, and the robot host bleeps
  when it talks.
- 🎵 and 🔊 buttons in the top right turn music and sound effects on and off (remembered).

## Polish
- Confetti when you pass a level, and lots more when you win.
- Keyboard: A/B/C/D or 1/2/3/4 to answer, Enter or Space for the next question.

## Build order (each step is playable)
1. One theme, one question, answers, right/wrong, dog reacts
2. Host + 90s stage look, 3 questions in a level
3. Coins, lives, easy/medium/hard
4. All 6 themes + theme picker
5. Score board
6. Shop (treats, toys)
7. 2-4 players + emotes
8. Sound, music, polish, final name

## Open questions
- DECIDED - Game name: Quiz Pup. Coins show the letter "Q".
- DECIDED - Dogs: each player names their dog and picks from 5 breeds: Shiba Inu, Pug, Husky, Poodle, Dalmatian. No color choice.
- DECIDED - Host: pick on the start screen between
  - 🕺 Human: a cool, funny 90s game-show presenter (big hair, shiny suit, cheesy jokes)
  - 🤖 Robot: beeps and boops, talks in CAPITALS in a green computer-screen bubble
  The game remembers your pick. Hosts and their lines live in `HOSTS` at the top of game.js.
  Both are drawn characters (hosts.js) that bob to the beat and blink. When they talk the words
  type out in the bubble and the mouth moves (the robot has a bouncing equalizer mouth). They wave
  hello, point at the question, throw an arm up to cheer a right answer, and facepalm a wrong one.
  Use say(text, gesture) in game.js to make the host talk.
- DECIDED - Wrong answer: lose 1 life and the turn goes to the next player (with 1 player, they just carry on). Right answer: the same player continues to the next question. At any time a player can choose to pass to the next player.
- DECIDED - Coins are banked after each completed level. If you run out of lives mid-level you lose that level's unbanked coins but keep what's banked. You can also quit between levels and keep everything banked so far.
