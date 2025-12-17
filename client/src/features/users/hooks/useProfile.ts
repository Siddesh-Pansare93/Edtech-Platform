import { useState } from 'react';
import { usersService } from '@/services/api/usersService';
import { UpdateProfileFormData, ChangePasswordFormData } from '@/services/validation/user.schema';
import { User } from '@/services/types/user.types';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: UpdateProfileFormData): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const user = await usersService.updateProfile(data);
      toast.success('Profile updated successfully!');
      return user;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to update profile';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordFormData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await usersService.changePassword(data);
      toast.success('Password changed successfully!');
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to change password';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, changePassword, loading, error };
}
