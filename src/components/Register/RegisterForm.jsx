import { useState } from 'react';
import { useToast } from '../ToastProvider.jsx';
import { api } from '../../lib/api.js';

export default function RegisterForm() {
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('hit register');
    try {
      // API Elysia — hasilnya sudah JSON
      const data = await api.register({ name, email, password });
      if (data.success === true)
        addToast(
          'Registrasi sukses!, Silahkan Login',
          { type: 'success' },
          3000
        );
    } catch (err) {
      setError(err.message);
      addToast(`Error: ${err.message}`, { type: 'error' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="backdrop-blur-xl bg-white/10 shadow-2xl p-8 w-full max-w-md rounded-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-500 text-white text-sm p-2 rounded mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-white text-sm font-medium">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder-white/70 focus:ring-2 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder-white/70 focus:ring-2 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="password kamu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg placeholder-white/70 focus:ring-2 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white text-lg font-semibold shadow-lg transition flex items-center justify-center gap-2
    ${
      loading
        ? 'bg-blue-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700'
    }
  `}
          >
            {loading ? (
              <>
                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                Processing...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="text-white text-center mt-5 text-sm">
          Sudah punya akun?
          <a
            href="/login"
            className="font-semibold text-blue-300 hover:text-blue-200 ml-1"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
