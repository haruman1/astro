import { useEffect, useState } from 'react';
import api from '../lib/api'; // sesuaikan path

export default function Protected({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    api
      .get('/auth/check')
      .then((res) => {
        if (!mounted) return;

        if (res.data?.success) {
          setAllowed(true);
        } else {
          window.location.href = '/login';
        }
      })
      .catch(() => {
        if (mounted) {
          window.location.href = '/login';
        }
      })
      .finally(() => {
        if (mounted) setChecking(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        <p className="text-gray-600">
          Sedang memeriksa sesi akun kamu, mohon menunggu…
        </p>
      </div>
    );
  }

  if (!allowed) return (window.location.href = '/login');

  return children;
}
