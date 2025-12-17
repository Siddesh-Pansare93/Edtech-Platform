import express from 'express';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { handleAddLesson, handleDeleteLesson, handleUpdateLesson } from './lesson.controller';
import { isInstructorOrAdmin } from '@/shared/middlewares/role.middleware';
import { upload } from '@/shared/middlewares/multer.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { createLessonSchema, updateLessonSchema, deleteLessonSchema } from './lesson.validation';

const router = express.Router();

router.use(verifyJwt);
router.use(isInstructorOrAdmin);

router.route("/:courseId/:sectionId/add").post(
  upload.single("content"),
  validate(createLessonSchema),
  handleAddLesson
);

router.route("/:courseId/:sectionId/:lessonId")
  .patch(
    upload.single("content"),
    validate(updateLessonSchema),
    handleUpdateLesson
  )
  .delete(
    validate(deleteLessonSchema),
    handleDeleteLesson
  );

export default router;
