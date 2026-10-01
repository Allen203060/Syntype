import { renderWpmChart, renderSymbolHeatmap } from './analytics.js';


// State Variables
let wpmHistory = [];
let typoMap = {};
let targetSnippet = "";
let typedInput = "";
let startTime = null;
let timerInterval = null;
let isTestActive = false;
let totalErrors = 0;

// DOM Elements
const codeDisplay = document.getElementById('code-display');
const hiddenInput = document.getElementById('hidden-input');
const wpmDisplay = document.getElementById('live-wpm');
const accuracyDisplay = document.getElementById('live-accuracy');
const timerDisplay = document.getElementById('live-timer');

export function initEngine(snippetText) {
    targetSnippet = snippetText;
    wpmHistory = [];
    typoMap = {};
    typedInput = "";
    startTime = null;
    isTestActive = false;
    totalErrors = 0;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timerDisplay.textContent = '0s';

    renderDisplay();
    focusInput();

}   

// Focus the hidden input proxy for mobile devices so soft keyboards open and desktop physical key events are captured reliably.
export function focusInput() {
  if (hiddenInput) {
    hiddenInput.focus();
  }
}

// Render the code display with DOM Character Spans and Caret
function renderDisplay() {
  codeDisplay.innerHTML = '';
  
  const targetChars = targetSnippet.split('');
  const typedChars = typedInput.split('');
  targetChars.forEach((char, index) => {
    const charSpan = document.createElement('span');
    // Caret Insertion Point
    if (index === typedChars.length) {
      const caretSpan = document.createElement('span');
      caretSpan.className = 'caret';
      codeDisplay.appendChild(caretSpan);
    }
    if (index < typedChars.length) {
      if (typedChars[index] === char) {
        charSpan.className = 'char-correct';
        charSpan.textContent = char;
      } else {
        charSpan.className = 'char-incorrect';
        charSpan.textContent = char === ' ' ? '␣' : char;
      }
    } else {
      charSpan.className = 'char-pending';
      charSpan.textContent = char;
    }
    codeDisplay.appendChild(charSpan);
  });
  // Caret at the end of the text
  if (typedChars.length >= targetChars.length) {
    const caretSpan = document.createElement('span');
    caretSpan.className = 'caret';
    codeDisplay.appendChild(caretSpan);
  }
}
// Handle Keydown Events
export function handleKeyDown(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    processCharacter('  '); // Insert 2 spaces for tab
    return;
  }
  if (e.key === 'Backspace') {
    e.preventDefault();
    if (typedInput.length > 0) {
      typedInput = typedInput.slice(0, -1);
      renderDisplay();
      calculateMetrics();
    }
    return;
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    processCharacter('\n');
    return;
  }
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault();
    processCharacter(e.key);
  }
}
// Process Typed Character
function processCharacter(char) {
  if (typedInput.length >= targetSnippet.length) return;
  if (!isTestActive) {
    startTest();
  }
  const currentIndex = typedInput.length;
  if (char !== targetSnippet[currentIndex]) {
    totalErrors++;
    const expectedChar = targetSnippet[currentIndex];
    typoMap[expectedChar] = (typoMap[expectedChar] || 0) + 1;
  }
  typedInput += char;
  renderDisplay();
  calculateMetrics();
  if (typedInput.length === targetSnippet.length) {
    finishTest();
  }
}

function startTest() {
  isTestActive = true;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    calculateMetrics();
  }, 100);
}

function finishTest() {
  isTestActive = false;
  clearInterval(timerInterval);
  calculateMetrics();

  // Populate Modal Metrics
  document.getElementById('final-wpm').textContent = wpmDisplay.textContent;
  document.getElementById('final-accuracy').textContent = accuracyDisplay.textContent;
  document.getElementById('final-time').textContent = timerDisplay.textContent;
  document.getElementById('final-errors').textContent = totalErrors;

  // Render Canvas Chart & Heatmap
  renderWpmChart('wpm-chart', wpmHistory);
  renderSymbolHeatmap('symbol-heatmap', typoMap);

  // Open Modal
  const modal = document.getElementById('results-modal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}


// Calculate live typing metrics (WPM, Accuracy, Time)
function calculateMetrics() {
  if (!startTime) return;
  if (isTestActive) {
  wpmHistory.push(wpm);
}
  const rawElapsedSeconds = (Date.now() - startTime) / 1000;
  timerDisplay.textContent = `${Math.floor(rawElapsedSeconds)}s`;
  
  let correctCount = 0;
  const typedChars = typedInput.split('');
  typedChars.forEach((char, index) => {
    if (char === targetSnippet[index]) {
      correctCount++;
    }
  });

  if (rawElapsedSeconds < 1.0) {
    wpmDisplay.textContent = '0';
  } else {
    const timeInMinutes = rawElapsedSeconds / 60;
    const wpm = Math.round((correctCount / 5) / timeInMinutes);
    wpmDisplay.textContent = isNaN(wpm) ? 0 : wpm;
  }

  const accuracy = typedInput.length > 0 
    ? Math.round((correctCount / typedInput.length) * 100) 
    : 100;
  accuracyDisplay.textContent = `${accuracy}%`;
}
