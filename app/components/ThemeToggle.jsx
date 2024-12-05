import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-secondary/80 transition-all duration-200 focus:outline-none  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 "
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        {theme === 'light' ? (
          <Moon className="absolute top-0 left-0 transform rotate-0 transition-all duration-300 text-primary" />
        ) : (
          <Sun className="absolute top-0 left-0 transform rotate-90 transition-all duration-300 text-primary" />
        )}
      </div>
    </button>
  );
}
