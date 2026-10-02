// Native Browser LocalStorage API Service

const KEYS = {
  BEST_WPM: 'devtype_best_wpm',
  THEME: 'devtype_theme',
  HISTORY: 'devtype_history'
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
