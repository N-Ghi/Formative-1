import React, { useState, useEffect } from 'react';
import { inventoryAPI } from '../services/api';

const LowStockAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      console.log('Loading low stock alerts...');
      const response = await inventoryAPI.getAll();
      const inventory = response.data.inventories || response.data;
      
      console.log('All inventory:', inventory);
      
      // Filter items that are at or below restock threshold
      const lowStockItems = Array.isArray(inventory) 
        ? inventory.filter(item => item.quantity <= item.restockValue)
        : [];
      
      console.log('Low stock items:', lowStockItems);
      setAlerts(lowStockItems);
      setError('');
    } catch (err) {
      setError('Failed to load alerts');
      console.error('Error loading alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (item) => {
    return item.productDetails?.name || item.Product?.name || 'Unknown Product';
  };

  const getProductCategory = (item) => {
    return item.productDetails?.category || item.Product?.category || 'Unknown';
  };

  const getProductPrice = (item) => {
    return item.productDetails?.price || item.Product?.price || 0;
  };

  const getUrgencyLevel = (item) => {
    if (item.quantity === 0) return { level: 'Critical', color: '#dc3545' };
    if (item.quantity <= item.restockValue * 0.5) return { level: 'High', color: '#fd7e14' };
    return { level: 'Medium', color: '#ffc107' };
  };

  const getStockStatus = (item) => {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= item.restockValue) return 'Low Stock';
    return 'Below Threshold';
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }} className="fade-in">
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          margin: 0,
          color: '#2563eb'
        }}>
          Low Stock Alerts
        </h2>
        <button
          onClick={loadAlerts}
          className="hover-lift"
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
          }}
        >
          🔄 Refresh Alerts
        </button>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid #ffcdd2',
          boxShadow: '0 4px 12px rgba(198, 40, 40, 0.1)'
        }}>
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#dc2626',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚨</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>
            {alerts.filter(item => item.quantity === 0).length}
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Out of Stock</p>
        </div>
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#ea580c',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>
            {alerts.filter(item => item.quantity > 0 && item.quantity <= item.restockValue * 0.5).length}
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Critical Low</p>
        </div>
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#d97706',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>
            {alerts.filter(item => item.quantity > item.restockValue * 0.5 && item.quantity <= item.restockValue).length}
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Low Stock</p>
        </div>
        <div className="card hover-lift" style={{ 
          padding: '2.5rem', 
          textAlign: 'center',
          background: '#2563eb',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '3rem', fontWeight: '700' }}>{alerts.length}</h3>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500' }}>Total Alerts</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="card fade-in" style={{ 
        overflow: 'hidden'
      }}>
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '1.5rem', 
          borderBottom: '2px solid #e5e7eb',
          fontWeight: '700',
          fontSize: '1.2rem',
          color: '#374151'
        }}>
          🚨 Alert Details ({alerts.length} items need attention)
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading alerts...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <p>Great! No low stock alerts at the moment. All your inventory is well-stocked.</p>
          </div>
        ) : (
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Product</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Current Stock</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Restock Threshold</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Urgency</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Action Needed</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((item) => {
                  const urgency = getUrgencyLevel(item);
                  const status = getStockStatus(item);
                  
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '1rem' }}>
                        <strong>{getProductName(item)}</strong>
                        <br />
                        <small style={{ color: '#6c757d' }}>${getProductPrice(item)}</small>
                      </td>
                      <td style={{ padding: '1rem' }}>{getProductCategory(item)}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          backgroundColor: item.quantity === 0 ? '#dc3545' : '#ffc107',
                          color: item.quantity === 0 ? 'white' : '#212529',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem'
                        }}>
                          {item.quantity}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>{item.restockValue}</td>
                      <td style={{ padding: '1rem' }}>{status}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: urgency.color,
                          color: urgency.color === '#ffc107' ? '#212529' : 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}>
                          {urgency.level}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {item.quantity === 0 ? (
                          <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
                            ⚠️ Immediate restock required!
                          </span>
                        ) : item.quantity <= item.restockValue * 0.5 ? (
                          <span style={{ color: '#fd7e14', fontWeight: 'bold' }}>
                            🔥 Urgent restock needed
                          </span>
                        ) : (
                          <span style={{ color: '#ffc107', fontWeight: 'bold' }}>
                            ⚡ Plan restock soon
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {alerts.length > 0 && (
        <div className="card fade-in" style={{ 
          padding: '2rem', 
          marginTop: '2rem',
          background: '#f0f9ff',
          border: '2px solid #e0f2fe'
        }}>
          <h3 style={{ 
            color: '#0369a1', 
            marginTop: 0,
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            📋 Restock Recommendations
          </h3>
          <ul style={{ color: '#0369a1', margin: 0, paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Prioritize items marked as "Critical" - they are out of stock</li>
            <li style={{ marginBottom: '0.5rem' }}>Items marked as "High" urgency need immediate attention</li>
            <li style={{ marginBottom: '0.5rem' }}>Consider bulk ordering for frequently low-stock items</li>
            <li style={{ marginBottom: '0.5rem' }}>Review and adjust restock thresholds if needed</li>
            <li>Set up automatic reorder points for critical items</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LowStockAlerts;
