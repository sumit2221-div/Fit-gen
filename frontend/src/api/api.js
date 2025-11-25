import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "https://fit-gen-rczl.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  }
});

// Attach access token from localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
