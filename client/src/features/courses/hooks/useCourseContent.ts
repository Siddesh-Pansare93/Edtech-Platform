import { useState, useEffect } from 'react';
import { coursesService } from '@/services/api/coursesService';
import { CourseWithContent } from '@/services/types/course.types';

export function useCourseContent(courseId: string | undefined) {
  const [course, setCourse] = useState<CourseWithContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchCourseContent = async () => {
      try {
        setLoading(true);
        const data = await coursesService.getCourseContent(courseId);
        setCourse(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch course content');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [courseId]);

  return { course, loading, error };
}
