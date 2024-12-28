import express from 'express'
import verifyJwt from '../middlewares/auth.middleware.js'
import { handleAddLesson, handleDeleteLesson, handleUpdateLesson } from '../controllers/lesson.controller.js'
import { isInstructorOrAdmin } from '../middlewares/role.middleware.js'

const router  = express.Router()

router.use(verifyJwt)
router.use(isInstructorOrAdmin)

router.route("/:courseId/:sectionId/add")
    .post(handleAddLesson)

router.route("/:courseId/:sectionId/:lessonId")
    .patch(handleUpdateLesson)
    .delete(handleDeleteLesson)


export default router