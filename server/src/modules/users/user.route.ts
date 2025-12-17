import express from "express";
import verifyJwt from '@/shared/middlewares/auth.middleware';
import {
  handleChangePassword,
  handleUpdateUserProfile,
  getEnrolledCourses,
  getYourCreatedCourses,
} from "./user.controller";
import { validate } from '@/shared/middlewares/validation.middleware';
import { updateProfileSchema, changePasswordSchema } from './user.validation';

const router = express.Router();

// Secure Routes
router.route("/update-profile").patch(
  verifyJwt,
  validate(updateProfileSchema),
  handleUpdateUserProfile
);

router.route("/change-password").patch(
  verifyJwt,
  validate(changePasswordSchema),
  handleChangePassword
);

router.route("/enrolled-courses").get(
  verifyJwt,
  getEnrolledCourses
);

router.route("/your-courses").get(
  verifyJwt,
  getYourCreatedCourses
);

export default router;
