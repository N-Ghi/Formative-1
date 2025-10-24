import React from 'react';

const Sidebar = ({ currentPage, onPageChange, visible = true }) => {
  const menuItems = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'inventory', label: 'Inventory', icon: '📋' },
    { id: 'alerts', label: 'Low Stock Alerts', icon: '⚠️' },
  ];

  return (
    <aside style={{
      width: '250px',
      height: '100vh',
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderTop: 'none',
      position: 'fixed',
      left: visible ? '0' : '-250px',
      top: '0',
      zIndex: 999,
      paddingTop: '80px', // Account for the header height
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
      transition: 'left 0.3s ease'
    }}>
      <nav style={{ padding: '2rem 0' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {menuItems.map(item => (
            <li key={item.id} style={{ marginBottom: '0.5rem' }}>
              <button
                onClick={() => onPageChange(item.id)}
                className="hover-lift"
                style={{
                  width: '100%',
                  background: currentPage === item.id ? '#2563eb' : 'transparent',
                  color: currentPage === item.id ? 'white' : '#374151',
                  border: 'none',
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontWeight: '600',
                  fontSize: '1rem',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  borderRight: currentPage === item.id ? '4px solid #1d4ed8' : '4px solid transparent'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
