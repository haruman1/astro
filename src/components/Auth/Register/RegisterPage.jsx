import RegisterForm from './RegisterForm.jsx';
import { ToastProvider } from '../../../lib/ToastProvider.jsx';

export default function RegisterPage() {
  return (
    <ToastProvider>
      <RegisterForm />
    </ToastProvider>
  );
}
