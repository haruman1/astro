import LoginForm from './LoginForm.jsx';
import { ToastProvider } from '../../../lib/ToastProvider.jsx';
import { AuthProvider } from '../../Context/AuthContext.jsx';
export default function LoginPage() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </ToastProvider>
  );
}
