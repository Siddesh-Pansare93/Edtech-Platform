import { useState } from 'react';
import { coursesService } from '@/services/api/coursesService';
import { Course } from '@/services/types/course.types';
import { toast } from 'react-toastify';

export function useCourseToggle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePublishStatus = async (courseId: string): Promise<Course> => {
    try {
      setLoading(true);
      setError(null);
      const course = await coursesService.togglePublishStatus(courseId);
      toast.success(`Course ${course.isPublished ? 'published' : 'unpublished'} successfully!`);
      return course;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to toggle publish status';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { togglePublishStatus, loading, error };
}
