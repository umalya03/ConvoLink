// frontend/src/components/ThemeSelector.jsx
import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { PaintRollerIcon, PaletteIcon } from 'lucide-react';
import { THEMES } from '../constants';
import toast from 'react-hot-toast'; // Import react-hot-toast for user feedback

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore(); // Access theme and setTheme from Zustand store

  // New: Handle theme change with async backend sync and toast feedback
  const handleThemeChange = async (themeName) => {
    try {
      await setTheme(themeName); // Call async setTheme to update local state and backend
      toast.success('Theme updated successfully!'); // Show success toast
    } catch (error) {
      toast.error('Failed to update theme. Please try again.'); // Show error toast on failure
    }
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown trigger: Unchanged, uses Lucide PaletteIcon */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`
                w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${theme === themeOption.name ? 'bg-primary/10 text-primary' : 'hover:bg-base-content/5'}
              `}
              // Updated: Use handleThemeChange instead of setTheme for async backend sync
              onClick={() => handleThemeChange(themeOption.name)}
            >
              <PaintRollerIcon className="size-4" />
              <span className="text-sm font-medium">{themeOption.label}</span>
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;