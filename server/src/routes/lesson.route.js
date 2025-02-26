import express from 'express'
import verifyJwt from '../middlewares/auth.middleware.js'
import { handleAddLesson, handleDeleteLesson, handleUpdateLesson } from '../controllers/lesson.controller.js'
import { isInstructorOrAdmin } from '../middlewares/role.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()

router.use(verifyJwt)
router.use(isInstructorOrAdmin)

router.route("/:courseId/:sectionId/add").post(
    upload.single("content", {
        resource_type: "auto"
    }),
    handleAddLesson
)

router.route("/:courseId/:sectionId/:lessonId")
    .patch(upload.single("content", {
        resource_type: "auto"
    }), handleUpdateLesson)
    .delete(handleDeleteLesson)

export default router