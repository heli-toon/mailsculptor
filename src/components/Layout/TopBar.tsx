import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { getThemeColors } from '../../utils/helpers';

export function TopBar() {
  const { theme, setTheme, darkMode, toggleDarkMode, viewMode, setViewMode, undo, redo, history, historyIndex } = useApp();
  const currentThemeColors = getThemeColors(theme);

  const themes = [
    { name: 'Purple', value: 'purple' as const },
    { name: 'Blue', value: 'blue' as const },
    { name: 'Red', value: 'red' as const },
    { name: 'Orange', value: 'orange' as const },
    { name: 'Black', value: 'black' as const }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <h1 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white truncate">
          Email Builder
        </h1>

        {/* Theme Selector - Hidden on small screens */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 hidden lg:inline whitespace-nowrap">Theme:</span>
          {themes.map(t => {
            const colors = getThemeColors(t.value);
            return (
              <button type='button'
                key={t.value}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all flex-shrink-0 ${
                  theme === t.value ? 'border-gray-800 dark:border-white scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: colors.primary }}
                onClick={() => setTheme(t.value)}
                title={t.name}
              />
            );
          })}
          <input
            aria-label="Custom theme color"
            title="Custom theme color"
            type="color"
            value={currentThemeColors.primary}
            onChange={(e) => setTheme(e.target.value as `#${string}`)}
            className="w-6 h-6 p-0 border border-gray-300 dark:border-gray-600 rounded-full cursor-pointer bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:p-1">
          <button
            className={`px-1.5 sm:px-2 lg:px-3 py-1 text-xs lg:text-sm rounded transition-colors ${
              viewMode === 'desktop'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setViewMode('desktop')}
            title="Desktop View"
          >
            <i className="bi bi-laptop"></i>
            <span className="hidden xl:inline ml-1">Desktop</span>
          </button>
          <button
            className={`px-1.5 sm:px-2 lg:px-3 py-1 text-xs lg:text-sm rounded transition-colors ${
              viewMode === 'mobile'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setViewMode('mobile')}
            title="Mobile View"
          >
            <i className="bi bi-phone"></i>
            <span className="hidden xl:inline ml-1">Mobile</span>
          </button>
        </div>

        {/* Undo/Redo - Hidden on extra small screens */}
        <div className="hidden sm:flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </div>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          title={`Switch to ${darkMode ? 'Light' : 'Dark'} Mode`}
        >
          <i className={`bi bi-${darkMode ? 'sun' : 'moon'}`}></i>
        </Button>
      </div>
    </div>
  );
}
