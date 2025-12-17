import { z } from 'zod';

export const createReviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  review: z.string().min(10, 'Review must be at least 10 characters').max(500, 'Review cannot exceed 500 characters'),
});

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  review: z.string().min(10).max(500).optional(),
});

export type CreateReviewFormData = z.infer<typeof createReviewSchema>;
export type UpdateReviewFormData = z.infer<typeof updateReviewSchema>;
