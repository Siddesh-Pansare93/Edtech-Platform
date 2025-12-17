import { useState } from 'react';
import { enrollmentService } from '@/services/api/enrollmentService';
import { VerifyEnrollmentFormData } from '@/services/validation/enrollment.schema';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export function useEnrollment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyAndEnroll = async (data: VerifyEnrollmentFormData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await enrollmentService.verifyAndEnroll(data);
      toast.success('Enrollment successful!');
      return result;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to enroll';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verifyAndEnroll, loading, error };
}
