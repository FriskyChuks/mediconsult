import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    // other custom settings
});

api.interceptors.response.use(
    response => response, 
    error => {
        if (error.response && error.response.status === 401) {
            // Clear local storage
            localStorage.clear()
            localStorage.removeItem('user_id');
            localStorage.removeItem('email');
            localStorage.removeItem('phone');
            localStorage.removeItem('phone');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
            // Optionally redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
