import axios from "axios";
import { API_BASE_URL } from "./config"; // Import the AuthContext type

export const api = axios.create({
  baseURL: API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if user is authenticated
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchNewsFeed = async () => {
  const response = await api.get("/newsfeed");
  return response.data;
};

export default api;
