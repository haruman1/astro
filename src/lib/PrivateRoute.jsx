import { useAuth } from '../components/hooks/useAuth.js';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // redirect manual di Astro
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return children;
}
