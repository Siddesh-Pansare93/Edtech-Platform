import express from 'express'
import { purchaseCourse } from '../controllers/paymentAndEnrollment.controller.js'
import verifyJwt from '../middlewares/auth.middleware.js'


const router  = express.Router()

router.use(verifyJwt)


router.route("/purchase").post(purchaseCourse)


export default router 