// Pastikan Anda sudah menginstal: npm install react-router-dom axios
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; // Asumsi file login
import DashboardPage from './pages/dashboard'; // Komponen Dashboard Anda
import ProtectedRoute from './components/protectedRoute'; // Komponen yang baru dibuat

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login (Tidak dilindungi) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} /> {/* Route utama ke login */}

        {/* Halaman Dashboard (Dilindungi) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Tambahkan rute 404 jika diperlukan */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;