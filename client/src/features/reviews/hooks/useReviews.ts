import { useState, useEffect } from 'react';
import { reviewsService } from '@/services/api/reviewsService';
import { Review } from '@/services/types/review.types';

export function useReviews(courseId: string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await reviewsService.getAllReviews(courseId);
        setReviews(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);

  return { reviews, loading, error };
}
