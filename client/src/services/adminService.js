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

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data.data;
};

export const getAllOrdersAdmin = async () => {
  const response = await api.get('/admin/orders');
  return response.data.data.orders;
};

export const updateOrderStatusAdmin = async (orderId, status) => {
  await api.put(`/admin/orders/${orderId}/status`, { status });
};

export const getAdminProducts = async () => {
  const response = await api.get('/admin/products');
  return response.data.data;
};

export const createProductAdmin = async (product) => {
  const response = await api.post('/admin/products', product);
  return response.data.data;
};

export const updateProductAdmin = async (id, product) => {
  await api.put(`/admin/products/${id}`, product);
};

export const deleteProductAdmin = async (id) => {
  await api.delete(`/admin/products/${id}`);
};
