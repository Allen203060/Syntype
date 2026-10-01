# Project Soul: Web Project E1 - DevType (Developer Code Typing Trainer)

## Core Architecture & Overview
* **Project Title**: DevType - Developer Syntax & Code Typing Speed Trainer
* **Stack**: Native Web Stack (Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript - ES6+).
* **Goal**: Hands-on mastery of frontend JS (DOM events, caret engine, Canvas API, state architecture, performance optimizations) by building a developer-focused typing test.

## Current Status
* **Phase 1, 2, 3, 4 & 5 Completed**:
  - Semantic HTML layout and 4-theme CSS variable design system.
  - Core typing engine with character-by-character DOM diffing, syntax key interception, blinking caret, and real-time metrics.
  - Results modal with metrics summary.
  - Native HTML5 Canvas 2D WPM speed graph (bezier curve + gradient area).
  - Symbol typo heatmap highlighting syntax-specific error frequencies.
  - Escape key and button modal navigation.
* **Phase 6 in progress**: LocalStorage persistence (`scripts/storage.js`) for personal best WPM records, test history stats, and persistent user theme preference.

## Key Decisions & Directives
1. **Zero External Libraries**: Native HTML5 Canvas 2D context used for data visualization.
2. **Storage Architecture**: Modular `scripts/storage.js` to handle `localStorage` reads/writes with JSON schema validation.
3. **Pedagogical Rule**: User writes all JS by hand with detailed line-by-line concept breakdowns.
4. **Documentation**: Detailed `walkthrough.md` tracking all implementations step-by-step.
