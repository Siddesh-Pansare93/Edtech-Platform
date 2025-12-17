import { useState, useEffect } from 'react';
import { progressService } from '@/services/api/progressService';
import { ProgressStats } from '@/services/types/progress.types';

export function useProgress(courseId: string | undefined) {
  const [progress, setProgress] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        const data = await progressService.getCourseProgress(courseId);
        setProgress(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch progress');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [courseId]);

  return { progress, loading, error };
}
