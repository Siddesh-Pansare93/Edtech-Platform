import { isValidObjectId } from 'mongoose';
import { Review } from './review.model';
import { ApiError } from '@/shared/utils/ApiError.util';
import { CreateReviewDTO, UpdateReviewDTO } from './review.types';

export const addReview = async (courseId: string, userId: string, reviewData: CreateReviewDTO) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Course Id");
  }

  if (!reviewData.rating || !reviewData.review) {
    throw new ApiError(400, "Please provide rating and review both");
  }

  const createdReview = await Review.create({
    course: courseId,
    user: userId,
    rating: reviewData.rating,
    review: reviewData.review
  });

  if (!createdReview) {
    throw new ApiError(400, "Failed to create review");
  }

  return createdReview;
};

export const updateReview = async (courseId: string, reviewId: string, userId: string, updateData: UpdateReviewDTO) => {
  if (!(isValidObjectId(courseId) || isValidObjectId(reviewId))) {
    throw new ApiError(400, "Invalid Course Id");
  }

  const fetchedReview = await Review.findById(reviewId);
  if (!fetchedReview) {
    throw new ApiError(404, "Review not found");
  }

  if (fetchedReview.user.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this review");
  }

  const updateFields: any = {};
  if (updateData.rating !== undefined) {
    updateFields.rating = updateData.rating;
  }
  if (updateData.review !== undefined) {
    updateFields.review = updateData.review;
  }

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "Please provide at least one field to update");
  }

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      $set: updateFields
    },
    { new: true }
  );

  if (!updatedReview) {
    throw new ApiError(404, "Review not found");
  }

  return updatedReview;
};

export const deleteReview = async (courseId: string, reviewId: string, userId: string) => {
  if (!(isValidObjectId(courseId) || isValidObjectId(reviewId))) {
    throw new ApiError(400, "Invalid Course or Review Id");
  }

  const fetchedReview = await Review.findById(reviewId);
  if (!fetchedReview) {
    throw new ApiError(404, "Review not found");
  }

  if (fetchedReview.user.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this review");
  }

  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    throw new ApiError(404, "Review not found");
  }

  return deletedReview;
};

export const getAllReviews = async (courseId: string) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Course Id");
  }

  const fetchedReviews = await Review.find({ course: courseId }).populate({
    path: 'user',
    select: 'name email',
  });

  return fetchedReviews;
};
