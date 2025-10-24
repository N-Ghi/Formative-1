import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="fade-in" style={{ 
      maxWidth: '450px', 
      margin: '2rem auto', 
      padding: '3rem'
    }}>
      <div className="card" style={{ padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            margin: '0 0 0.5rem 0',
            color: '#2563eb'
          }}>
            Welcome Back
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>Sign in to your account</p>
        </div>
        
        {error && (
          <div style={{ 
            backgroundColor: '#ffebee', 
            color: '#c62828', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="hover-lift"
            style={{ 
              width: '100%', 
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div className="spinner"></div>
                Logging in...
              </div>
            ) : 'Sign In'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#666', margin: 0 }}>
            Don't have an account?{' '}
            <button 
              onClick={onToggle} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#2563eb', 
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline'
              }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
