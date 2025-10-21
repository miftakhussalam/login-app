import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

// Konfigurasi axios agar mengirim cookie (penting!)
axios.defaults.withCredentials = true;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Panggil endpoint yang dilindungi di backend
        const response = await axios.get("/api/verify-token");

        if (response.status === 200 && response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Jika request gagal (misal: 401/403 dari middleware protect)
        console.error("Verifikasi token gagal:", error.response.data.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
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
