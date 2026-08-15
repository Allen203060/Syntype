# DevType - Developer Code Typing Trainer: Project Walkthrough

## 1. Project Overview & Architecture
DevType is a specialized typing speed and accuracy trainer designed explicitly for software developers. Unlike generic text typing tools, DevType tests code syntax navigation, handling indentation, special symbols (`{`, `}`, `(`, `)`, `=>`, `;`), multi-line code blocks, and language-specific code snippets.

### Core Stack
* **HTML5**: Semantic layout with accessibility features.
* **CSS3**: Modern layout using CSS Grid, Flexbox, CSS Variables for dynamic themes, and keyframe animations.
* **Vanilla JavaScript (ES6+)**: Custom DOM diffing engine, event interception, State Machine pattern, native HTML5 Canvas graph renderer, and LocalStorage management.

---

## 2. Historical Development Log

### Milestone 2: Semantic HTML5 Structure & Accessible DOM Layout (`index.html`)
* Configured core document head metadata (UTF-8, viewport responsiveness, SEO meta tags).
* Established design system typography integration via Google Fonts (`JetBrains Mono` & `Outfit`).
* Implemented modular stylesheet loading hierarchy (`theme.css` -> `main.css` -> `components.css`).
* Designed accessible `<header>` with interactive navigation controls (`<select>`) for programming language, snippet length, and visual theme selection.
* Constructed `<section class="metrics-bar">` with DOM hooks (`live-wpm`, `live-accuracy`, `live-timer`) for real-time statistical updates.
* Architected `<main class="typing-container">` featuring an off-screen `<textarea id="hidden-input">` focus proxy pattern for native keyboard capture and a `tabindex="0"` code display viewport.
* Built `<footer class="action-footer">` with keyboard hint affordances (`<kbd>Tab</kbd> + <kbd>Enter</kbd>`).
* Set up ES6 script module imports via `<script type="module" src="scripts/app.js">`.

### Milestone 3: Modular CSS Design System & Dynamic Multi-Theme Engine
* Implemented CSS custom properties (variables) in `styles/theme.css` across 4 themes: Dark Modern, Monokai Pro, Cyberpunk Neon, and Nordic Frost using `html[data-theme="..."]` attribute selectors.
* Built base resets, typography defaults, responsive app container layout, and glassmorphism background glow in `styles/main.css`.
* Created component-specific CSS in `styles/components.css`:
  * Dynamic caret pulse `@keyframes caret-blink` and highlight styles (`.char-correct`, `.char-incorrect`, `.char-current`).
  * Off-screen hidden input proxy layer styling (`position: absolute; opacity: 0; pointer-events: none`).
  * Metric cards with hover lift animations and glassmorphism border styling.
  * Form controls, custom dropdown styling, and accessibility focus rings (`:focus-visible`).
  * Action footer button states and semantic keycap (`<kbd>`) styling.

### Milestone 4: System Design Architect Agent Configuration & Socratic Protocol
* Designed the `.agents/rules/system_architect.md` workspace agent directive to establish an interactive System Design Architect persona within the Antigravity workspace.
* Defined standard Architectural Consultation Protocols (`[Architect Mode]` / `@architect`) for Socratic teaching, data modeling, DOM performance optimization, state machine design, and product alignment.
* Established guidelines for mid-project architectural discussions covering Vanilla JS state management (Observer / Event-Driven architecture), event delegation, and reflow/repaint prevention.

---

## 3. Technical Concepts & Mechanics Breakdown

### HTML5 Document Architecture & ARIA Accessibility (`index.html`)

#### 1. Document Type & Root Element
* `<!DOCTYPE html>`: Tells the browser to parse the document using the modern HTML5 standard in standard mode (preventing quirks mode).
* `<html lang="en" data-theme="dark">`:
  * `lang="en"`: Specifies English as the primary document language for accessibility screen readers and translation tools.
  * `data-theme="dark"`: Custom HTML5 data attribute used as the top-level selector for dynamic CSS theme switching without needing to toggle body classes manually.

#### 2. Head Metadata & Performance Optimization
* `<meta charset="UTF-8">`: Declares UTF-8 character encoding to support special programming symbols (`=>`, `&lt;`, `&gt;`, `™`, etc.).
* `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Ensures 1:1 scale rendering across mobile and desktop displays by mapping CSS viewport width to screen pixel width.
* `<meta name="description" ...>`: Search Engine Optimization (SEO) summary text describing the application.
* `<link rel="preconnect" ...>`: Optimizes web font loading latency by pre-establishing DNS lookups, TCP handshakes, and TLS negotiations with Google Fonts servers before the actual stylesheet request is initiated.
* Stylesheet Cascade Order:
  1. `theme.css`: Declares CSS custom properties (variables) for color palettes and design tokens.
  2. `main.css`: Core layout framework, typography reset, standard resets, and structural grids.
  3. `components.css`: Specific component styling (buttons, metrics cards, code display, custom dropdowns).

#### 3. Semantic Layout Structure
* `<header class="header">`: Represents the introductory banner containing branding (`<h1>`) and user preferences controls (`<nav>`).
* `<nav aria-label="Typing Configuration">`: Groups configuration dropdowns with an ARIA landmark label to inform assistive technologies of its purpose.
* `<section class="metrics-bar">`: Groups real-time statistical readouts into a distinct thematic section.
* `<main class="typing-container">`: Identifies the primary, unique feature content area of the document.
* `<footer class="action-footer">`: Provides utility actions (restart button) and keybinding hints.

#### 4. Form Controls & Accessibility Binding
* `<label for="language-select">`: Implicitly connects label text to the specific `<select id="language-select">` dropdown. Clicking the label focuses the corresponding control, and screen readers read the label upon selection focus.
* `option value="..."`: Defines the data value passed to JavaScript DOM handlers versus the user-visible label text inside the tag.

#### 5. Keyboard Focus Proxy & Code Display Engine Architecture
* `<textarea id="hidden-input">`:
  * Functions as an invisible input layer to capture native key presses, IME compositions, and mobile soft keyboard inputs.
  * Attributes disabled for typing accuracy: `autocomplete="off"`, `autocapitalize="none"`, `spellcheck="false"`.
  * `tabindex="-1"`: Prevents users from manually tabbing into this invisible element during keyboard navigation.
* `<div id="code-display" tabindex="0" aria-live="polite" aria-label="...">`:
  * `tabindex="0"`: Makes the custom `<div>` focusable via keyboard navigation (Tab key).
  * `aria-live="polite"`: Screen reader announcement setting that conveys dynamic changes in the code display without interrupting user speech.

#### 6. Module Script Loading
* `<script type="module" src="scripts/app.js">`: Loads JavaScript as a native ES6 module, enabling `import`/`export` syntax, enforcing strict mode (`"use strict"`), and automatically deferring execution until the HTML DOM tree is fully parsed.

### Phase 2: CSS Architecture & Theme Engine (`styles/theme.css`, `styles/main.css`, `styles/components.css`)

#### 1. CSS Custom Properties & Dynamic Attribute Selectors (`styles/theme.css`)
* **CSS Custom Properties (Variables)**: Declared at the root (`html[data-theme="..."]`) using `--variable-name` syntax. This allows centralized design tokens (colors, fonts, radii, shadows) to be reassigned dynamically without repeating element selectors.
* **Theme Switching Mechanism**: Utilizing attribute selectors (`html[data-theme="dark"]`, `html[data-theme="cyberpunk"]`, etc.) allows the entire color schema of the application to update instantaneously when JavaScript changes the `data-theme` attribute on the `<html>` root element.

#### 2. Layout, Resets & Glassmorphism (`styles/main.css`)
* `box-sizing: border-box`: Includes padding and borders within the element's total width and height calculation, preventing unwanted layout overflow.
* **Glassmorphism Aesthetic**: Uses semi-transparent background colors (`rgba`), subtle border highlights (`1px solid rgba(...)`), and `backdrop-filter: blur(12px)` to create depth and visual modern polish.
* **Flexbox App Shell**: `#app` uses `display: flex; flex-direction: column` with `min-height: 100vh` to maintain a dynamic vertical layout where header, main content, and footer scale proportionally across screen heights.

#### 3. Component Styling & Caret Animation Mechanics (`styles/components.css`)
* **Focus Proxy Layer (`.hidden-input`)**: Styled with `position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0;`. This hides the textarea visually while permitting DOM focus (`element.focus()`) and capturing raw user key events.
* **Visual Caret Pulse (`@keyframes caret-blink`)**: Uses CSS keyframe animations to pulse the background color or border of `.char-current` every `0.8s`, mimicking a terminal cursor.
* **Character Typing State Indicators**:
  * `.char`: Default untyped code character using `--char-untyped`.
  * `.char-correct`: Successfully typed character with high contrast color (`--char-correct`).
  * `.char-incorrect`: Mis-typed character with error background (`--char-incorrect-bg`) and distinct strike/highlight color (`--char-incorrect`).
* **Keyboard Shortcut Badges (`<kbd>`)**: Formatted with monospace typography, subtle inset shadows, and background borders to replicate physical keycaps.

### Phase 4: System Design Architect Agent Architecture (`.agents/rules/system_architect.md`)

#### 1. Workspace Rule Injection Mechanics
* Antigravity IDE parses all markdown rule files located under `.agents/rules/` on every conversation request. By defining `.agents/rules/system_architect.md`, the AI assistant is permanently equipped with a System Design Architect role profile without requiring external plugins or complex setups.

#### 2. Dual-Role Architecture: Implementation vs Socratic Mentoring
* **Standard Tutor Mode**: Focuses on line-by-line Vanilla JS implementation, code generation for muscle memory, DOM manipulation guidance, and CSS breakdown.
* **System Architect Mode**: Triggered via `[Architect Mode]` or `@architect` or mid-task queries. Focuses on:
  * High-level architectural pattern selection (Finite State Machine vs Pub/Sub Event Emitter).
  * Data model schema design (snippet object contracts, history storage schemas).
  * Performance & Memory optimization (DOM reflow batching, `requestAnimationFrame`, canvas rendering vs DOM diffing).
  * Requirements enforcement and product scope alignment.
