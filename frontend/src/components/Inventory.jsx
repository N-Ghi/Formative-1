import React, { useState, useEffect } from 'react';
import { inventoryAPI, productAPI } from '../services/api';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    quantityMin: '',
    quantityMax: '',
    restockMin: '',
    restockMax: '',
  });
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    restockValue: '',
  });

  useEffect(() => {
    loadInventory();
    loadProducts();
  }, []);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.quantityMin) params.quantityMin = filters.quantityMin;
      if (filters.quantityMax) params.quantityMax = filters.quantityMax;
      if (filters.restockMin) params.restockMin = filters.restockMin;
      if (filters.restockMax) params.restockMax = filters.restockMax;
      
      const response = await inventoryAPI.getAll(params);
      setInventory(response.data.inventories || response.data);
      setError('');
    } catch (err) {
      setError('Failed to load inventory');
      console.error('Error loading inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      console.log('Loading products for inventory...');
      const response = await productAPI.getMine();
      console.log('Products response in inventory:', response);
      
      // Ensure we have an array
      const productsData = response.data;
      if (Array.isArray(productsData)) {
        setProducts(productsData);
      } else if (productsData && Array.isArray(productsData.products)) {
        setProducts(productsData.products);
      } else {
        console.log('Unexpected data structure in inventory:', productsData);
        setProducts([]);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setProducts([]); // Set empty array on error
    }
  };

  useEffect(() => {
    loadInventory();
  }, [filters.quantityMin, filters.quantityMax, filters.restockMin, filters.restockMax]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        quantity: parseInt(formData.quantity),
        restockValue: parseInt(formData.restockValue),
      };
      
      if (editingItem) {
        await inventoryAPI.update(editingItem.id, data);
      } else {
        await inventoryAPI.create(data);
      }
      await loadInventory();
      resetForm();
      setError('');
    } catch (err) {
      setError(`Failed to save inventory item: ${err.response?.data?.message || err.message}`);
      console.error('Error saving inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    console.log('Editing item:', item);
    setEditingItem(item);
    setFormData({
      productId: item.productId || item.Product?.id || item.productDetails?.id || '',
      quantity: item.quantity,
      restockValue: item.restockValue,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      setLoading(true);
      try {
        await inventoryAPI.delete(id);
        await loadInventory();
        setError('');
      } catch (err) {
        setError('Failed to delete inventory item');
        console.error('Error deleting inventory:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      quantity: '',
      restockValue: '',
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const filteredInventory = inventory.filter(item => {
    const product = item.productDetails || item.Product || {};
    const matchesSearch = !filters.search || 
      product.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.category?.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesSearch;
  });

  const getProductName = (item) => {
    return item.productDetails?.name || item.Product?.name || 'Unknown Product';
  };

  const getProductCategory = (item) => {
    return item.productDetails?.category || item.Product?.category || 'Unknown';
  };

  const getProductPrice = (item) => {
    return item.productDetails?.price || item.Product?.price || 0;
  };

  const isLowStock = (item) => {
    return item.quantity <= item.restockValue;
  };

  // Add error boundary-like protection
  if (error && error.includes('Failed to load')) {
    return (
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Error Loading Inventory</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{error}</p>
        <button 
          onClick={loadInventory}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }} className="fade-in">
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          margin: 0,
          color: '#2563eb'
        }}>
          Inventory Management
        </h2>
        <button
          onClick={() => {
            console.log('Add button clicked');
            setShowForm(true);
          }}
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
          ➕ Add Inventory Item
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

      {/* Filters */}
      <div className="card fade-in" style={{ 
        padding: '2rem', 
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#374151'
        }}>
          🔍 Filters
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label>Search Products</label>
            <input
              type="text"
              placeholder="Search by product name or category..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Min Quantity</label>
            <input
              type="number"
              value={filters.quantityMin}
              onChange={(e) => setFilters({ ...filters, quantityMin: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Max Quantity</label>
            <input
              type="number"
              value={filters.quantityMax}
              onChange={(e) => setFilters({ ...filters, quantityMax: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Min Restock Value</label>
            <input
              type="number"
              value={filters.restockMin}
              onChange={(e) => setFilters({ ...filters, restockMin: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Max Restock Value</label>
            <input
              type="number"
              value={filters.restockMax}
              onChange={(e) => setFilters({ ...filters, restockMax: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
        </div>
      </div>

      {/* Inventory Form */}
      {showForm && (
        <div className="card fade-in" style={{ 
          padding: '3rem', 
          marginBottom: '3rem'
        }}>
          <h3 style={{ 
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: '0 0 2rem 0',
            color: '#374151'
          }}>
            {editingItem ? '✏️ Edit Inventory Item' : '➕ Add New Inventory Item'}
          </h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Products available: {Array.isArray(products) ? products.length : 'Loading...'}
          </p>
          
          {!Array.isArray(products) || products.length === 0 ? (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              background: '#fef3c7', 
              borderRadius: '8px',
              border: '1px solid #f59e0b'
            }}>
              <p style={{ color: '#92400e', margin: 0 }}>
                ⚠️ No products available. Please add some products first before creating inventory items.
              </p>
              <button 
                onClick={() => window.location.href = '/products'}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                Go to Products
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label>Product *</label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                  >
                    <option value="">Select a product</option>
                    {Array.isArray(products) && products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ${product.price}
                      </option>
                    ))}
                  </select>
                </div>
              <div>
                <label>Current Quantity *</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div>
                <label>Restock Threshold *</label>
                <input
                  type="number"
                  value={formData.restockValue}
                  onChange={(e) => setFormData({ ...formData, restockValue: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {loading ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
          )}
        </div>
      )}

      {/* Inventory List */}
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
          📋 Inventory Items ({filteredInventory.length})
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading inventory...</p>
          </div>
        ) : filteredInventory.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <p>No inventory items found. {filters.search ? 'Try adjusting your search.' : 'Add your first inventory item!'}</p>
          </div>
        ) : (
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Product</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Price</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Quantity</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Restock Threshold</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '1rem' }}>{getProductName(item)}</td>
                    <td style={{ padding: '1rem' }}>{getProductCategory(item)}</td>
                    <td style={{ padding: '1rem' }}>${getProductPrice(item)}</td>
                    <td style={{ padding: '1rem' }}>{item.quantity}</td>
                    <td style={{ padding: '1rem' }}>{item.restockValue}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        backgroundColor: isLowStock(item) ? '#dc3545' : '#28a745',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        {isLowStock(item) ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          backgroundColor: '#ffc107',
                          color: '#212529',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '0.5rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
