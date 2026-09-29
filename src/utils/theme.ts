export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'bunker-watch-theme';

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** The saved choice if there is one, otherwise whatever the OS/browser prefers. */
export function getInitialTheme(): Theme {
  return readStoredTheme() ?? systemTheme();
}

export function getCurrentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/** Sets the theme on <html>. Pass persist=true for an explicit user choice. */
export function applyTheme(theme: Theme, persist = false) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // storage unavailable (private mode etc.) - the choice just won't persist
    }
  }
}

/**
 * Follow OS theme changes live, but only while the user has not picked a theme
 * themselves. Returns an unsubscribe function.
 */
export function followSystemTheme(): () => void {
  const query = window.matchMedia?.('(prefers-color-scheme: light)');
  if (!query) return () => {};
  const onChange = () => {
    if (readStoredTheme() === null) applyTheme(systemTheme());
  };
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
