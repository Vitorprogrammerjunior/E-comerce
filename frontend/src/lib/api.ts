import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API functions
export const apiClient = {
  // Products
  getProducts: (params?: Record<string, unknown>) => api.get('/products', { params }),
  getProduct: (id: string) => api.get(`/products/${id}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories'),

  // Auth
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: { name: string }) => api.put('/auth/profile', data),

  // Cart
  getCart: () => api.get('/cart'),
  addToCart: (item: { productId: number; quantity: number; price: number; name: string; image?: string }) => 
    api.post('/cart', item),
  updateCartItem: (productId: number, quantity: number) => 
    api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId: number) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart'),

  // Orders
  createOrder: (orderData: {
    items: Array<{
      productId: number;
      quantity: number;
      price: number;
    }>;
    total: number;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    paymentMethod: string;
  }) => api.post('/orders', orderData),
  getOrders: () => api.get('/orders'),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  cancelOrder: (id: string) => api.put(`/orders/${id}/cancel`),
  trackOrder: (id: string) => api.get(`/orders/${id}/tracking`),
};

export default api;
