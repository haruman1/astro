import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE_URL,
  withCredentials: true, // 🔥 HttpOnly cookie ikut
});

/**
 * ===============================
 * REFRESH QUEUE STATE
 * ===============================
 */
let isRefreshing = false;

let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

function processQueue(error: unknown) {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(true);
  });
  failedQueue = [];
}

/**
 * ===============================
 * REQUEST INTERCEPTOR
 * ===============================
 * ❌ Tidak inject Authorization
 * ✅ Cookie otomatis dikirim
 */
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ===============================
 * RESPONSE INTERCEPTOR
 * ===============================
 * Auto refresh via HttpOnly cookie
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    // ❌ bukan auth error
    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 🔁 jika refresh sedang jalan → antri
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      // 🔥 refresh token diambil backend dari HttpOnly cookie
      await api.post('/auth/refresh');

      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      /**
       * 🚫 JANGAN redirect ke /login
       * Ini apps login sendiri
       */
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
