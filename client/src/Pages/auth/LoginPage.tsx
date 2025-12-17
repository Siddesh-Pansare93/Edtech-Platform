import { LoginForm } from '@/features/auth/components/LoginForm';
import { useLoginPage } from './hooks/useLoginPage';

export function LoginPage() {
  const { handleLogin, loading, error } = useLoginPage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <LoginForm onSubmit={handleLogin} loading={loading} />
      </div>
    </div>
  );
}
