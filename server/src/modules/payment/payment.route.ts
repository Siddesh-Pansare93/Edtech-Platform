import express from 'express';
import { purchaseCourse } from './payment.controller';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { purchaseCourseSchema } from './payment.validation';

const router = express.Router();

router.use(verifyJwt);

router.route("/purchase").post(
  validate(purchaseCourseSchema),
  purchaseCourse
);

export default router;
