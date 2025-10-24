import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = ({ onPageChange, sidebarVisible, onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ 
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <button
          onClick={onToggleSidebar}
          title={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '3px',
            width: '20px',
            height: '16px'
          }}>
            <div style={{ 
              width: '100%', 
              height: '2px', 
              backgroundColor: '#2563eb',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: sidebarVisible ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></div>
            <div style={{ 
              width: '100%', 
              height: '2px', 
              backgroundColor: '#2563eb',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              opacity: sidebarVisible ? '0' : '1'
            }}></div>
            <div style={{ 
              width: '100%', 
              height: '2px', 
              backgroundColor: '#2563eb',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: sidebarVisible ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}></div>
          </div>
        </button>
        <h1 
          onClick={() => onPageChange('dashboard')}
          style={{ 
            margin: 0, 
            fontSize: '1.8rem', 
            fontWeight: '700',
            color: '#2563eb',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.color = '#2563eb'}
        >
          Inventory Manager
        </h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '0.75rem 1.5rem',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '2px solid #e5e7eb'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '16px'
          }}>
            {user?.firstName?.[0]?.toUpperCase()}
          </div>
          <span style={{ fontWeight: '600', color: '#374151' }}>
            Welcome, {user?.firstName}!
          </span>
        </div>
        <button
          onClick={logout}
          className="hover-lift"
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
