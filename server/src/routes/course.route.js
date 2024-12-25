import express from 'express'
import { handleCourseCreation, handleCourseDeletion, handleCourseDetailsUpdate } from '../controllers/course.controller.js'
import verifyJwt from '../middlewares/auth.middleware.js'
import { upload } from "../middlewares/multer.middleware.js"


const router = express.Router()


router.use(verifyJwt)

router.route("/create")
    .post(
        upload.fields(
            [{
                name: "thumbnail",
                maxCount: 1,
            }]
        ), handleCourseCreation)


router.route("/:courseId")
        .patch(handleCourseDetailsUpdate)
        .delete(handleCourseDeletion)


export default router