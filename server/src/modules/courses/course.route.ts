import express from 'express';
import {
  getAllCourses,
  getCourseContent,
  getCourseDetails,
  handleCourseCreation,
  handleCourseDeletion,
  handleCourseDetailsUpdate,
  togglePublishStatus
} from './course.controller';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { upload } from '@/shared/middlewares/multer.middleware';
import { isInstructorOrAdmin } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { createCourseSchema, updateCourseSchema, courseIdSchema } from './course.validation';

const router = express.Router();

router.use(verifyJwt);

router.route("/").get(getAllCourses);
router.route("/details/:courseId").get(validate(courseIdSchema), getCourseDetails);

router.route("/create")
  .post(
    upload.fields([{
      name: "thumbnail",
      maxCount: 1,
    }]),
    validate(createCourseSchema),
    isInstructorOrAdmin,
    handleCourseCreation
  );

router.route("/:courseId")
  .patch(
    validate(updateCourseSchema),
    isInstructorOrAdmin,
    handleCourseDetailsUpdate
  )
  .delete(
    validate(courseIdSchema),
    isInstructorOrAdmin,
    handleCourseDeletion
  );

router.route("/toggle/:courseId").patch(
  validate(courseIdSchema),
  isInstructorOrAdmin,
  togglePublishStatus
);

router.route("/content/:courseId").get(
  validate(courseIdSchema),
  getCourseContent
);

export default router;
