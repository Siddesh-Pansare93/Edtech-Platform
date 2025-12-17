import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/features/courses/hooks/useCourses';

export function useCoursesPage() {
  const navigate = useNavigate();
  const { courses, loading, error } = useCourses();

  const handleViewDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return {
    courses,
    loading,
    error,
    handleViewDetails,
  };
}
