import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="btn-secondary"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default ThemeToggle;
