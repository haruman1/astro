import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE_URL,
  withCredentials: true, // 🔥 WAJIB agar cookie terkirim
});

/**
 * ===============================
 * REFRESH QUEUE STATE
 * ===============================
 */
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}[] = [];

function processQueue(error: any) {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve();
  });
  failedQueue = [];
}

/**
 * ===============================
 * REQUEST INTERCEPTOR
 * ===============================
 * ❌ Tidak ambil token
 * ❌ Tidak set Authorization header
 * ✅ Cookie HttpOnly otomatis ikut
 */
api.interceptors.request.use(
  (config) => {
    console.log('[API] Request dengan HttpOnly Cookie');
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ===============================
 * RESPONSE INTERCEPTOR
 * ===============================
 * Auto refresh via cookie
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // bukan error auth → lempar
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // kalau refresh sedang jalan → antri
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      console.log('[API] Refresh token via HttpOnly Cookie');

      // 🔥 refresh token diambil backend dari cookie
      await api.post('/auth/refresh');

      processQueue(null);
      return api(originalRequest);
    } catch (err) {
      console.error('[API] Refresh token gagal', err);
      processQueue(err);

      // redirect ke login (client only)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
