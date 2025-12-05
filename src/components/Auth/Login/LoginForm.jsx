import { useState } from 'react';
import { useToast } from '../../libs/ToastProvider.jsx';
import { api } from '../../../lib/api.js';
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addToast } = useToast();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // contoh API Elysia
      const data = await api.login({ email, password });
      if (!data.success) {
        throw new Error(data.message || 'Login gagal');
      }

      // jika sukses
      localStorage.setItem('access_token', data.token);
      addToast('Login sukses!', { type: 'success' });
    } catch (err) {
      setError(err.message);
      addToast(`Error: ${err.message}`, { type: 'error' });
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md bg-white shadow-lg p-6 rounded-xl"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</p>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
