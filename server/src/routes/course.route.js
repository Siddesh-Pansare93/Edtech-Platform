import express from 'express'
import { getAllCourses, getCourseDetails, handleCourseCreation, handleCourseDeletion, handleCourseDetailsUpdate, togglePublishStatus } from '../controllers/course.controller.js'
import verifyJwt from '../middlewares/auth.middleware.js'
import { upload } from "../middlewares/multer.middleware.js"
import { isInstructorOrAdmin } from '../middlewares/role.middleware.js'


const router = express.Router()



router.use(verifyJwt)

router.route("/").get(getAllCourses)
router.route("/details/:courseId").get(getCourseDetails)
router.route("/create")
    .post(
        upload.fields(
            [{
                name: "thumbnail",
                maxCount: 1,
            }]
        ), isInstructorOrAdmin , handleCourseCreation)


router.route("/:courseId")
        .patch(isInstructorOrAdmin , handleCourseDetailsUpdate)
        .delete(isInstructorOrAdmin , handleCourseDeletion)


router.route("/toggle/:courseId").patch(isInstructorOrAdmin , togglePublishStatus)

export default router