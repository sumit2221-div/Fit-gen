import axios from "axios";
axios.defaults.withCredentials = true;


const API = axios.create({
  baseURL: "https://fit-gen-rczl.onrender.com/api",  // Ensure the correct base URL for your backend
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
