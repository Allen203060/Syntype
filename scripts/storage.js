// Native Browser LocalStorage API Service

const KEYS = {
  BEST_WPM: 'synlearn_best_wpm',
  THEME: 'synlearn_theme',
  HISTORY: 'synlearn_history',
  PLAYLISTS: 'synlearn_playlists'
};

// Save & Retrieve All-Time Personal Best WPM
export function savePersonalBest(wpm) {
  try {
    const currentBest = getPersonalBest();
    if (wpm > currentBest) {
      localStorage.setItem(KEYS.BEST_WPM, wpm.toString());
      return true;
    }
  } catch (err) {
    console.warn('LocalStorage unavailable:', err);
  }
  return false;
}

export function getPersonalBest() {
  try {
    const val = localStorage.getItem(KEYS.BEST_WPM);
    return val ? parseInt(val, 10) : 0;
  } catch (err) {
    return 0;
  }
}

// Save & Retrieve Theme Preference
export function saveThemePreference(theme) {
  try {
    localStorage.setItem(KEYS.THEME, theme);
  } catch (err) {
    console.warn('LocalStorage unavailable:', err);
  }
}

export function getThemePreference() {
  try {
    return localStorage.getItem(KEYS.THEME) || 'dark';
  } catch (err) {
    return 'dark';
  }
}

// Save & Retrieve Session History Logs
export function saveSessionRecord(session) {
  try {
    const history = getSessionHistory();
    history.unshift(session); // Add latest session to top
    if (history.length > 50) history.pop(); // Keep last 50 sessions
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
  } catch (err) {
    console.warn('LocalStorage unavailable:', err);
  }
}

export function getSessionHistory() {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

// Save & Retrieve Custom Playlists
export function saveCustomPlaylist(playlist) {
  try {
    const playlists = getCustomPlaylists();
    // Use title as unique ID. If exists, overwrite it.
    const existingIndex = playlists.findIndex(p => p.title === playlist.title);
    if (existingIndex > -1) {
      playlists[existingIndex] = playlist;
    } else {
      playlists.push(playlist);
    }
    localStorage.setItem(KEYS.PLAYLISTS, JSON.stringify(playlists));
  } catch (err) {
    console.warn('LocalStorage unavailable:', err);
  }
}

export function getCustomPlaylists() {
  try {
    const raw = localStorage.getItem(KEYS.PLAYLISTS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function deleteCustomPlaylist(title) {
  try {
    let playlists = getCustomPlaylists();
    playlists = playlists.filter(p => p.title !== title);
    localStorage.setItem(KEYS.PLAYLISTS, JSON.stringify(playlists));
  } catch (err) {
    console.warn('LocalStorage unavailable:', err);
  }
}
