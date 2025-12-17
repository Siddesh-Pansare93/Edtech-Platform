import { useState, useEffect } from 'react';
import { usersService } from '@/services/api/usersService';
import { Course } from '@/services/types/course.types';

export function useEnrolledCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await usersService.getEnrolledCourses();
        setCourses(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch enrolled courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}
