import { useSelector } from 'react-redux';
import { useProfile } from '@/features/users/hooks/useProfile';
import { UpdateProfileFormData, ChangePasswordFormData } from '@/services/validation/user.schema';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';

export function useProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.userData);
  const { updateProfile, changePassword, loading, error } = useProfile();

  const handleUpdateProfile = async (data: UpdateProfileFormData) => {
    const updatedUser = await updateProfile(data);
    // Update Redux store with new user data
    dispatch(login(updatedUser));
  };

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    await changePassword(data);
  };

  return {
    user,
    handleUpdateProfile,
    handleChangePassword,
    loading,
    error,
  };
}
