import { useInstructorDashboard } from './hooks/useInstructorDashboard';
import { CourseList } from '@/features/courses/components/CourseList';
import { Button } from '@/shared/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function InstructorDashboardPage() {
  const navigate = useNavigate();
  const { courses, loading, error, handleViewCourse } = useInstructorDashboard();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button onClick={() => navigate('/courseform')}>
          Create New Course
        </Button>
      </div>
      
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      <CourseList
        courses={courses}
        onViewDetails={handleViewCourse}
        loading={loading}
      />
    </div>
  );
}
