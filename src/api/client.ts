import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';
import { ApiError } from './errors';

const cookies = new Cookies();

export const apiClient = axios.create({
  baseURL: '/web',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = cookies.get('userAccessToken') as string | undefined;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = cookies.get('userRefreshToken') as string | undefined;

      if (!refreshToken) {
        isRefreshing = false;
        window.location.href = './';
        return Promise.reject(new ApiError('Session expired', 401));
      }

      try {
        const { data } = await axios.post('/web/token', {
          refresh_token: refreshToken,
        });
        cookies.set('userAccessToken', data.accessToken, { path: '/' });
        cookies.set('userRefreshToken', data.refreshToken, { path: '/' });
        processQueue(null, data.accessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        cookies.remove('userAccessToken', { path: '/' });
        cookies.remove('userRefreshToken', { path: '/' });
        cookies.remove('userName', { path: '/' });
        cookies.remove('userRole', { path: '/' });
        window.location.href = './';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message = error.response?.data?.message ?? error.message ?? 'Request failed';
    const status = error.response?.status ?? 500;
    return Promise.reject(new ApiError(message, status));
  },
);

export { cookies };
