# Project Soul: Web Project E1 - DevType (Developer Code Typing Trainer)

## Core Architecture & Overview
* **Project Title**: DevType - Developer Syntax & Code Typing Speed Trainer
* **Stack**: Native Web Stack (Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript - ES6+).
* **Goal**: Hands-on mastery of frontend JS (DOM events, caret engine, Canvas API, state architecture, performance optimizations) by building a developer-focused typing test.

## Current Status
* **Phase 1 Complete**: Semantic HTML5 document architecture (`index.html`) and focus proxy layer setup.
* **Phase 2 Complete**: Complete CSS design system implemented across `styles/theme.css`, `styles/main.css`, and `styles/components.css` featuring 4 themes (Dark Modern, Monokai Pro, Cyberpunk Neon, Nordic Frost), glassmorphism visuals, caret animations, and responsive layout.
* **System Design Architect Agent Configured**: Defined `.agents/rules/system_architect.md` agent directive for interactive Socratic architectural discussions, state design, and performance teaching.
* **Next Step (Phase 3)**: Architect and implement core JavaScript data layer & snippet library (`scripts/snippets.js`) featuring multi-language code snippets (JS, Python, C++, Java, Rust), length metadata, and state management hooks.

## Key Decisions & Directives
1. **Directory Modularization**: Separate styles (`main.css`, `theme.css`, `components.css`) and modular JS files (`snippets.js`, `typing-engine.js`, `analytics.js`, `storage.js`, `app.js`).
2. **Framework Constraint**: Pure Vanilla HTML/CSS/JS (No external libraries).
3. **Caret & Input Mechanics**: Intercept native keydown events with focus proxy and DOM diffing.
4. **Documentation**: Detailed `walkthrough.md` tracking all implementations step-by-step.
5. **System Architect Persona**: Interactive design & architectural consultation mode available on demand (`[Architect Mode]` / `@architect`).

