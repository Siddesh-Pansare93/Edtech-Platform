import express from "express"
import {upload} from '../middlewares/multer.middleware.js'
import { handleUserLogin, 
    handleUserRegistration ,
    handleChangePassword ,   
    handleUpdateUserProfile , 
    handleUserLogout, 
    getEnrolledCourses,
    getYourCreatedCourses,
} from "../controllers/user.controller.js"
import verifyJwt from "../middlewares/auth.middleware.js"
import { verifyAndEnroll } from "../controllers/paymentAndEnrollment.controller.js"


const router = express.Router()


router.route("/register").post(
    upload.single("avatar"),
    handleUserRegistration
)

router.route("/login").post(handleUserLogin)

//Secure Routes
router.route("/logout").get(verifyJwt , handleUserLogout)
router.route("/update-profile").patch(verifyJwt , handleUpdateUserProfile)
router.route("/change-password").patch(verifyJwt , handleChangePassword)
// router.route("/refresh-token").post(handleRefreshToken)
// router.route("/get-user-profile").get(handleGetUserProfile)
// router.route("/update-avatar").patch(handleUpdateAvatar)
// router.route("/get-all-users").get(handleGetAllUsers)
// router.route("/get-user-by-id").get(handleGetUserById)
// router.route("/delete-user").delete(handleDeleteUser)

router.route("/verify-payment").post(verifyJwt , verifyAndEnroll)
router.route("/enrolled-courses").get(verifyJwt , getEnrolledCourses)
router.route("/your-courses").get(verifyJwt , getYourCreatedCourses)





export default router