import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '@/services/api/authService';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      
      localStorage.removeItem('accessToken');
      dispatch(logoutAction());
      
      toast.success('Logged out successfully');
    } catch (err: any) {
      toast.error('Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
