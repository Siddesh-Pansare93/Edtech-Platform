import { Course } from '@/services/types/course.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';

interface CourseCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
}

export function CourseCard({ course, onViewDetails }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-48 object-cover rounded-lg" 
        />
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-2">
          {course.paid ? (
            <span className="text-lg font-bold">₹{course.price}</span>
          ) : (
            <span className="text-lg font-bold text-green-600">Free</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onViewDetails(course._id)} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
