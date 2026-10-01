# DevType - Developer Code Typing Trainer: Project Walkthrough

## 1. Project Overview & Architecture
DevType is a specialized typing speed and accuracy trainer designed explicitly for software developers. Unlike generic text typing tools, DevType tests code syntax navigation, handling indentation, special symbols (`{`, `}`, `(`, `)`, `=>`, `;`), multi-line code blocks, and language-specific code snippets.

### Core Stack
* **HTML5**: Semantic layout with accessibility features.
* **CSS3**: Modern layout using CSS Grid, Flexbox, CSS Variables for dynamic themes, and keyframe animations.
* **Vanilla JavaScript (ES6+)**: Custom DOM diffing engine, event interception, State Machine pattern, native HTML5 Canvas graph renderer, and LocalStorage management.

---

## 2. Historical Development Log

### Milestone 1: Workspace Initialization & Master Plan
* Established workspace guidelines in `agent.md` and initialized project tracking in `SOUL.md`.
* Designed 6-phase master technical roadmap covering input interception, snippet engine, native Canvas chart, and symbol heatmap.

### Milestone 2: Semantic HTML5 Structure & Accessible DOM Layout (`index.html`)
* Configured core document head metadata (UTF-8, viewport responsiveness, SEO meta tags).
* Established typography integration via Google Fonts (`JetBrains Mono` & `Outfit`).
* Implemented modular stylesheet loading hierarchy (`theme.css` -> `main.css` -> `components.css`).
* Designed accessible `<header>` with interactive controls (`<select>`) for language, length, and theme selection.
* Constructed `<section class="metrics-bar">` with DOM hooks (`live-wpm`, `live-accuracy`, `live-timer`).
* Architected `<main class="typing-container">` with off-screen `<textarea id="hidden-input">` focus proxy and `tabindex="0"` code display viewport.

### Milestone 3: Modular CSS Design System & Dynamic Multi-Theme Engine
* Implemented CSS custom properties across 4 themes (Dark Modern, Monokai Pro, Cyberpunk Neon, Nordic Frost).
* Built base resets, typography defaults, responsive container layout, and glassmorphism background glow in `styles/main.css`.
* Created component styles in `styles/components.css` including caret pulse `@keyframes caret-blink` and character state classes.

### Milestone 4: JavaScript Core Data & Typing Engine (`scripts/snippets.js`, `scripts/typing-engine.js`)
* Built multi-language code snippet repository (`scripts/snippets.js`) supporting JavaScript, Python, and C++.
* Implemented DOM character rendering engine (`renderDisplay()`) that dynamically constructs `<span>` tags per character and positions an active caret (`.caret`) at the current user typing position.
* Created visual substitution for incorrect spaces (`char === ' ' ? '␣' : char`).
* Built keydown event interceptor (`handleKeyDown(e)`) handling `Tab` (2 spaces), `Backspace` (state popping via `typedInput.slice(0, -1)`), `Enter` (`\n`), and printable single-char keys while ignoring modifier key combinations (`Ctrl`, `Meta`, `Alt`).
* Built character processor (`processCharacter(char)`) that triggers test start on first keydown, logs accuracy errors (`totalErrors`), updates state (`typedInput`), and triggers test completion (`finishTest()`).

---

## 3. Technical Concepts & Mechanics Breakdown

### HTML5 Document Architecture & ARIA Accessibility (`index.html`)
* **`<!DOCTYPE html>` & `<html lang="en" data-theme="dark">`**: Enforces standard HTML5 parsing and top-level theme attribute selector.
* **Metadata & Preconnect**: UTF-8 character encoding, responsive viewport scaling, and Google Fonts preconnecting for fast typography loading.
* **Focus Proxy Layer (`#hidden-input`)**: Off-screen textarea capturing native mobile/desktop keyboard events with `autocomplete="off"`, `autocapitalize="none"`, `spellcheck="false"`, `tabindex="-1"`.

### CSS Architecture & Theme Engine (`styles/theme.css`, `styles/main.css`, `styles/components.css`)
* **Attribute Selectors (`html[data-theme="..."]`)**: Enables zero-reflow theme switching using root CSS variables.
* **Glassmorphism Aesthetic**: Combines `backdrop-filter: blur(...)` with semi-transparent `rgba` backgrounds.
* **Character Typing State Indicators**: `.char-correct`, `.char-incorrect` (with space substitution `'␣'`), `.char-pending`, and `.caret` pulse animation.

### JavaScript Typing Engine Mechanics (`scripts/typing-engine.js`)
* **DOM Character Rendering (`renderDisplay`)**: Clears viewport, splits `targetSnippet` and `typedInput` into arrays, loops with `forEach`, inserts carets dynamically, and appends typed status `<span>` nodes.
* **Keydown Event Interception (`handleKeyDown`)**: Intercepts browser defaults via `e.preventDefault()`, maps `Tab` to 2 spaces, handles `Backspace` via string slicing (`slice(0, -1)`), maps `Enter` to newline (`\n`), and filters single printable characters.
* **State Processing (`processCharacter`)**: Prevents overflow, triggers lazy start (`startTest()`), logs error count on mismatches, updates state, and invokes completion check (`finishTest()`).

#### Complete Step-by-Step Dry Run Trace

**Test Scenario**: `targetSnippet = "const a = 1;"` (Length: 11 characters)

1. **Step 1: Engine Initialization (`initEngine("const a = 1;")`)**
   - **State**: `targetSnippet = "const a = 1;"`, `typedInput = ""`, `startTime = null`, `isTestActive = false`, `totalErrors = 0`.
   - **UI Setup**: `wpmDisplay = "0"`, `accuracyDisplay = "100%"`, `timerDisplay = "0s"`.
   - **`renderDisplay()`**: Clears `#code-display`. Loops 11 times. At `index = 0` (`typedChars.length = 0`), appends `<span class="caret"></span>`. All 11 characters (`c`, `o`, `n`, `s`, `t`, ` `, `a`, ` `, `=`, ` `, `1`, `;`) rendered as `<span class="char-pending">`.
   - **`focusInput()`**: Invokes `hiddenInput.focus()` to capture physical keystrokes.

2. **Step 2: Correct Keypress (`handleKeyDown({ key: 'c' })`)**
   - **Filter Check**: `e.key.length === 1` passes -> calls `processCharacter('c')`.
   - **Lazy Test Start**: `!isTestActive` is true -> calls `startTest()`, sets `startTime = Date.now()`, `isTestActive = true`, starts `timerInterval`.
   - **Comparison**: `char ('c') === targetSnippet[0] ('c')` -> Match. `totalErrors` remains `0`.
   - **State Update**: `typedInput` becomes `"c"`.
   - **`renderDisplay()`**: Index 0 rendered as `<span class="char-correct">c</span>`. At `index = 1` (`typedChars.length = 1`), appends `<span class="caret"></span>`. Remaining 10 characters rendered as `.char-pending`.

3. **Step 3: Incorrect Keypress (`handleKeyDown({ key: 'x' })`)**
   - **Filter Check**: Calls `processCharacter('x')`.
   - **Comparison**: `char ('x') !== targetSnippet[1] ('o')` -> Mismatch! `totalErrors` increments from `0` to `1`.
   - **State Update**: `typedInput` becomes `"cx"`.
   - **`renderDisplay()`**: Index 0 -> `.char-correct` (`c`), Index 1 -> `<span class="char-incorrect">o</span>`. Caret inserted at `index = 2`.
   - **`calculateMetrics()`**: Computes accuracy: `(1 / 2) * 100 = 50%`. UI updates `accuracyDisplay` to `50%`.

4. **Step 4: Backspace Correction (`handleKeyDown({ key: 'Backspace' })`)**
   - **Filter Check**: `e.key === 'Backspace'`. `typedInput.length > 0` (2 > 0).
   - **State Update**: `typedInput = "cx".slice(0, -1)` -> `typedInput` reverts to `"c"`.
   - **`renderDisplay()`**: Caret moves back to `index = 1`. Index 1 character (`'o'`) reverts from `.char-incorrect` back to `<span class="char-pending">o</span>`.
   - **`calculateMetrics()`**: Recalculates metrics for `typedInput = "c"`.

#### WPM Calculation Spike Fix (`scripts/typing-engine.js`)
* **Root Cause of 4200 WPM Spike**:
  * For small code snippets (e.g., `squares = [x**2 for x in range(10)]` with 35 characters = 7 words), if completed in under 1 second, `elapsedTimeInSeconds` defaulted to `Math.max(t, 0.1)` = `0.1`s.
  * Dividing 7 words by `0.1 / 60` minutes multiplies 7 by 600, yielding `7 * 600 = 4200 WPM`.
* **Fix Strategy**:
  * Measure real un-floored elapsed seconds: `const rawElapsedSeconds = (Date.now() - startTime) / 1000`.
  * For live metrics while $t < 1.0\text{s}$, lock WPM to `0` to prevent division artifacts.
  * Once $t \ge 1.0\text{s}$, compute standard WPM: `Math.round((correctCount / 5) / (rawElapsedSeconds / 60))`.

#### Line-by-Line Breakdown of Fixed `calculateMetrics()`
* `if (!startTime) return;`: Guard clause returning early if the test timer has not been started.
* `const rawElapsedSeconds = (Date.now() - startTime) / 1000;`: Calculates exact millisecond difference converted to seconds without artificial floors.
* `timerDisplay.textContent = `${Math.floor(rawElapsedSeconds)}s`;`: Displays integer elapsed seconds in the UI.
* `let correctCount = 0;`: Counter for valid matching characters.
* `typedInput.split('').forEach(...)`: Iterates through typed input to compare `typedChars[index]` with `targetSnippet[index]`.
* `if (rawElapsedSeconds < 1.0) ...`: Prevents WPM spikes when $t < 1.0\text{s}$ by displaying `0` until 1 second elapses.
* `const timeInMinutes = rawElapsedSeconds / 60;`: Converts seconds to decimal minutes.
* `const wpm = Math.round((correctCount / 5) / timeInMinutes);`: Standard WPM formula (1 word = 5 characters).
* `const accuracy = typedInput.length > 0 ? Math.round(...) : 100;`: Computes percentage accuracy, defaulting to 100% when no characters are typed.



### Milestone 5: Main Application Entry & Event Wiring (`scripts/app.js`)
* Connected ES6 modules (`snippets.js`, `typing-engine.js`) inside `scripts/app.js`.
* Listened to `DOMContentLoaded` to ensure DOM nodes are available before binding event handlers.
* Implemented `loadNewSnippet()` using optional chaining (`codeSnippets[lang]?.[len]`) and fallback default snippets (`javascript.medium`).
* Bound theme switcher to root attribute (`document.documentElement.setAttribute('data-theme', e.target.value)`).
* Bound `keydown` listener on `document` to route physical keypresses to `handleKeyDown(e)`.
* Bound click listener on `codeDisplay` to restore focus to `hiddenInput`.

---

## 3. Technical Concepts & Mechanics Breakdown

### Phase 3: Application Event Wiring & Module Integration (`scripts/app.js`)

#### 1. DOM Synchronization (`DOMContentLoaded`)
* **`document.addEventListener('DOMContentLoaded', ...)`**: Defers execution until HTML parsing and DOM tree construction are fully completed, preventing `null` reference errors when selecting elements like `document.getElementById('language-select')`.

#### 2. Optional Chaining & Fallback Logic (`loadNewSnippet`)
* **`codeSnippets[lang]?.[len]`**: Safe object property access using the optional chaining operator (`?.`). If `codeSnippets[lang]` or `len` is undefined, evaluates safely to `undefined` without throwing a `TypeError`.
* **Fallback Default (`|| codeSnippets.javascript.medium`)**: Uses the logical OR operator (`||`) to default to a medium JavaScript snippet if the requested language or length combination is absent.

#### 3. Root Theme Attribute Manipulation
* **`document.documentElement.setAttribute('data-theme', e.target.value)`**: Sets the `data-theme` attribute directly on the `<html>` root element. This activates CSS variable overrides defined in `theme.css` with zero reflow overhead.

#### 4. Event Delegation & Focus Restoration
* **`codeDisplay.addEventListener('click', focusInput)`**: Clicking anywhere inside the code box re-focuses the hidden input proxy, ensuring smooth typing on both desktop and touch devices.
* **`document.addEventListener('keydown', (e) => handleKeyDown(e))`**: Captures keyboard events at the document root level, routing inputs directly to the typing engine.



