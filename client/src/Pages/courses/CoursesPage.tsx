import { CourseList } from '@/features/courses/components/CourseList';
import { useCoursesPage } from './hooks/useCoursesPage';

export function CoursesPage() {
  const { courses, loading, error, handleViewDetails } = useCoursesPage();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      <CourseList
        courses={courses}
        onViewDetails={handleViewDetails}
        loading={loading}
      />
    </div>
  );
}
