/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AppHeader = ({ toggleTheme, isDarkMode, Icon }) => {
  // Mock user authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const firstInitial = user ? user.username.charAt(0).toUpperCase() : "";

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout(navigate);
  };

  // Function to mock login for demonstration purposes
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/80 shadow-md transition-colors duration-500 border-b border-gray-200 dark:border-slate-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Dashboard Title */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">
            {/* Javis Dashboard */}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? "Light Mode" : "Dark Mode"}`}
            className="p-2 rounded-full text-slate-800 dark:text-white hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-slate-700 transition-colors duration-300"
          >
            <Icon className="w-6 h-6" />
          </button>

          {/* User Avatar and Dropdown */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-sky-300 dark:ring-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-400 dark:focus:ring-sky-600 transition-all duration-200"
                aria-label="User menu"
                aria-expanded={isMenuOpen}
              >
                {firstInitial}
              </button>

              {/* Dropdown Menu (Logout) */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-2xl py-1 ring-1 dark:ring-black ring-amber-50 ring-opacity-5 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-slate-600">
                    Signed in as{" "}
                    <span className="font-semibold block truncate">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-600 transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Mock Login Button
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors duration-200 shadow-md"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
