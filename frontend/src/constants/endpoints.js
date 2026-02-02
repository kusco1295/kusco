// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ADMIN_ENDPOINTS = {
  SIGNUP: '/admin/signup',
  LOGIN: '/admin/login',
  GET_ME: '/admin/me',
};

export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin',
  ADMIN_SIGNUP: '/admin/signup',
  ADMIN_DASHBOARD: '/admin/dashboard',
};
