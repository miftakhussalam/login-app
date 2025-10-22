import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8080";

axios.defaults.withCredentials = true;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/verifyToken`);

        if (response.status === 200 && response.data?.data?.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(
          "verification session failed:",
          error?.response?.data?.message || error.message
        );
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  if (isLoading) {
    // Tampilkan animasi loading saat menunggu verifikasi API
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-lg text-gray-700">Memverifikasi sesi...</p>
      </div>
    );
  }

  // Jika autentikasi sukses, tampilkan halaman yang dilindungi (Dashboard)
  if (isAuthenticated) {
    return children;
  }

  // Jika autentikasi gagal (token tidak valid/hilang), redirect ke halaman Login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
