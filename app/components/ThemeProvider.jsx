'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * ThemeProvider component provides theme context to its child components.
 * It manages the current theme state ('light' or 'dark') and synchronizes
 * it with localStorage and the system's color scheme preference.
 * It also provides a function to toggle the theme between 'light' and 'dark'.
 *
 * @param {React.ReactNode} children - The child components that require access
 * to the theme context.
 *
 * @returns {React.ReactElement|null} The rendered child components wrapped
 * with the theme context provider, or null if the component is not mounted.
 */
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light'); // Default theme
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      // Check if there's a theme preference in localStorage
      const storedTheme = localStorage.getItem('theme');
      
      // If no stored theme, check system preference
      if (!storedTheme) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemTheme);
        localStorage.setItem('theme', systemTheme);
      } else {
        setTheme(storedTheme);
      }
      
      setMounted(true);
    }, []);

    useEffect(() => {
      if (mounted) {
        // Update class and localStorage when theme changes
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
      }
    }, [theme, mounted]);
  
    /**
     * Toggles the theme between 'light' and 'dark'.
     * The theme value is updated in the component state and
     * also in localStorage.
     */
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    };

    // Prevent flash of wrong theme
    if (!mounted) {
      return null;
    }
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`min-h-screen bg-white dark:bg-gray-900 theme-transition`}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
}

/**
 * Hook to access the current theme and toggleTheme function.
 *
 * @returns {{ theme: 'light' | 'dark', toggleTheme: () => void }}
 *
 * @throws {Error} If useTheme is called outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};