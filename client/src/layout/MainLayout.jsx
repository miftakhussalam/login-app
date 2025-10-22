import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Moon, Sun } from 'lucide-react'; 
import Footer from "../components/Footer";
function MainLayout() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const isDarkMode = theme === "dark";
  const Icon = isDarkMode ? Sun : Moon;
  const buttonLabel = isDarkMode ? "Light Mode" : "Dark Mode";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-black text-black dark:text-sky-500 relative overflow-hidden transition-colors duration-500">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${buttonLabel}`}
          className="hover:cursor-pointer flex items-center space-x-2 p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xl
                     hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
        >
          <Icon className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">{buttonLabel}</span>
        </button>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
