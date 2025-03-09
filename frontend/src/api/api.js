import axios from "axios";

const API = axios.create({
  baseURL: "/api",  // Use relative API path (Netlify will redirect)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  
});

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
  (error) => Promise.reject(error)
);

export default API;
