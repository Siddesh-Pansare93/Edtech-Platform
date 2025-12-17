import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
    review: z.string().min(1, "Review text is required")
  }),
  params: z.object({
    courseId: z.string().min(1)
  })
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    review: z.string().min(1).optional()
  }),
  params: z.object({
    courseId: z.string().min(1),
    reviewId: z.string().min(1)
  })
});

export const deleteReviewSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
    reviewId: z.string().min(1)
  })
});

export const getAllReviewsSchema = z.object({
  params: z.object({
    courseId: z.string().min(1)
  })
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>['body'];
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>['body'];
