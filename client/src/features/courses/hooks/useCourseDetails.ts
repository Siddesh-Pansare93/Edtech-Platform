import { useState, useEffect } from 'react';
import { coursesService } from '@/services/api/coursesService';
import { Course } from '@/services/types/course.types';

export function useCourseDetails(courseId: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await coursesService.getCourseDetails(courseId);
        setCourse(data);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return { course, loading, error };
}
