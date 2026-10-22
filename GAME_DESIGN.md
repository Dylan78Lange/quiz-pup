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
4. Answer all 3 right to pass the level.

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
- 3 lives for the whole game (wrong answer = lose a life; details TBD)

## Players
- 1 player to start; up to 4 players taking turns on one laptop, each with their own dog.

## Winning and the scoreboard
- Win by beating Hard level.
- When the game ends (win, game over, or quit) with coins banked, type up to 3 initials to save to the Top Score Board.
- The board keeps the top 10, with 🥇🥈🥉 for the top 3. Open it from the start screen with "🏆 Top Scores".
- Scoreboard is saved only in this browser on this computer (no online, no personal info - initials only).

## Shop
- Spend coins on treats, toys and emote tricks.
- Emotes let you tease the other player (keep it silly and friendly).

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
- DECIDED - Host: a cool, funny human game-show presenter in 90s style (big hair, shiny suit, cheesy jokes)
- DECIDED - Wrong answer: lose 1 life and the turn goes to the next player (with 1 player, they just carry on). Right answer: the same player continues to the next question. At any time a player can choose to pass to the next player.
- DECIDED - Coins are banked after each completed level. If you run out of lives mid-level you lose that level's unbanked coins but keep what's banked. You can also quit between levels and keep everything banked so far.
