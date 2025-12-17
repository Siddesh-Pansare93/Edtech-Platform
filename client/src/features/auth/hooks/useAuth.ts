import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '@/services/api/authService';
import { LoginFormData, RegisterFormData } from '@/services/validation/auth.schema';
import { login as loginAction } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const login = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Service will validate with Zod - any validation errors thrown here
      const response = await authService.login(data);
      
      localStorage.setItem('accessToken', response.accessToken);
      dispatch(loginAction(response.user));
      
      toast.success('Login successful!');
      return response;
    } catch (err: any) {
      // Handle Zod validation errors
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        // Handle API errors
        const errorMsg = err.response?.data?.message || 'Login failed';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Service will validate with Zod
      const response = await authService.register(data);
      
      localStorage.setItem('accessToken', response.accessToken);
      dispatch(loginAction(response.user));
      
      toast.success('Registration successful!');
      return response;
    } catch (err: any) {
      // Handle Zod validation errors
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        // Handle API errors
        const errorMsg = err.response?.data?.message || 'Registration failed';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
}
