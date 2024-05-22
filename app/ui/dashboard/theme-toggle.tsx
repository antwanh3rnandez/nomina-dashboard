// components/ThemeToggle.tsx
import { useTheme } from "@/app/lib/context-theme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="mr-2 rounded-md border border-gray-300 dark:bg-white bg-gray-600 p-2 shadow-sm transition-all duration-400"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-gray-50" />
      ) : (
        <SunIcon className="h-6 w-6 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
