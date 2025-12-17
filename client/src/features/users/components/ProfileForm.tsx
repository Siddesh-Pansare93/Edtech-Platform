import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, UpdateProfileFormData } from '@/services/validation/user.schema';
import { User } from '@/services/types/user.types';
import { Button } from '@/shared/components/ui/Button';
import Input from '@/shared/components/ui/Input';
import Select from '@/shared/components/ui/Select';

interface ProfileFormProps {
  onSubmit: (data: UpdateProfileFormData) => Promise<void>;
  loading: boolean;
  initialData?: User;
}

export function ProfileForm({ onSubmit, loading, initialData }: ProfileFormProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      username: initialData.username,
      email: initialData.email,
      skillLevel: initialData.skillLevel,
      role: initialData.role,
    } : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
      />
      
      <Input
        label="Username"
        {...register('username')}
        error={errors.username?.message}
      />
      
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Skill Level"
        {...register('skillLevel')}
        error={errors.skillLevel?.message}
        placeholder="e.g., Beginner, Intermediate, Advanced"
      />
      
      <Select
        label="Role"
        {...register('role')}
        error={errors.role?.message}
        options={[
          { value: 'student', label: 'Student' },
          { value: 'instructor', label: 'Instructor' },
        ]}
      />
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
}
