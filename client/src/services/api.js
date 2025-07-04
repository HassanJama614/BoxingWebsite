import axios from 'axios';

const api = axios.create({
    // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
    baseURL: 'https://boxingly-api.onrender.com/api', // Default base URL
});

// Interceptor to add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;