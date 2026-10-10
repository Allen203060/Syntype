# SynLearn

Welcome to **SynLearn** an advanced, AI-powered active learning and kinesthetic code typing platform designed exclusively for developers. Stop typing random English words and start building muscle memory for real algorithms, async functions, data structures, and complex architectures.

---

## ✨ Core Features

### ⚡ Practice Arena
Test your raw typing speed, syntax navigation, and accuracy against realistic code snippets.
- **Multi-Language Support**: Practice in JavaScript, Python, C++, Java, or Rust.
- **Dynamic Lengths**: Choose between Short (3-5 lines), Medium (6-9 lines), or Long (10-15 lines) challenges.
- **AI or Static Generation**: Seamlessly generate random snippets on the fly using Gemini AI, with instant fallbacks to built-in curated arrays if offline.

### 🎓 Learning Portal (AI Planner)
Don't just type code—understand it. Enter any software engineering topic (e.g., "LRU Cache in Python" or "React State Management") and let the AI generate a phased, interactive tutorial.
- **Phased Kinesthetic Curriculums**: The AI breaks down complex concepts into bite-sized, 3-to-7 phase typing lessons. 
- **Detailed Markdown Knowledge**: Each phase includes a deeply technical explanation, architecture breakdown, and line-by-line mechanics.
- **Custom Playlists**: Instantly save your favorite AI-generated plans to your LocalStorage and access them later from the unified `📁 Playlists` modal.

### 📊 Real-Time Analytics
- **Live Canvas Charts**: Watch your WPM (Words Per Minute) and Accuracy graph update dynamically as you type.
- **Persistent Personal Bests**: SynLearn tracks and saves your all-time highest WPM scores directly in your browser.

### 🎨 Customizable Aesthetics
- **Premium Themes**: Choose between `Dark` (Default), `Monokai`, `Cyberpunk`, and `Nordic` themes. 
- **Modern Glassmorphism UI**: Beautiful, responsive, and completely custom Vanilla CSS design with smooth micro-animations.

---

## 🛠️ Tech Stack & Architecture

SynLearn is proudly built with **0 dependencies**. No React, no Tailwind, no NPM bloat.
- **HTML5**: Semantic, multi-page structure (`index.html`, `practice.html`, `learn.html`).
- **CSS3**: Vanilla CSS with advanced Flexbox/Grid layouts, custom properties (CSS variables), and glassmorphic overlays.
- **JavaScript (ES6+)**: Pure DOM manipulation, asynchronous state management, and modern Web APIs.
- **Gemini API**: Deep integration with `gemini-2.5-flash` using custom-engineered System Prompts to generate strict JSON schemas and pure code without markdown artifacts or comments.

---

## 🚀 Getting Started

1. **Clone the Repo** (or simply download the files).
2. **Open `index.html`** directly in any modern web browser. No local server required!
3. **Configure AI (Optional)**: 
   - Navigate to the Learning Portal or Practice Arena.
   - Click the `⚙️` Settings icon in the top right.
   - Paste your free [Google Gemini API Key](https://aistudio.google.com/).
   - Start generating infinite custom typing tutorials!

---

## 📂 Project Structure

```text
/
├── index.html           # Landing Page
├── practice.html        # Practice Arena (Random Snippets)
├── learn.html           # Learning Portal (AI Generation)
├── styles/
│   ├── main.css         # Reset and Core Layouts
│   ├── theme.css        # Color tokens & Themes
│   └── components.css   # Modals, Cards, Buttons
└── scripts/
    ├── app.js           # Main UI Controller & Event Router
    ├── typing-engine.js # Core State Machine & DOM rendering
    ├── ai-service.js    # Gemini API wrapper for Random Snippets
    ├── ai-planner.js    # Gemini API wrapper for multi-phase JSON plans
    ├── storage.js       # LocalStorage CRUD operations
    ├── snippets.js      # Hardcoded fallback code arrays
    └── playlist.js      # Built-in curated tutorials
```

---

*Built with ❤️ and pure Vanilla JavaScript.*
