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

export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data.product;
};
