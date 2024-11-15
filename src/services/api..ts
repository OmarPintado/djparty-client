import axios from 'axios';
export const clientApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,  
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 
});

clientApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('AUTH_TOKEN'); 
        console.log('Token:', token);
        config.headers = config.headers || {};
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request Config:', config);  
        return config;
    },
    (error) => {
        console.error('Interceptor Error:', error);
        return Promise.reject(error);
    }
);