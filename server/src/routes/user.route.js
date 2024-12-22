import express from "express"
import {upload} from '../middlewares/multer.middleware.js'
import { handleUserRegistration } from "../controllers/user.controller.js"


const router = express.Router()


router.route("/register").post(
    upload.single("avatar"),
    handleUserRegistration
)



export default router