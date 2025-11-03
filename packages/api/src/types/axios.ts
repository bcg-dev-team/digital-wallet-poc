import type { AxiosError, AxiosRequestConfig } from 'axios';

// axios 타입들도 export
export type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// 인터셉터가 response.data를 반환하는 커스텀 axios 인스턴스 타입
export interface CustomAxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
}

/**
 * 토큰을 반환하는 함수 타입
 * 각 앱에서 인증 토큰을 제공하는 방식으로 구현
 */
export type TokenResolver = () => string | Promise<string> | undefined;

/**
 * 에러 처리를 담당하는 함수 타입
 * 각 앱에서 에러 상황에 맞는 처리를 구현
 * 토큰 갱신 후 원래 요청을 재시도하는 경우 Promise<any>를 반환할 수 있음
 */
export type ErrorHandler = (error: AxiosError) => Promise<any> | void;
