# Project Soul: Web Project E1 - DevType 2.0 (AI Learning Edition)

## Core Architecture & Overview
* **Project Title**: DevType 2.0 - AI-Powered Active Learning & Code Typing Platform
* **Stack**: Native Web Stack (Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript - ES6+).
* **Goal**: Transform a static typing tester into a dynamic educational platform using "Curated Playlists" and AI generation. Teach developers complex concepts (DSA, async, memory) through kinesthetic learning (typing) combined with contextual knowledge.

## Current Status
* **DevType 1.0 Completed**: Base typing engine, Canvas charts, themes, and persistence.
* **Phase 1 (DevType 2.0) Completed**: Rebuilt `index.html` and `main.css` to support a CSS Grid Dual-Pane layout (Typing Arena + Knowledge Hub) and API Key settings modal.
* **Phase 2 & 3 In Progress**: Creating `playlist.js` for phase-based learning state machine and `ai-service.js` for Vanilla `fetch` calls to Google Gemini using BYOK architecture.

## Key Decisions & Directives
1. **Serverless AI Architecture (BYOK)**: User provides their own API key via LocalStorage. No backend needed.
2. **Dual-Pane UI**: Split-screen design to simultaneously show the active typing snippet and the educational markdown explanation.
3. **Phased Playlists**: Long concepts are broken into sequential phases.
4. **Pedagogical Rule**: User writes all JS by hand with detailed line-by-line concept breakdowns. Code review provides exact constructive feedback.
