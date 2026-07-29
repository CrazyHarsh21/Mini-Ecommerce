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

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data.data;
};
