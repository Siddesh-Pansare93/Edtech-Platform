import { useCourseContentPage } from './hooks/useCourseContentPage';
import { ProgressBar } from '@/features/progress/components/ProgressBar';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';

export function CourseContentPage() {
  const { course, progress, loading, error, handleLessonComplete } = useCourseContentPage();

  if (loading) return <div className="container mx-auto py-8">Loading...</div>;
  if (error) return <div className="container mx-auto py-8">Error: {error}</div>;
  if (!course) return <div className="container mx-auto py-8">Course not found</div>;

  const progressPercentage = progress?.progress 
    ? (progress.progress.completedLessons.length / 
       (course.sections.reduce((acc, section) => {
         const lessons = Array.isArray(section.lessons) ? section.lessons : [];
         return acc + lessons.length;
       }, 0) || 1)) * 100
    : 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <ProgressBar progress={progressPercentage} label="Course Progress" />
      </div>

      <div className="space-y-6">
        {course.sections.map((section) => {
          const lessons = Array.isArray(section.lessons) 
            ? section.lessons.filter((lesson): lesson is import('@/services/types/lesson.types').Lesson => 
                typeof lesson === 'object' && lesson !== null && '_id' in lesson
              )
            : [];
          return (
            <Card key={section._id}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => {
                    const isCompleted = progress?.progress?.completedLessons.includes(lesson._id);
                    return (
                      <div key={lesson._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{index + 1}. {lesson.title}</h4>
                          {isCompleted && (
                            <span className="text-sm text-green-600">✓ Completed</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <video 
                            src={lesson.content} 
                            controls 
                            className="max-w-md"
                          />
                          {!isCompleted && (
                            <Button 
                              onClick={() => handleLessonComplete(lesson._id)}
                              size="sm"
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
