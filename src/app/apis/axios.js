import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  mode: 'cors',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token') || '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;