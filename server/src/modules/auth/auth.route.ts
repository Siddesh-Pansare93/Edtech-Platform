import express from 'express';
import { upload } from '@/shared/middlewares/multer.middleware';
import { handleUserLogin, handleUserLogout, handleUserRegistration } from './auth.controller';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { registerSchema, loginSchema } from './auth.validation';

const router = express.Router();

router.route("/register").post(
  upload.single("avatar"),
  validate(registerSchema),
  handleUserRegistration
);

router.route("/login").post(
  validate(loginSchema),
  handleUserLogin
);

router.route("/logout").get(
  verifyJwt,
  handleUserLogout
);

export default router;
