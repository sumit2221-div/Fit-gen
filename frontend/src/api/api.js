import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "https://fit-gen-fbwd.onrender.com",  // Your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  
});

// Add request interceptor
API.interceptors.request.use(
  (config) => {
    
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export API instance
export default API;
