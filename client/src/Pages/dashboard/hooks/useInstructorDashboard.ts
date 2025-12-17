import { useCreatedCourses } from '@/features/users/hooks/useCreatedCourses';
import { useNavigate } from 'react-router-dom';

export function useInstructorDashboard() {
  const navigate = useNavigate();
  const { courses, loading, error } = useCreatedCourses();

  const handleViewCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleEditCourse = (courseId: string) => {
    navigate(`/courses/${courseId}/settings`);
  };

  return {
    courses,
    loading,
    error,
    handleViewCourse,
    handleEditCourse,
  };
}
