import axios from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_baseURL,  
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`,
    },
});

export default axiosInstance;