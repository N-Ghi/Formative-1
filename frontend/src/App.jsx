import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Inventory from './components/Inventory';
import LowStockAlerts from './components/LowStockAlerts';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#6c757d'
      }}>
        Loading...
      </div>
    );
  }

  if (user) {
    // Get current page from URL path
    const getCurrentPage = () => {
      const path = location.pathname;
      if (path === '/products') return 'products';
      if (path === '/inventory') return 'inventory';
      if (path === '/alerts') return 'alerts';
      return 'dashboard';
    };

    const currentPage = getCurrentPage();

    const handlePageChange = (pageId) => {
      // Navigate using React Router
      navigate(`/${pageId === 'dashboard' ? '' : pageId}`);
    };

    return (
      <div>
        <Navigation 
          onPageChange={handlePageChange} 
          sidebarVisible={sidebarVisible}
          onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        />
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
          visible={sidebarVisible}
        />
        <main style={{ 
          marginLeft: sidebarVisible ? '250px' : '0', // Account for sidebar width
          padding: '2rem',
          minHeight: 'calc(100vh - 80px)', // Account for header height
          marginTop: '80px', // Account for fixed header
          transition: 'margin-left 0.3s ease'
        }}>
          <Routes>
            <Route path="/" element={<Dashboard onPageChange={handlePageChange} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/alerts" element={<LowStockAlerts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  return isLogin ? (
    <LoginForm onToggle={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onToggle={() => setIsLogin(true)} />
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;