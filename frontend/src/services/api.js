import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Product API
export const productAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/get/${id}`),
  getMine: () => api.get('/products/mine'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/update/${id}`, data),
  delete: (id) => api.delete(`/products/delete/${id}`),
};

// Inventory API
export const inventoryAPI = {
  getAll: (params = {}) => api.get('/inventory', { params }),
  getById: (id) => api.get(`/inventory/get/${id}`),
  create: (data) => api.post('/inventory', data),
  update: (id, data) => api.put(`/inventory/update/${id}`, data),
  delete: (id) => api.delete(`/inventory/delete/${id}`),
};

export default api;
