import express from 'express';
import verifyJwt from '@/shared/middlewares/auth.middleware';
import { handleCreateSection, handleDeleteSection, handleUpdateSectionDetails } from './section.controller';
import { isInstructorOrAdmin } from '@/shared/middlewares/role.middleware';
import { validate } from '@/shared/middlewares/validation.middleware';
import { createSectionSchema, updateSectionSchema, deleteSectionSchema } from './section.validation';

const router = express.Router();

router.use(verifyJwt);
router.use(isInstructorOrAdmin);

router.route("/:courseId/create")
  .post(
    validate(createSectionSchema),
    handleCreateSection
  );

router.route("/:courseId/:sectionId")
  .patch(
    validate(updateSectionSchema),
    handleUpdateSectionDetails
  )
  .delete(
    validate(deleteSectionSchema),
    handleDeleteSection
  );

export default router;
