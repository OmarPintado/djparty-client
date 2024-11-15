import axios from 'axios';
export const clientApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,  
    headers: {
        'Content-Type': 'application/json'
    },
});

clientApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AUTH_TOKEN'); 
        config.headers = config.headers || {};
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        console.error('Interceptor Error:', error);
        return Promise.reject(error);
    }
);