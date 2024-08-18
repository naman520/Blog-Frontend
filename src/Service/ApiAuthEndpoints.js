import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:3000/',
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('Request URL:', config.url);  // Add this log
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const get = (url) => instance.get(url);
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);