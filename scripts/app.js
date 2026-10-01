import { codeSnippets } from "./snippets.js";
import { initEngine, handleKeyDown, focusInput } from './typing-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language-select');
  const lengthSelect = document.getElementById('length-select');
  const themeSelect = document.getElementById('theme-select');
  const restartBtn = document.getElementById('restart-btn');
  const codeDisplay = document.getElementById('code-display');  
  const resultsModal = document.getElementById('results-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalRestartBtn = document.getElementById('modal-restart-btn');
  
   // Load a snippet based on selected language and length
  function loadNewSnippet() {
    const lang = languageSelect.value;
    const len = lengthSelect.value;
    const snippetsList = codeSnippets[lang]?.[len] || codeSnippets.javascript.medium;
    const randomIndex = Math.floor(Math.random() * snippetsList.length);
    const selectedSnippet = snippetsList[randomIndex];
    initEngine(selectedSnippet);
  }

  // Modal Close Buttons
  const closeModal = () => {
    if (resultsModal) resultsModal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  modalRestartBtn.addEventListener('click', () => {
    closeModal();
    loadNewSnippet();
  });

  // Allow closing modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resultsModal && !resultsModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Theme Switcher Event Listener
  themeSelect.addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
  });

  // Dropdown Change Listeners
  languageSelect.addEventListener('change', loadNewSnippet);
  lengthSelect.addEventListener('change', loadNewSnippet);
  
  // Restart Button Click Listener
  restartBtn.addEventListener('click', loadNewSnippet);

  document.addEventListener('keydown', (e) => { 
    // Quick Restart Shortcut: Tab + Enter
    if (e.key === 'Enter' && e.target.tagName !== 'SELECT') {
    // Allow enter to function in typing engine
    }
    handleKeyDown(e);
  });

  // Re-focus input when clicking code display area
  codeDisplay.addEventListener('click', focusInput);

  // Initial Load
  loadNewSnippet();
});
 