import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { useChatStore } from '../store/chatStore';
import { LogOut, Home, Stethoscope, Leaf, Brain } from 'lucide-react';
import Footer from './Footer';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { clearChat } = useChatStore();

  const handleLogout = () => {
    clearChat();
    queryClient.clear();
    logout();
    navigate('/login');
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container">
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-logo" onClick={() => navigate('/')}>
            <div className="nav-logo-icon">
              <Leaf size={18} />
            </div>
            Nirogaverse
          </div>

          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Home size={16} /> Home
            </NavLink>
            <NavLink to="/modules/ayurvaani" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Stethoscope size={16} /> AyurVaani
            </NavLink>
            <NavLink to="/modules/prakriti" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Leaf size={16} /> Prakriti Pratibimbha
            </NavLink>
            <NavLink to="/modules/vaidya" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Brain size={16} /> Vaidya Viveka
            </NavLink>
          </div>

          <div className="nav-user">
            <span className="nav-user-name">{user?.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className={`main-content${isHomePage ? ' full-width' : ''}`}>
        <Outlet />
      </main>

      {isHomePage && <Footer />}
    </div>
  );
}

