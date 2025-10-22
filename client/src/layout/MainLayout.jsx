import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import Footer from "../components/Footer";
import AppHeader from "../components/Header";

function MainLayout() {
  const location = useLocation();
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-black text-black dark:text-sky-500 relative overflow-hidden transition-colors duration-500">
      {location.pathname !== "/login" && (
        <AppHeader
          theme={theme}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          Icon={Icon}
        />
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
