// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication when app loads
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/verifyToken`, {
          withCredentials: true,
        });

        setUser(res.data.data.user);
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (identifier, password) => {
    const res = await axios.post(
      `${API_URL}/users/signin`,
      { identifier, password },
      { withCredentials: true }
    );
    setUser(res.data.data);
  };

  const logout = async () => {
    await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
