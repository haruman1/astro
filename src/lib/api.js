import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE_URL,
});

// state untuk refresh queue
let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
}

// Kirim access token
api.interceptors.request.use((config) => {
  console.log('Menyiapkan request dengan token...');
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      // tunggu token baru
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      });
    }

    isRefreshing = true;

    try {
      console.log('Mencoba refresh token...');
      const refresh = localStorage.getItem('refreshToken');

      const res = await api.post('/auth/refresh', { refreshToken: refresh });

      const newAccess = res.data.accessToken;
      const newRefresh = res.data.refreshToken;

      localStorage.setItem('accessToken', newAccess);
      localStorage.setItem('refreshToken', newRefresh);
      console.log('Token refreshed:', res.data);
      processQueue(null, newAccess);

      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    } catch (err) {
      console.error('Error refreshing token:', err);
      processQueue(err, null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      window.location.href = '/login';

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
