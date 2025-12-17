import { useState } from 'react';
import { reviewsService } from '@/services/api/reviewsService';
import { CreateReviewFormData, UpdateReviewFormData } from '@/services/validation/review.schema';
import { Review } from '@/services/types/review.types';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export function useReviewForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addReview = async (courseId: string, data: CreateReviewFormData): Promise<Review> => {
    try {
      setLoading(true);
      setError(null);
      const review = await reviewsService.addReview(courseId, data);
      toast.success('Review added successfully!');
      return review;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to add review';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (courseId: string, reviewId: string, data: UpdateReviewFormData): Promise<Review> => {
    try {
      setLoading(true);
      setError(null);
      const review = await reviewsService.updateReview(courseId, reviewId, data);
      toast.success('Review updated successfully!');
      return review;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to update review';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (courseId: string, reviewId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await reviewsService.deleteReview(courseId, reviewId);
      toast.success('Review deleted successfully!');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to delete review';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addReview, updateReview, deleteReview, loading, error };
}
