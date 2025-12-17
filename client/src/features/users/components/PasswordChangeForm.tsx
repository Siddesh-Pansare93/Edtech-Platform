import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, ChangePasswordFormData } from '@/services/validation/user.schema';
import { Button } from '@/shared/components/ui/Button';
import Input from '@/shared/components/ui/Input';

interface PasswordChangeFormProps {
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  loading: boolean;
}

export function PasswordChangeForm({ onSubmit, loading }: PasswordChangeFormProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Current Password"
        type="password"
        {...register('oldPassword')}
        error={errors.oldPassword?.message}
        required
      />
      
      <Input
        label="New Password"
        type="password"
        {...register('newPassword')}
        error={errors.newPassword?.message}
        required
      />
      
      <Input
        label="Confirm New Password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        required
      />
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  );
}
