import React, { useState } from "react";
import { LogIn, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8080";

const App = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!identifier || !password) {
      setMessage({
        type: "error",
        text: "Email/Username dan Password wajib diisi.",
      });
      return false;
    }

    if (identifier.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setMessage({ type: "error", text: "Format email tidak valid." });
        return false;
      }
    }

    setMessage({ type: "", text: "" });
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    const loginPayload = {
      identifier,
      password,
    };

    try {
      const response = await axios.post(
        `${API_URL}/users/signin`,
        loginPayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      setMessage({
        type: "success",
        text: "Login successful! Redirecting to dashboard...",
      });

      localStorage.setItem("token", JSON.stringify(response?.data?.data?.token || ""));
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage({
            type: "error",
            text: "Invalid username/email or password.",
          });
        } else {
          setMessage({
            type: "error",
            text: `Server error (${error.response.status}): ${
              error.response.data?.message || "Please try again later."
            }`,
          });
        }
      } else if (error.request) {
        setMessage({
          type: "error",
          text: `No response from server at ${API_URL}. Check if it's running or blocked by CORS.`,
        });
      } else {
        setMessage({
          type: "error",
          text: "Unexpected error while setting up request.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const MessageDisplay = ({ type, text }) => {
    if (!text) return null;
    const baseClasses =
      "p-4 mb-6 rounded-lg font-medium flex items-center shadow-md";
    let styleClasses = "";
    let Icon = null;

    if (type === "error") {
      styleClasses = "bg-red-100 text-red-700 border border-red-300";
      Icon = AlertTriangle;
    } else if (type === "success") {
      styleClasses = "bg-green-100 text-green-700 border border-green-300";
      Icon = LogIn;
    }

    return (
      <div className={`${baseClasses} ${styleClasses}`} role="alert">
        {Icon && <Icon className="w-5 h-5 mr-3 flex-shrink-0" />}
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 transition-all duration-500 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 flex items-center justify-center">
          <LogIn className="w-8 h-8 mr-3 text-blue-600" />
          Welcome Back
        </h2>

        <MessageDisplay type={message.type} text={message.text} />

        <form onSubmit={handleSubmit}>
          {/* Email/Username Field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="identifier"
            >
              Email or Username
            </label>
            <input
              className="placeholder-gray-400 shadow-inner appearance-none border border-gray-300 rounded-xl w-full py-4 px-5 text-gray-800 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition duration-200"
              id="identifier"
              type="text"
              placeholder="Enter your email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="mb-8 relative">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="placeholder-gray-400 shadow-inner appearance-none border border-gray-300 rounded-xl w-full py-4 px-5 text-gray-800 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pr-12 transition duration-200"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="input your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-7 flex items-center px-4 text-gray-500 hover:text-blue-600 transition duration-150 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-between">
            <button
              className={`w-full text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] shadow-lg shadow-blue-500/50"
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging In...
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
