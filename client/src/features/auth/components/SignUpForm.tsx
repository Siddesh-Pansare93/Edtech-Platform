import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/services/validation/auth.schema';
import { Button } from '@/shared/components/ui/Button';
import Input from '@/shared/components/ui/Input';
import Select from '@/shared/components/ui/Select';

interface SignUpFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  loading: boolean;
}

export function SignUpForm({ onSubmit, loading }: SignUpFormProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
        required
      />
      
      <Input
        label="Username"
        {...register('username')}
        error={errors.username?.message}
        required
      />
      
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        required
      />
      
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        required
      />
      
      <Select
        label="Role"
        {...register('role')}
        error={errors.role?.message}
        options={[
          { value: 'student', label: 'Student' },
          { value: 'instructor', label: 'Instructor' },
        ]}
        required
      />
      
      <Input
        label="Skill Level"
        {...register('skillLevel')}
        error={errors.skillLevel?.message}
        placeholder="e.g., Beginner, Intermediate, Advanced"
        required
      />
      
      <Input
        label="Avatar"
        type="file"
        accept="image/*"
        {...register('avatar')}
        error={errors.avatar?.message}
      />
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  );
}
