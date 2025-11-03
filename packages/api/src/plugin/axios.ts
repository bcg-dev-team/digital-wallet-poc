import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { TokenResolver, ErrorHandler, CustomAxiosInstance } from '../types';
// 토큰, 라우터, 알람 등은 각 앱의 구현체에서 주입 또는 커스텀 가능하도록

export function createAxiosInstance(
  tokenResolver?: TokenResolver,
  errorHandler?: ErrorHandler
): CustomAxiosInstance {
  const instance = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
  });

  // Request: 토큰 삽입
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (tokenResolver) {
        const token = await tokenResolver();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error: AxiosError) => {
      if (errorHandler) {
        await errorHandler(error);
      }
      return Promise.reject(error);
    }
  );
  return instance as CustomAxiosInstance;
}
