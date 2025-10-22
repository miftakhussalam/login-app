import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8080";
axios.defaults.withCredentials = true;

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-4xl font-extrabold text-blue-700">
            🎉 Dashboard Utama
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            Keluar (Logout)
          </button>
        </div>

        {/* Konten Utama */}
        <p className="text-xl text-gray-700 mb-6">
          Anda berhasil masuk! Halaman ini adalah rute yang dilindungi.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-blue-700">
            Akses ke halaman ini dimungkinkan karena **JWT** yang tersimpan di
            *HttpOnly Cookie* Anda terverifikasi oleh *middleware* Express.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
