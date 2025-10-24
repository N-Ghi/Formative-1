import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { productAPI, inventoryAPI } from '../services/api';

const Dashboard = ({ onPageChange }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInventory: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      console.log('Loading dashboard stats...');
      const [productsResponse, inventoryResponse] = await Promise.all([
        productAPI.getMine(),
        inventoryAPI.getAll(),
      ]);
      
      console.log('Products response:', productsResponse);
      console.log('Inventory response:', inventoryResponse);

      // Ensure we have arrays
      const productsData = productsResponse.data;
      const inventoryData = inventoryResponse.data.inventories || inventoryResponse.data;
      
      const products = Array.isArray(productsData) ? productsData : (Array.isArray(productsData?.products) ? productsData.products : []);
      const inventory = Array.isArray(inventoryData) ? inventoryData : [];
      
      const lowStockItems = inventory.filter(item => item.quantity <= item.restockValue && item.quantity > 0);
      const outOfStockItems = inventory.filter(item => item.quantity === 0);

      console.log('Dashboard stats:', { products, inventory, lowStockItems, outOfStockItems });

      setStats({
        totalProducts: products.length,
        totalInventory: inventory.length,
        lowStockItems: lowStockItems.length,
        outOfStockItems: outOfStockItems.length,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }} className="fade-in">
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700', 
          margin: '0 0 1rem 0',
          color: '#2563eb'
        }}>
          Dashboard
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1.2rem', 
          margin: 0,
          fontWeight: '500'
        }}>
          Welcome back, <strong style={{ color: '#374151' }}>{user?.firstName} {user?.lastName}</strong>! Here's your inventory overview.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#2563eb',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>
            {loading ? <div className="spinner" style={{ margin: '0 auto' }}></div> : stats.totalProducts}
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Total Products</p>
        </div>
        
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#1d4ed8',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>
            {loading ? <div className="spinner" style={{ margin: '0 auto' }}></div> : stats.totalInventory}
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Inventory Items</p>
        </div>
        
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#7c3aed',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>
            {loading ? <div className="spinner" style={{ margin: '0 auto' }}></div> : stats.lowStockItems}
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Low Stock Items</p>
        </div>
        
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#dc2626',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>
            {loading ? <div className="spinner" style={{ margin: '0 auto' }}></div> : stats.outOfStockItems}
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Out of Stock</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card fade-in" style={{ 
        padding: '3rem', 
        marginBottom: '3rem'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '2rem',
          fontSize: '2rem',
          fontWeight: '700',
          color: '#374151'
        }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div 
            className="hover-lift" 
            onClick={() => onPageChange('products')}
            style={{ 
              padding: '2rem', 
              borderRadius: '16px',
              textAlign: 'center',
              background: '#ffffff',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>Manage Products</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '1rem', lineHeight: '1.5' }}>
              Add, edit, or delete products in your catalog
            </p>
          </div>
          
          <div 
            className="hover-lift" 
            onClick={() => onPageChange('inventory')}
            style={{ 
              padding: '2rem', 
              borderRadius: '16px',
              textAlign: 'center',
              background: '#ffffff',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>Update Inventory</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '1rem', lineHeight: '1.5' }}>
              Track quantities and set restock thresholds
            </p>
          </div>
          
          <div 
            className="hover-lift" 
            onClick={() => onPageChange('alerts')}
            style={{ 
              padding: '2rem', 
              borderRadius: '16px',
              textAlign: 'center',
              background: '#ffffff',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>Check Alerts</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '1rem', lineHeight: '1.5' }}>
              Review low stock and out-of-stock items
            </p>
          </div>
          
          <div 
            className="hover-lift" 
            onClick={() => onPageChange('inventory')}
            style={{ 
              padding: '2rem', 
              borderRadius: '16px',
              textAlign: 'center',
              background: '#ffffff',
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>Search & Filter</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '1rem', lineHeight: '1.5' }}>
              Find products and filter by stock levels
            </p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card fade-in" style={{ 
        padding: '3rem',
        background: '#ffffff',
        border: '2px solid #e5e7eb'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '2rem',
          fontSize: '2rem',
          fontWeight: '700',
            color: '#374151'
        }}>
          System Status
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            background: '#10b981',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
          }}></div>
          <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>All systems operational</span>
        </div>
        <p style={{ 
          margin: 0, 
          color: '#666', 
          fontSize: '1rem', 
          lineHeight: '1.6',
          fontWeight: '500'
        }}>
          Your inventory management system is running smoothly. Use the navigation above to access different features and manage your inventory effectively.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
