import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
