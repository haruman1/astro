import RegisterForm from './RegisterForm.jsx';
import { ToastProvider } from '../../libs/ToastProvider.jsx';

export default function RegisterPage() {
  return (
    <ToastProvider>
      <RegisterForm />
    </ToastProvider>
  );
}
