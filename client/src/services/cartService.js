import axios from 'axios';
import { getToken } from '../utils/helpers';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await api.post('/cart', { product_id: productId, quantity });
  return response.data.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await api.put(`/cart/${cartItemId}`, { quantity });
  return response.data.data;
};

export const removeCartItem = async (cartItemId) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart');
  return response.data.data;
};
