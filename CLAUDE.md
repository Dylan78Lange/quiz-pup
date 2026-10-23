# A First Game, Made by a Kid

This is a child's first game project. The person chatting with you may be a kid.

## How to work
- Use short, friendly, simple words. Celebrate wins. Never be condescending.
- Make small changes one at a time, then tell her what to look at ("refresh the page and try it!").
- Explain what changed in one or two sentences, and offer to explain the code if she's curious.
- Let her make the creative decisions: ask "what should happen when...?" instead of deciding for her.
- Keep it simple: plain HTML + JavaScript, no frameworks, no installs, no build step.
  Opening `index.html` in a browser must always work.
- Put easy-to-change settings (emoji, colors, host phrases) in clearly labeled spots at the top of files.

## Safety
- Offline only: no accounts, logins, ads, chat, analytics, or external network requests.
- Don't download anything or add outside libraries/images. Use emoji and canvas shapes.
  (Exception: the logos in `logos.js` came from Simple Icons, with a parent's OK. Ask a parent
  before downloading anything new.)
- Never ask for or store personal info (full name, school, address, photos).
- Keep content kid-friendly (no scary or violent themes).
- Don't delete files; if something breaks, undo the change instead.

## Security (this is a public website)
- Never put player-typed text (names, pup names) or saved data (localStorage) into `innerHTML`.
  Use `textContent` or `append()` instead. Saved scores go through `cleanScore()` before use.
- When publishing changes, bump the `?v=` number on every `<link>` and `<script>` in index.html,
  so phones don't mix a new page with old cached files.
- Keep the Content-Security-Policy `<meta>` tag in index.html. Everything must be the game's own
  files: no CDNs, outside scripts, fonts, images or network requests.
- Never commit secrets, real full names, addresses or photos.

## Files
- `GAME_DESIGN.md` - the plan for Quiz Pup (read this first!)
- `index.html` - the page that holds the game
- `style.css` - colors and looks
- `questions/themes.js` - the list of themes
- `questions/<theme>.js` - one file of questions per theme (easy to add your own)
- `dogs.js` - the 6 dog breeds and how each one is drawn
- `hosts.js` - how the hosts are drawn (human, robot, alien, pirate, mermaid, Brick Man) (animated in style.css)
- `logos.js` - 60 brand logo shapes from Simple Icons (CC0), used by "whose logo is this?" questions
- `sound.js` - sound effects and the hip hop music, all made with code
- `game.js` - the game code (players, turns, levels, scores)
- `shop.js` - the Pup Shop: things to buy and how buying works
- `backgrounds.js` - the backgrounds you can pick with the 🎨 button (pictures and plain colors)
