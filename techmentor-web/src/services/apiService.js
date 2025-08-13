// src/services/apiService.js
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import StorageService from "./storageService";
import { triggerLogout } from "../contexts/authHandler";

const ApiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiClient.interceptors.request.use(
  (config) => {
    console.log("Adding Bearer token to request");
    const token = StorageService.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Bearer token added");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("API error:", error);
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = StorageService.get("refreshToken");
        const userId = StorageService.get("userId");

        if (!refreshToken || !userId) {
          return Promise.reject(error);
        }

        const res = await axios.post(`${baseUrl}/auth/refresh`, {
          id: userId,
          token: refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        StorageService.save("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiClient(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        StorageService.clearAll();
        await triggerLogout();
        window.alert("Session Expired. Please log in again.");
        return Promise.reject(err);
      }
    }

    window.alert("An unexpected error occurred.");
    return Promise.reject(error);
  }
);

export default ApiClient;
