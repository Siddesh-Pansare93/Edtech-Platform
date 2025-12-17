import { useEnrolledCourses } from '@/features/users/hooks/useEnrolledCourses';
import { useNavigate } from 'react-router-dom';

export function useStudentDashboard() {
  const navigate = useNavigate();
  const { courses, loading: coursesLoading, error: coursesError } = useEnrolledCourses();

  const handleViewCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleViewContent = (courseId: string) => {
    navigate(`/courses/${courseId}/content`);
  };

  return {
    courses,
    loading: coursesLoading,
    error: coursesError,
    handleViewCourse,
    handleViewContent,
  };
}
