import RegisterForm from './RegisterForm.jsx';
import { ToastProvider } from '../../../lib/ToastProvider.jsx';
import { AuthProvider } from '../../Context/AuthContext.jsx';

export default function RegisterPage() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    </ToastProvider>
  );
}
