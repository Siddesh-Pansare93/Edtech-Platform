import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { LoginFormData } from '@/services/validation/auth.schema';
import { RootState } from '@/store/store';
import { usersService } from '@/services/api/usersService';
import { useDispatch } from 'react-redux';
import { setEnrolledCourses, setCreatedCourses } from '@/store/slices/courseSlice';

export function useLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);
  const { login, loading, error } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token || isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: LoginFormData) => {
    const response = await login(data);
    
    // Fetch user-specific data based on role
    if (response.user.role === 'student') {
      const enrolledCourses = await usersService.getEnrolledCourses();
      dispatch(setEnrolledCourses(enrolledCourses));
    } else if (response.user.role === 'instructor') {
      const createdCourses = await usersService.getCreatedCourses();
      dispatch(setCreatedCourses(createdCourses));
    }

    navigate('/');
  };

  return {
    handleLogin,
    loading,
    error,
  };
}
