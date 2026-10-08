import { codeSnippets } from "./snippets.js";
import { curatedPlaylists } from "./playlist.js";
import { saveApiKey, getApiKey, generateLearningPlaylist } from "./ai-service.js";
import { loadPlaylist, advancePhase, handleKeyDown, focusInput } from './typing-engine.js';
import { getThemePreference, saveThemePreference } from './storage.js';

// ES modules are deferred by default, so the DOM is already loaded.
  const languageSelect = document.getElementById('language-select');
  const lengthSelect = document.getElementById('length-select');
  const themeSelect = document.getElementById('theme-select');
  const restartBtn = document.getElementById('restart-btn');
  const codeDisplay = document.getElementById('code-display');  
  const resultsModal = document.getElementById('results-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalRestartBtn = document.getElementById('modal-restart-btn');
  
  
  const savedTheme = getThemePreference();
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeSelect) themeSelect.value = savedTheme;

 
  function loadSelectedPlaylist() {
    const playlistId = document.getElementById('playlist-select').value;
    
    if (playlistId === 'default') {
       
      const randomSnip = codeSnippets.javascript.medium[0];
      loadPlaylist({
        title: "Classic Typing Test",
        phases: [{ title: "Warmup", knowledge: "No AI explanation loaded.", snippet: randomSnip }]
      });
    } else {
      loadPlaylist(curatedPlaylists[playlistId]);
    }
  }

  document.getElementById('playlist-select').addEventListener('change', loadSelectedPlaylist);
  document.getElementById('next-phase-btn').addEventListener('click', advancePhase);


  // Modal Close Buttons
  const closeModal = () => {
    if (resultsModal) resultsModal.classList.add('hidden');
  };

  closeModalBtn.addEventListener('click', closeModal);
  modalRestartBtn.addEventListener('click', () => {
    closeModal();
    loadSelectedPlaylist();
  });

  // Allow closing modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resultsModal && !resultsModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 2. Persist Theme Preference when user changes selection
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const selectedTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', selectedTheme);
      saveThemePreference(selectedTheme);
    });
  }

  // Restart Button Click Listener
  if (restartBtn) restartBtn.addEventListener('click', loadSelectedPlaylist);

  document.addEventListener('keydown', (e) => { 
    handleKeyDown(e);
  });

  // Re-focus input when clicking code display area
  if (codeDisplay) codeDisplay.addEventListener('click', focusInput);

  // --- AI Settings Modal Logic ---
  const settingsModal = document.getElementById('settings-modal');
  const apiKeyInput = document.getElementById('api-key-input');
  
  document.getElementById('settings-btn').addEventListener('click', () => {
    apiKeyInput.value = getApiKey(); // Pre-fill saved key
    settingsModal.classList.remove('hidden');
  });

  document.getElementById('close-settings-btn').addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });

  document.getElementById('save-settings-btn').addEventListener('click', () => {
    saveApiKey(apiKeyInput.value.trim());
    settingsModal.classList.add('hidden');
    alert("API Key Saved Successfully!");
  });

  // --- AI Playlist Generator Logic ---
  const generateBtn = document.getElementById('generate-ai-btn');
  const topicInput = document.getElementById('ai-topic-input');

  generateBtn.addEventListener('click', async () => {
    const topic = topicInput.value.trim();
    if (!topic) return alert("Please enter a topic to learn!");
    if (!getApiKey()) return alert("Please click the ⚙️ icon to save your Gemini API key first!");

    try {
      generateBtn.textContent = "⏳ Generating...";
      generateBtn.disabled = true;
      document.getElementById('knowledge-content').innerHTML = "<em>AI is thinking and writing code...</em>";

      const newPlaylist = await generateLearningPlaylist(topic);
      loadPlaylist(newPlaylist);
      
    } catch (err) {
      alert("AI Generation Failed: " + err.message);
    } finally {
      generateBtn.textContent = "✨ Generate";
      generateBtn.disabled = false;
    }
  });

  // Initial Load
  loadSelectedPlaylist();
