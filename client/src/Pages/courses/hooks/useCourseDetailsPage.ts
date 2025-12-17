import { useParams, useNavigate } from 'react-router-dom';
import { useCourseDetails } from '@/features/courses/hooks/useCourseDetails';
import { useEnrollmentStatus } from '@/features/enrollment/hooks/useEnrollmentStatus';
import { useReviews } from '@/features/reviews/hooks/useReviews';

export function useCourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  const { course, loading: courseLoading, error: courseError } = useCourseDetails(courseId);
  const { enrolled, loading: enrollmentLoading } = useEnrollmentStatus(courseId);
  const { reviews, loading: reviewsLoading } = useReviews(courseId);

  const handleEnroll = () => {
    navigate(`/payment?courseId=${courseId}`);
  };

  const handleViewContent = () => {
    navigate(`/courses/${courseId}/content`);
  };

  return {
    course,
    reviews,
    enrolled,
    loading: courseLoading || enrollmentLoading || reviewsLoading,
    error: courseError,
    handleEnroll,
    handleViewContent,
  };
}
