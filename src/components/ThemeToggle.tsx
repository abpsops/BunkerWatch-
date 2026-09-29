import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme, applyTheme, getCurrentTheme } from '../utils/theme';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
      title={label}
      aria-label={label}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
    </button>
  );
};
