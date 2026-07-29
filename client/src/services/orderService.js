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

export const placeOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/orders');
  return response.data.data.orders;
};
