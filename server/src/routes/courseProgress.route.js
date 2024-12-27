import express from 'express'
import { getCourseProgress, updateCourseProgress } from '../controllers/CourseProgress.controller'
import {verifyJwt} from "../middlewares/auth.middleware.js"


const router = express.Router()

router.use(verifyJwt)

router.route("/:courseId/:lessonId").get(updateCourseProgress)
router.route("/:courseId").get(getCourseProgress)

export default router
