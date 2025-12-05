import LoginForm from './LoginForm.jsx';
import { ToastProvider } from '../../libs/ToastProvider.jsx';

export default function LoginPage() {
  return (
    <ToastProvider>
      <LoginForm />
    </ToastProvider>
  );
}
