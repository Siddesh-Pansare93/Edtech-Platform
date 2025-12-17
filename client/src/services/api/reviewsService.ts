import { apiClient } from './apiClient';
import { createReviewSchema, updateReviewSchema, CreateReviewFormData, UpdateReviewFormData } from '../validation/review.schema';
import { Review } from '../types/review.types';

export const reviewsService = {
  getAllReviews: async (courseId: string): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/api/v1/reviews/${courseId}`);
    return response.data;
  },

  addReview: async (courseId: string, data: CreateReviewFormData): Promise<Review> => {
    // Validate before sending
    const validated = createReviewSchema.parse(data);
    
    const response = await apiClient.post<Review>(`/api/v1/reviews/${courseId}`, validated);
    return response.data;
  },

  updateReview: async (courseId: string, reviewId: string, data: UpdateReviewFormData): Promise<Review> => {
    // Validate before sending
    const validated = updateReviewSchema.parse(data);
    
    const response = await apiClient.patch<Review>(`/api/v1/reviews/${courseId}/${reviewId}`, validated);
    return response.data;
  },

  deleteReview: async (courseId: string, reviewId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/reviews/${courseId}/${reviewId}`);
  },
};
