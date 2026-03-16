import axios from 'axios';

const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl) {
        // Ensure the URL ends with /api
        return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
    }
    return '/api'; // Fallback for local dev proxy
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;
