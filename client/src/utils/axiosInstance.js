import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_baseURL,  
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to include token from localStorage if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle errors consistently
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Request error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;