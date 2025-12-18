import { createContext, useState, useEffect } from 'react';
import api from '../../lib/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Cek auth saat app pertama kali load
   * Cookie otomatis dikirim ke backend
   */
  useEffect(() => {
    let mounted = true;

    api
      .get('/auth/check')
      .then((res) => {
        if (!mounted) return;

        if (res.data?.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        if (mounted) setUser(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * LOGIN
   * Backend akan set httpOnly cookie
   */
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });

    if (!res.data?.success) {
      throw new Error(res.data.message || 'Login failed');
    }

    // setelah login → fetch user dari backend
    const me = await api.get('/auth/check');
    if (me.data?.success) {
      setUser(me.data.user);
    }

    return res.data;
  };

  /**
   * REGISTER
   */
  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
    });

    if (!res.data?.success) {
      throw new Error(res.data.message || 'Registration failed');
    }

    return res.data;
  };

  /**
   * LOGOUT
   * Backend clear cookie
   */
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      setUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
