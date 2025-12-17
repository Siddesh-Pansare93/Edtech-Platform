import { useState } from 'react';
import { progressService } from '@/services/api/progressService';
import { Progress } from '@/services/types/progress.types';
import { toast } from 'react-toastify';

export function useLessonCompletion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markLessonComplete = async (courseId: string, lessonId: string): Promise<Progress> => {
    try {
      setLoading(true);
      setError(null);
      const progress = await progressService.updateProgress(courseId, lessonId);
      toast.success('Lesson marked as complete!');
      return progress;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update progress';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { markLessonComplete, loading, error };
}
