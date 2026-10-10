import { codeSnippets } from "./snippets.js";
import { curatedPlaylists } from "./playlist.js";
import { saveApiKey, getApiKey, generatePracticeSnippet } from './ai-service.js';
import { generateProjectPlan } from './ai-planner.js';
import { loadPlaylist, advancePhase, handleKeyDown, focusInput } from './typing-engine.js';
import { getThemePreference, saveThemePreference, saveCustomPlaylist, getCustomPlaylists, deleteCustomPlaylist } from './storage.js';

  let currentLoadedPlaylist = null;

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

 
  async function loadSelectedPlaylist(forceRandom = false) {
    const playlistSelect = document.getElementById('playlist-select');
    const playlistId = playlistSelect ? playlistSelect.value : 'default';
    
    // In practice.html (no playlistSelect) or if forceRandom is true, generate a random snippet.
    if (!playlistSelect || forceRandom || playlistId === 'default') {
      const lang = document.getElementById('language-select')?.value || 'javascript';
      const len = document.getElementById('length-select')?.value || 'medium';
      
      let randomSnip = "";

      try {
        const codeDisplay = document.getElementById('code-display');
        if (codeDisplay && (!playlistSelect || forceRandom)) {
          codeDisplay.innerHTML = '<div class="placeholder-text">⏳ Generating random AI snippet...</div>';
        }
        
        randomSnip = await generatePracticeSnippet(lang, len);
      } catch (err) {
        console.warn("AI Snippet generation bypassed, using static fallback.");
        const snippetArray = codeSnippets[lang]?.[len] || codeSnippets.javascript.medium;
        randomSnip = snippetArray[Math.floor(Math.random() * snippetArray.length)];
      }

      currentLoadedPlaylist = {
        title: "Practice Arena",
        phases: [{ title: "Random Snippet", knowledge: "No AI explanation loaded.", snippet: randomSnip }]
      };
      
      const saveBtn = document.getElementById('save-plan-btn');
      if (saveBtn) saveBtn.classList.add('hidden');

      loadPlaylist(currentLoadedPlaylist);
    } else {
      currentLoadedPlaylist = curatedPlaylists[playlistId];
      const saveBtn = document.getElementById('save-plan-btn');
      if (saveBtn) saveBtn.classList.add('hidden');
      
      loadPlaylist(currentLoadedPlaylist);
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

        const langSelect = document.getElementById('ai-language-select');
        const aiLang = langSelect ? langSelect.value : 'javascript';
        
        const newPlaylist = await generateProjectPlan(topic, aiLang);
        
        // Track for saving
        currentLoadedPlaylist = newPlaylist;
        const saveBtn = document.getElementById('save-plan-btn');
        if (saveBtn) saveBtn.classList.remove('hidden');

        loadPlaylist(newPlaylist);
        
      } catch (err) {
        alert("AI Generation Failed: " + err.message);
      } finally {
        generateBtn.textContent = "✨ Generate";
        generateBtn.disabled = false;
      }
    });
  }

  // --- Unified Playlists Logic ---
  const savePlanBtn = document.getElementById('save-plan-btn');
  if (savePlanBtn) {
    savePlanBtn.addEventListener('click', () => {
      if (currentLoadedPlaylist) {
        saveCustomPlaylist(currentLoadedPlaylist);
        alert('Playlist saved successfully! Click "📁 Playlists" to view.');
      }
    });
  }

  const openPlaylistsBtn = document.getElementById('open-playlists-btn');
  const playlistsModal = document.getElementById('playlists-modal');
  const curatedList = document.getElementById('curated-playlists-list');
  const savedList = document.getElementById('saved-playlists-list');

  function renderPlaylistsModal() {
    if (!playlistsModal) return;

    // Render Curated
    if (curatedList) {
      curatedList.innerHTML = '';
      for (const [id, pl] of Object.entries(curatedPlaylists)) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.textContent = `📘 ${pl.title}`;
        btn.addEventListener('click', () => {
          currentLoadedPlaylist = pl;
          loadPlaylist(pl);
          playlistsModal.classList.add('hidden');
          if (savePlanBtn) savePlanBtn.classList.add('hidden');
        });
        curatedList.appendChild(btn);
      }
    }

    // Render Saved
    if (savedList) {
      const playlists = getCustomPlaylists();
      savedList.innerHTML = '';
      if (playlists.length === 0) {
        savedList.innerHTML = '<p class="empty-state">No saved playlists yet.</p>';
      } else {
        playlists.forEach(pl => {
          const wrapper = document.createElement('div');
          wrapper.style.display = 'flex';
          wrapper.style.gap = '10px';
          
          const btn = document.createElement('button');
          btn.className = 'btn btn-secondary';
          btn.style.flex = '1';
          btn.style.textAlign = 'left';
          btn.textContent = `📚 ${pl.title} (${pl.language || 'Mixed'} - ${pl.phases.length} Phases)`;
          btn.addEventListener('click', () => {
            currentLoadedPlaylist = pl;
            loadPlaylist(pl);
            playlistsModal.classList.add('hidden');
            if (savePlanBtn) savePlanBtn.classList.remove('hidden');
          });

          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'btn btn-secondary';
          deleteBtn.style.padding = '0.5rem';
          deleteBtn.textContent = '🗑️';
          deleteBtn.title = 'Delete Playlist';
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Delete "${pl.title}"?`)) {
              deleteCustomPlaylist(pl.title);
              renderPlaylistsModal();
            }
          });

          wrapper.appendChild(btn);
          wrapper.appendChild(deleteBtn);
          savedList.appendChild(wrapper);
        });
      }
    }
  }

  if (openPlaylistsBtn && playlistsModal) {
    openPlaylistsBtn.addEventListener('click', () => {
      renderPlaylistsModal();
      playlistsModal.classList.remove('hidden');
    });
  }

  const closePlaylistsBtn = document.getElementById('close-playlists-btn');
  if (closePlaylistsBtn && playlistsModal) {
    closePlaylistsBtn.addEventListener('click', () => {
      playlistsModal.classList.add('hidden');
    });
  }

  // Initial Load
  // In learn.html, we don't want to auto-load a random snippet. 
  // We check if it's practice arena by looking for languageSelect (which only exists in practice.html currently, but wait, both have it!)
  // Actually, learn.html does NOT have 'language-select' ID for practice mode, it has 'ai-language-select'.
  if (document.getElementById('language-select')) {
    loadSelectedPlaylist();
  }

