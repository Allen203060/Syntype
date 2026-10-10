# Project Soul: Web Project E1 - SynLearn 2.0 (AI Learning Edition)

## Core Architecture & Overview
* **Project Title**: SynLearn 2.0 - AI-Powered Active Learning & Code Typing Platform
* **Stack**: Native Web Stack (Vanilla HTML5, Vanilla CSS3, Vanilla JavaScript - ES6+).
* **Goal**: Transform a static typing tester into a dynamic educational platform using "Curated Playlists" and AI generation. Teach developers complex concepts (DSA, async, memory) through kinesthetic learning (typing) combined with contextual knowledge.

## Current Status
* **SynLearn 1.0 Completed**: Base typing engine, Canvas charts, themes, and persistence.
* **SynLearn 2.0 V2 Upgrade Completed**:
  * **Phase 1 UI**: Dual-Pane layout completed.
  * **Phase 2 & 3**: Playlist JSON database (`playlist.js`) and BYOK AI service (`ai-service.js`) implemented.
  * **Phase 4 Integration**: `typing-engine.js` successfully upgraded to a Phased State Machine. `app.js` UI controllers wired for API keys and asynchronous AI Generation. Project is fully functional!

## Key Decisions & Directives
1. **Serverless AI Architecture (BYOK)**: User provides their own API key via LocalStorage. No backend needed.
2. **Dual-Pane UI**: Split-screen design to simultaneously show the active typing snippet and the educational markdown explanation.
3. **Phased Playlists**: Long concepts are broken into sequential phases.
4. **Pedagogical Rule**: User writes all JS by hand with detailed line-by-line concept breakdowns.
