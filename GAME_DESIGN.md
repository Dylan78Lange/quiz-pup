# Game Design: Quiz Pup

A 90s game-show quiz ("Who Wants to Be a Millionaire" style) where each player has a pet dog.
Right answers make the dog happy; wrong answers cost lives. Win coins, spend them on treats, toys and emotes.

## The look
- 90s game-show vibe: stage lights, a host character, light-blue background.
- Question across the top of the screen, 3-4 answers in boxes underneath, pick one.
- Each player has a dog at the bottom of the screen that reacts:
  - Right answer: wagging tail, jumping for joy
  - Wrong answer: the pup does something naughty and random (pees on your leg, poops on the stage,
    growls and barks, knocks over a vase...). Silly cartoon fun, never scary.
- Retro chunky fonts and colors, drawn with simple shapes/emoji (no downloads).

## How a round works
1. Levels go in order: Easy, then Medium, then Hard.
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

Each theme has 5 questions per level (90 questions in all). Each level picks 3 of the 5 at random.

## Coins
- Easy: 100 coins per right answer
- Medium: 250 coins per right answer
- Hard: 500 coins per right answer
- Each coin shows the first letter of the game's name: "Q"
- Coins won during a level sit in "the pot". Get all 3 right and the pot is banked.
  Miss one and the pot is lost, and you try that level again with new random questions.
- After passing a level you choose: go on to the next level, or quit and keep your banked coins.
- A perfect game banks 300 + 750 + 1500 = 2550 coins.

## Lives
- Each player has 3 lives for the whole game. A wrong answer costs one.
- Out of lives = you're out, but you keep your banked coins.

## Players
- 1 to 4 players on one laptop. Each player types a name (letters only, up to 8),
  names their pup, and picks a breed. Skip the pup name and you get Biscuit, Waffles, Peanut or Noodle.
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
- Win by beating Hard level.
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
- DECIDED - Wrong answer: lose 1 life and the turn goes to the next player (with 1 player, they just carry on). Right answer: the same player continues to the next question. At any time a player can choose to pass to the next player.
- DECIDED - Coins are banked after each completed level. If you run out of lives mid-level you lose that level's unbanked coins but keep what's banked. You can also quit between levels and keep everything banked so far.
