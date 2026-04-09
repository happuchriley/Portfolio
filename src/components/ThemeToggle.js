import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 border-white/35 text-white transition-colors hover:border-primary hover:bg-white/10 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent dark:border-white/30 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <i className={`fas text-lg ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
    </button>
  );
}
