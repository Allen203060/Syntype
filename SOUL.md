# Project Soul: Web Project E1 - DevType (Developer Code Typing Trainer)

## Core Architecture & Overview
* **Project Title**: DevType - Developer Syntax & Code Typing Speed Trainer
* **Stack**: Native Web Stack (Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript - ES6+).
* **Goal**: Hands-on mastery of frontend JS (DOM events, caret engine, Canvas API, state architecture, performance optimizations) by building a developer-focused typing test.

## Current Status
* Project concept confirmed: **Code Typing Speed Trainer for Developers**.
* High-level architectural plan designed (Phases 1 through 6).
* Next step: Establish directory layout (`index.html`, `styles/`, `scripts/`) and initialize `walkthrough.md`.

## Key Decisions & Directives
1. **Framework Constraint**: Pure Vanilla HTML/CSS/JS (No React, Vue, jQuery, Tailwind, or Chart.js).
2. **Custom Canvas Engine**: Use native HTML5 `<canvas>` 2D context to render WPM performance charts.
3. **Caret & Input Mechanics**: Intercept native keydown events (Tab, Enter, Special Symbols) with hidden text input / focus proxy and DOM diffing.
4. **Documentation**: Detailed `walkthrough.md` tracking all implementations step-by-step.
