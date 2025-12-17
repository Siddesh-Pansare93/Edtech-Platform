import { useParams } from 'react-router-dom';
import { useCourseContent } from '@/features/courses/hooks/useCourseContent';
import { useProgress } from '@/features/progress/hooks/useProgress';
import { useLessonCompletion } from '@/features/progress/hooks/useLessonCompletion';

export function useCourseContentPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { course, loading: courseLoading, error: courseError } = useCourseContent(courseId);
  const { progress, loading: progressLoading } = useProgress(courseId);
  const { markLessonComplete, loading: completionLoading } = useLessonCompletion();

  const handleLessonComplete = async (lessonId: string) => {
    if (courseId) {
      await markLessonComplete(courseId, lessonId);
    }
  };

  return {
    course,
    progress,
    loading: courseLoading || progressLoading || completionLoading,
    error: courseError,
    handleLessonComplete,
  };
}
