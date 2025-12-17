import express from 'express';
import {
  getAllReviews,
  handleAddReview,
  handleDeleteReview,
  handleUpdateReview
} from './review.controller';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { createReviewSchema, updateReviewSchema, deleteReviewSchema, getAllReviewsSchema } from './review.validation';

const router = express.Router();

router.use(verifyJwt);

router.route("/:courseId")
  .get(
    validate(getAllReviewsSchema),
    getAllReviews
  )
  .post(
    validate(createReviewSchema),
    handleAddReview
  );

router.route("/:courseId/:reviewId")
  .patch(
    validate(updateReviewSchema),
    handleUpdateReview
  )
  .delete(
    validate(deleteReviewSchema),
    handleDeleteReview
  );

export default router;
