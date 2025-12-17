import { useState, useEffect } from 'react';
import { enrollmentService } from '@/services/api/enrollmentService';

export function useEnrollmentStatus(courseId: string | undefined) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const checkEnrollment = async () => {
      try {
        setLoading(true);
        const result = await enrollmentService.checkEnrollment(courseId);
        setEnrolled(result.enrolled);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to check enrollment');
      } finally {
        setLoading(false);
      }
    };

    checkEnrollment();
  }, [courseId]);

  return { enrolled, loading, error };
}
