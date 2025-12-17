import { useStudentDashboard } from './hooks/useStudentDashboard';
import { CourseList } from '@/features/courses/components/CourseList';

export function StudentDashboardPage() {
  const { courses, loading, error, handleViewCourse } = useStudentDashboard();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>
      
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      <CourseList
        courses={courses}
        onViewDetails={handleViewCourse}
        loading={loading}
      />
    </div>
  );
}
