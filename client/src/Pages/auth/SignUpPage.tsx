import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { useSignUpPage } from './hooks/useSignUpPage';

export function SignUpPage() {
  const { handleSignUp, loading, error } = useSignUpPage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <SignUpForm onSubmit={handleSignUp} loading={loading} />
      </div>
    </div>
  );
}
