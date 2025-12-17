import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as reviewService from './review.service';
import { CreateReviewInput, UpdateReviewInput } from './review.validation';

export const handleAddReview = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId } = req.params;
    const data = req.body as CreateReviewInput;
    const userId = req.user!._id.toString();

    const createdReview = await reviewService.addReview(courseId, userId, data);

    res.status(200).json(
      new ApiResponse(200, createdReview, "Review created successfully")
    );
  }
);

export const handleUpdateReview = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId, reviewId } = req.params;
    const data = req.body as UpdateReviewInput;
    const userId = req.user!._id.toString();

    const updatedReview = await reviewService.updateReview(courseId, reviewId, userId, data);

    res.status(200).json(
      new ApiResponse(200, updatedReview, "Review updated successfully")
    );
  }
);

export const handleDeleteReview = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId, reviewId } = req.params;
    const userId = req.user!._id.toString();

    const deletedReview = await reviewService.deleteReview(courseId, reviewId, userId);

    res.status(200).json(
      new ApiResponse(200, deletedReview, "Review deleted successfully")
    );
  }
);

export const getAllReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const fetchedReviews = await reviewService.getAllReviews(courseId);

    res.status(200).json(
      new ApiResponse(200, fetchedReviews, "Reviews fetched successfully")
    );
  }
);
