import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Protected({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/check');

        if (!mounted) return;

        if (res.data?.success) {
          setAllowed(true);
        } else {
          window.location.replace('/login');
        }
      } catch {
        if (mounted) {
          window.location.replace('/login');
        }
      } finally {
        if (mounted) setChecking(false);
      }
    };

    checkAuth();

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
