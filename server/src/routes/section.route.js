import express from 'express'
import verifyJwt from "../middlewares/auth.middleware.js"
import { handleCreateSection, handleDeleteSection, handleUpdateSectionDetails } from '../controllers/section.controller.js'
import { isInstructorOrAdmin } from '../middlewares/role.middleware.js'

const router = express.Router()

router.use(verifyJwt)
router.use(isInstructorOrAdmin)


router.route("/")
    .post(handleCreateSection)
    .patch(handleUpdateSectionDetails)
    .delete(handleDeleteSection)




export default router