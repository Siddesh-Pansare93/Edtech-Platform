import express from 'express';
import { checkEnrollment, verifyAndEnroll } from './enrollment.controller';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { verifyEnrollmentSchema, checkEnrollmentSchema } from './enrollment.validation';

const router = express.Router();

router.use(verifyJwt);

router.route("/verify-payment").post(
  validate(verifyEnrollmentSchema),
  verifyAndEnroll
);

router.route("/check-enrollment/:courseId").post(
  validate(checkEnrollmentSchema),
  checkEnrollment
);

export default router;
