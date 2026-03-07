import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api', // Use Vite env var in production, default to /api for local Vite proxy
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;
