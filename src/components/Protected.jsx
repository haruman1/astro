import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Protected({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  /**
   * 🔁 Exchange refreshToken → accessToken
   */
  const exchangeToken = async () => {
    try {
      await api.post('/auth/exchange');
      return true;
    } catch (err) {
      if (err?.response?.status === 401) {
        // NORMAL: user belum login
        return false;
      }
      console.error('[Auth] Exchange failed:', err);
      return false;
    }
  };

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/check');
      if (res.data?.success) {
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (err) {
      if (err?.response?.status === 401) {
        // NORMAL: belum authenticated
        return false;
      }
      console.error('[Auth] Check failed:', err);
      return false;
    }
  };
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const exchanged = await exchangeToken();
        if (!exchanged) {
          setAllowed(false);
          return;
        }
        const authenticated = await checkAuth();
        if (authenticated) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch {
        setAllowed(false);
      } finally {
        if (mounted) setChecking(false);
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // 🔄 Loading UI
  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        <p className="text-gray-600">
          Sedang memeriksa sesi akun kamu, mohon menunggu…
        </p>
      </div>
    );
  }

  // 🚫 Jangan render apa pun saat redirect
  if (!allowed) return null;

  // ✅ Auth OK
  return children;
}
