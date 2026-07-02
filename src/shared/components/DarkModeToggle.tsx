import { useEffect, useState } from 'react';
import { useTheme } from '@/shared/context/ThemeContext';
import SunIcon from '@/assets/sun.svg?react';
import MoonIcon from '@/assets/moon.svg?react';
import '@/styles/dark-mode.css';

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <SunIcon />
        <MoonIcon />
      </label>
    </div>
  );
}
