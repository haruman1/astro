import { useEffect, useState } from 'react';

export default function Protected({ children }) {
  const [allowed, setAllowed] = useState(false);
  console.log('Memeriksa akses terlindungi...');
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    // Jika tidak ada token → langsung ke login
    if (!token) {
      window.location.href = '/login';
      return;
    }
    console.log('Token ditemukan, memeriksa akses...');

    // Jika token ada → izinkan
    setAllowed(true);
  }, []);

  // Saat masih checking auth
  if (!allowed) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        {/* Spinner sederhana */}
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        <p className="text-gray-600">Sedang check akun mu, Mohon menunggu</p>
      </div>
    );
  }

  return children;
}
