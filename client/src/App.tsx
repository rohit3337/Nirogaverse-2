import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AyurVaaniPage from './pages/AyurVaaniPage';
import PrakritiPratibimbaPage from './pages/PrakritiPratibimbaPage';
import VaidyaVivekaPage from './pages/VaidyaVivekaPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="chat" element={<Navigate to="/modules/ayurvaani" replace />} />
          <Route path="modules/ayurvaani" element={<AyurVaaniPage />} />
          <Route path="modules/prakriti" element={<PrakritiPratibimbaPage />} />
          <Route path="modules/vaidya" element={<VaidyaVivekaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
