import express from 'express';
import { getCourseProgress, updateCourseProgress } from './progress.controller';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { updateProgressSchema, getProgressSchema } from './progress.validation';

const router = express.Router();

router.use(verifyJwt);

router.route("/:courseId/:lessonId").get(
  validate(updateProgressSchema),
  updateCourseProgress
);

router.route("/:courseId").get(
  validate(getProgressSchema),
  getCourseProgress
);

export default router;
