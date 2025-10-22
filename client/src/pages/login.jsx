import { useState, useContext, useEffect } from "react";
import { LogIn, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login, user } = useContext(AuthContext);

  console.log('login', user);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const validateForm = () => {
    if (!identifier || !password) {
      setMessage({
        type: "error",
        text: "Email/Username and Password are required.",
      });
      return false;
    }

    if (identifier.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setMessage({ type: "error",  text: "Invalid email format." });
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

    try {
      await login(identifier, password);
      setMessage({
        type: "success",
        text: "Login successful! Redirecting to dashboard...",
      });
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Invalid username/email or password.",
      });
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
        {Icon && <Icon className="w-5 h-5 mr-3" />}
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-950 bg-gray-50 p-4 font-sans antialiased">
      <div className="w-full max-w-md dark:bg-slate-900 dark:border-cyan-800 bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 transition-all duration-500 hover:shadow-3xl">
        <h2 className="text-3xl font-extrabold text-center dark:text-white text-sky-900 mb-8 flex items-center justify-center">
          {/* <LogIn className="w-8 h-8 mr-3 dark:text-white text-blue-600" /> */}
          Welcome Back!
        </h2>

        <MessageDisplay type={message.type} text={message.text} />

        <form onSubmit={handleSubmit}>
          {/* Email/Username Field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
              htmlFor="identifier"
            >
              Email or Username
            </label>
            <input
              className="placeholder-gray-400 shadow-inner appearance-none border border-gray-300 dark:border-cyan-800 rounded-xl w-full py-4 px-5 text-gray-800 dark:text-gray-50 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-slate-800 dark:focus:border-cyan-500 transition duration-200"
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
              className="block text-gray-700 dark:text-white text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="placeholder-gray-400 shadow-inner appearance-none border border-gray-300 dark:border-cyan-800 rounded-xl w-full py-4 px-5 text-gray-800 dark:text-gray-50 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:focus:ring-slate-800 dark:focus:border-cyan-500 pr-12 transition duration-200"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Input your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-7 flex items-center px-4 text-gray-500 dark:text-gray-200 hover:text-blue-600 transition duration-150 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 hover:cursor-pointer" />
              ) : (
                <Eye className="w-5 h-5 hover:cursor-pointer" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-between">
            <button
              className={`hover:cursor-pointer w-full text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 transform ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.03] shadow-lg"
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

export default LoginPage;
