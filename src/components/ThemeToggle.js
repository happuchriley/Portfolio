import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '', light = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        light
          ? 'border-cream/40 text-cream hover:border-ochre hover:text-ochre focus-visible:ring-offset-transparent'
          : 'border-ink/25 text-ink hover:border-primary hover:bg-primary hover:text-white focus-visible:ring-offset-cream dark:border-cream/35 dark:text-cream dark:focus-visible:ring-offset-charcoal'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <i className={`fas text-lg ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
    </button>
  );
}
