const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

export const api = {
  async login(payload) {
    return fetch(`${BASE_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((r) => r.json());
  },

  async register(payload) {
    return fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((r) => r.json());
  },

  async getProfile(token) {
    return fetch(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
};
export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
