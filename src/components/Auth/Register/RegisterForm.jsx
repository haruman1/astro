import { useState } from 'react';
import { useToast } from '../../../lib/ToastProvider.jsx';

import useAuth from '../../hooks/useAuth.js';

export default function RegisterForm() {
  const { addToast } = useToast();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(name, email, password);
      window.location.href = '/login';
      addToast('Registration successful!', { type: 'success' }, 5000);
    } catch (err) {
      setError(err.message);
      addToast(`Error: ${err.message}`, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg w-full max-w-5xl">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 bg-gray-50 p-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#21BAA7]">
            Welcome To Manajemen Barang
          </h1>

          <p className="text-gray-600 mt-2 max-w-sm">
            Aplikasi manajemen barang modern & mudah digunakan.
          </p>

          <img
            src="/assets/images/RegisterUser.png"
            alt="Register Illustration"
            className="w-48 md:w-64 mt-6"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 p-8 flex justify-center items-center">
          <div className="w-full max-w-sm">
            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
              Daftar
            </h2>
            {error && (
              <div
                className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
                role="alert"
                tabIndex="-1"
                aria-labelledby="hs-soft-color-danger-label"
              >
                <span id="hs-soft-color-danger-label" className="font-bold">
                  Error
                </span>{' '}
                {error}
              </div>
            )}
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 bg-[#21BAA7] text-white py-2 rounded-md transition
    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1aa091]'}
  `}
              >
                {loading ? (
                  <>
                    <div className="animate-spin inline-block size-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Loading...
                  </>
                ) : (
                  'Login'
                )}
              </button>
              <p className="text-sm text-center mt-3">
                Sudah punya akun?
                <a href="/login" className="text-[#21BAA7] font-semibold ml-1">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
