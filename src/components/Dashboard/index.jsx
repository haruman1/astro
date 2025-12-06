import { AuthProvider } from '../Context/AuthContext.jsx';
import Protected from '../Protected.jsx';
import LogoutButton from '../Auth/Logout.jsx';

export default function DashboardApp() {
  return (
    <AuthProvider client:load>
      <Protected client:load>
        <div className="flex justify-end mb-4">
          <LogoutButton client:load />
        </div>

        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
          <h1 className="text-2xl font-bold mb-3">Dashboard</h1>
          <p>Selamat datang! Token otomatis direfresh.</p>
        </div>
      </Protected>
    </AuthProvider>
  );
}
