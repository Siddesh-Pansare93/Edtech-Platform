import express from 'express'
import { checkEnrollment, purchaseCourse } from '../controllers/paymentAndEnrollment.controller.js'
import verifyJwt from '../middlewares/auth.middleware.js'


const router  = express.Router()

router.use(verifyJwt)


router.route("/purchase").post(purchaseCourse)
router.route("/check-enrollment/:courseId").post(checkEnrollment)


export default router 