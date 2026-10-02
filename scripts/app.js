import { codeSnippets } from "./snippets.js";
import { initEngine, handleKeyDown, focusInput } from './typing-engine.js';
import { getThemePreference, saveThemePreference } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language-select');
  const lengthSelect = document.getElementById('length-select');
  const themeSelect = document.getElementById('theme-select');
  const restartBtn = document.getElementById('restart-btn');
  const codeDisplay = document.getElementById('code-display');  
  const resultsModal = document.getElementById('results-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalRestartBtn = document.getElementById('modal-restart-btn');
  
  // 1. Restore Persisted Theme on Application Load
  const savedTheme = getThemePreference();
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeSelect) themeSelect.value = savedTheme;

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

  // 2. Persist Theme Preference when user changes selection
  themeSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    document.documentElement.setAttribute('data-theme', selectedTheme);
    saveThemePreference(selectedTheme);
  });

  // Dropdown Change Listeners
  languageSelect.addEventListener('change', loadNewSnippet);
  lengthSelect.addEventListener('change', loadNewSnippet);
  
  // Restart Button Click Listener
  restartBtn.addEventListener('click', loadNewSnippet);

  document.addEventListener('keydown', (e) => { 
    handleKeyDown(e);
  });

  // Re-focus input when clicking code display area
  codeDisplay.addEventListener('click', focusInput);

  // Initial Load
  loadNewSnippet();
});
