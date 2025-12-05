import { useState, useEffect, createContext, useContext } from 'react';
import { api, logout } from '../../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // cek token saat pertama load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .profile()
      .then((res) => {
        if (res.success) setUser(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success) {
      setUser(res.data.user);
    }
    return res;
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return { user, loading, login, logoutUser };
}
