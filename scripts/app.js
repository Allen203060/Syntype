import { codeSnippets } from "./snippets.js";
import { curatedPlaylists } from "./playlist.js";
import { saveApiKey, getApiKey, generatePracticeSnippet } from './ai-service.js';
import { generateProjectPlan } from './ai-planner.js';
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

 
  async function loadSelectedPlaylist() {
    const playlistSelect = document.getElementById('playlist-select');
    const playlistId = playlistSelect ? playlistSelect.value : 'default';
    
    if (playlistId === 'default') {
      const lang = document.getElementById('language-select')?.value || 'javascript';
      const len = document.getElementById('length-select')?.value || 'medium';
      
      let randomSnip = "";

      try {
        const codeDisplay = document.getElementById('code-display');
        if (codeDisplay && !playlistSelect) {
          // Visual indicator for practice mode while API is fetching
          codeDisplay.innerHTML = '<div class="placeholder-text">⏳ Generating random AI snippet...</div>';
        }
        
        // Attempt to generate random snippet via AI
        randomSnip = await generatePracticeSnippet(lang, len);
      } catch (err) {
        // AI Failed (No API key, quota exceeded, offline) - use hardcoded fallback
        console.warn("AI Snippet generation bypassed, using static fallback.");
        const snippetArray = codeSnippets[lang]?.[len] || codeSnippets.javascript.medium;
        randomSnip = snippetArray[Math.floor(Math.random() * snippetArray.length)];
      }

      loadPlaylist({
        title: "Practice Arena",
        phases: [{ title: "Random Snippet", knowledge: "No AI explanation loaded.", snippet: randomSnip }]
      });
    } else {
      loadPlaylist(curatedPlaylists[playlistId]);
    }
  }

  const playlistSelect = document.getElementById('playlist-select');
  if (playlistSelect) {
    playlistSelect.addEventListener('change', loadSelectedPlaylist);
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', loadSelectedPlaylist);
  }

  if (lengthSelect) {
    lengthSelect.addEventListener('change', loadSelectedPlaylist);
  }

  const nextPhaseBtn = document.getElementById('next-phase-btn');
  if (nextPhaseBtn) {
    nextPhaseBtn.addEventListener('click', advancePhase);
  }


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

  const hiddenInput = document.getElementById('hidden-input');
  if (hiddenInput) {
    hiddenInput.addEventListener('keydown', handleKeyDown);
  }

  // Re-focus input when clicking anywhere in the typing container
  const typingContainer = document.querySelector('.typing-container');
  if (typingContainer) typingContainer.addEventListener('click', focusInput);

  // --- AI Settings Modal Logic ---
  const settingsModal = document.getElementById('settings-modal');
  const apiKeyInput = document.getElementById('api-key-input');
  
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      if(apiKeyInput) apiKeyInput.value = getApiKey(); 
      if(settingsModal) settingsModal.classList.remove('hidden');
    });
  }

  const closeSettingsBtn = document.getElementById('close-settings-btn');
  if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
      if(settingsModal) settingsModal.classList.add('hidden');
    });
  }

  const saveSettingsBtn = document.getElementById('save-settings-btn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      if(apiKeyInput) saveApiKey(apiKeyInput.value.trim());
      if(settingsModal) settingsModal.classList.add('hidden');
      alert("API Key Saved Successfully!");
    });
  }

  // --- AI Playlist Generator Logic ---
  const generateBtn = document.getElementById('generate-ai-btn');
  const topicInput = document.getElementById('ai-topic-input');

  if (generateBtn && topicInput) {
    generateBtn.addEventListener('click', async () => {
      const topic = topicInput.value.trim();
      if (!topic) return alert("Please enter a topic to learn!");
      if (!getApiKey()) return alert("Please click the ⚙️ icon to save your Gemini API key first!");

      try {
        generateBtn.textContent = "⏳ Generating...";
        generateBtn.disabled = true;
        document.getElementById('knowledge-content').innerHTML = "<em>AI is thinking and writing code...</em>";

        const newPlaylist = await generateProjectPlan(topic);
        loadPlaylist(newPlaylist);
        
      } catch (err) {
        alert("AI Generation Failed: " + err.message);
      } finally {
        generateBtn.textContent = "✨ Generate";
        generateBtn.disabled = false;
      }
    });
  }

  // Initial Load
  loadSelectedPlaylist();
