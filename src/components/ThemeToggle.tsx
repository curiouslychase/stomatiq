'use client';

import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'vibe' | 'system';

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem('theme') as Theme) || 'system';
    setCurrentTheme(saved);
    applyTheme(saved);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const current = (localStorage.getItem('theme') as Theme) || 'system';
      if (current === 'system') applyTheme('system', true);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getSystem = (): 'dark' | 'light' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (value: Theme) => {
    const theme = value === 'system' ? getSystem() : value;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('vibe', theme === 'vibe');
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  };

  if (!mounted) return null;

  return (
    <div
      className="inline-flex items-center rounded-lg border border-foreground/[.08] px-2 py-1.5 gap-1 text-xs relative"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <ThemeButton
        theme="dark"
        label="DARK"
        isActive={currentTheme === 'dark'}
        onClick={() => handleThemeChange('dark')}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </ThemeButton>

      <ThemeButton
        theme="light"
        label="LIGHT"
        isActive={currentTheme === 'light'}
        onClick={() => handleThemeChange('light')}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </ThemeButton>

      <ThemeButton
        theme="vibe"
        label="VIBE"
        isActive={currentTheme === 'vibe'}
        onClick={() => handleThemeChange('vibe')}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="m22 3.41-.12-1.26-1.2.4a13.84 13.84 0 0 1-6.41.64 11.87 11.87 0 0 0-6.68.9A7.23 7.23 0 0 0 3.3 9.5a9 9 0 0 0 .39 4.58 16.6 16.6 0 0 1 1.18-2.2 9.85 9.85 0 0 1 4.07-3.43 11.16 11.16 0 0 1 5.06-1A12.08 12.08 0 0 0 9.34 9.2a9.48 9.48 0 0 0-1.86 1.53 11.38 11.38 0 0 0-1.39 1.91 16.39 16.39 0 0 0-1.57 4.54A26.42 26.42 0 0 0 4 22h2a30.69 30.69 0 0 1 .59-4.32 9.25 9.25 0 0 0 4.52 1.11 11 11 0 0 0 4.28-.87C23 14.67 22 3.86 22 3.41z" />
        </svg>
      </ThemeButton>

      <ThemeButton
        theme="system"
        label="SYSTEM"
        isActive={currentTheme === 'system'}
        onClick={() => handleThemeChange('system')}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </ThemeButton>
    </div>
  );
}

function ThemeButton({
  theme,
  label,
  isActive,
  onClick,
  children,
}: {
  theme: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      data-theme={theme}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-md px-2 py-1.5 text-xs transition-all duration-200 ${
        isActive ? 'bg-foreground text-background' : ''
      }`}
      style={{ opacity: isActive ? 1 : 0.65 }}
      aria-label={label}
      aria-pressed={isActive}
    >
      {children}
      <span
        className="inline-flex items-center uppercase tracking-wide text-xs overflow-hidden transition-all duration-200"
        style={{
          width: isActive ? 'auto' : '0px',
          opacity: isActive ? 1 : 0,
          marginLeft: isActive ? '0.35rem' : '0',
        }}
      >
        {label}
      </span>
    </button>
  );
}
