import { Course } from '@/services/types/course.types';
import { CourseCard } from './CourseCard';

interface CourseListProps {
  courses: Course[];
  onViewDetails: (courseId: string) => void;
  loading?: boolean;
}

export function CourseList({ courses, onViewDetails, loading }: CourseListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-500">No courses available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}
