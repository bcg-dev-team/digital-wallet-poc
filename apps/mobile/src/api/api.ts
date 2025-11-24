import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
