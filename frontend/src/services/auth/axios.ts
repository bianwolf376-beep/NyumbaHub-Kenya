import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:3001/api',

  timeout: 30000,

  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token =
        localStorage.getItem('access_token');

      if (token) {
        config.headers = config.headers ?? {};

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (
      typeof window !== 'undefined' &&
      error.response?.status === 401
    ) {
      localStorage.removeItem('access_token');

      if (
        !window.location.pathname.startsWith('/login')
      ) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;