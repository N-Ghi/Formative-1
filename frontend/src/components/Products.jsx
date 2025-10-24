import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';

const Products = () => {
  console.log('Products component rendering...');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      console.log('Loading products...');
      const response = await productAPI.getMine();
      console.log('Products response:', response);
      
      // Ensure we have an array
      const productsData = response.data;
      if (Array.isArray(productsData)) {
        setProducts(productsData);
      } else if (productsData && Array.isArray(productsData.products)) {
        setProducts(productsData.products);
      } else {
        console.log('Unexpected data structure:', productsData);
        setProducts([]);
      }
      
      setError('');
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, formData);
      } else {
        await productAPI.create(formData);
      }
      await loadProducts();
      resetForm();
      setError('');
    } catch (err) {
      setError('Failed to save product');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await productAPI.delete(id);
        await loadProducts();
        setError('');
      } catch (err) {
        setError('Failed to delete product');
        console.error('Error deleting product:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const filteredProducts = (products && Array.isArray(products)) 
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Add error boundary-like protection
  if (error && error.includes('Failed to load')) {
    return (
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Error Loading Products</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{error}</p>
        <button 
          onClick={loadProducts}
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
          Products Management
        </h2>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          Status: {loading ? 'Loading...' : error ? 'Error' : 'Ready'} | Products: {Array.isArray(products) ? products.length : 'Invalid'}
        </div>
        <button
          onClick={() => {
            console.log('Add product button clicked');
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
          ➕ Add New Product
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

      {/* Search */}
      <div style={{ marginBottom: '2rem' }} className="fade-in">
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="🔍 Search products by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1rem 1rem 1rem 3rem',
              fontSize: '1rem',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          />
          <div style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666',
            fontSize: '1.2rem'
          }}>
            🔍
          </div>
        </div>
      </div>

      {/* Product Form */}
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
            {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div>
                <label>Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div>
                <label>Price *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
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
                {loading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
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
        </div>
      )}

      {/* Products List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        overflow: 'hidden',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1rem', 
          borderBottom: '1px solid #dee2e6',
          fontWeight: 'bold'
        }}>
          Products ({filteredProducts.length})
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
            No products found. {searchTerm ? 'Try adjusting your search.' : 'Add your first product!'}
          </div>
        ) : (
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Price</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Description</th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '1rem' }}>{product.name}</td>
                    <td style={{ padding: '1rem' }}>{product.category}</td>
                    <td style={{ padding: '1rem' }}>${product.price}</td>
                    <td style={{ padding: '1rem' }}>{product.description || 'No description'}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEdit(product)}
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
                        onClick={() => handleDelete(product.id)}
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

export default Products;
