import { CourseProgress } from "../models/courseProgress.model.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.util.js"


const updateCourseProgress = asyncHandler(async (req, res) => {
    //get courseid -- userId doc from db 
    //check lessonId is there in completed videos array
    //if there return response already completed
    //else add lesson id to completed videos array in doc 

    try {

        const { courseId, lessonId } = req.params
        const userId = req.user._id

        //Finding if the course Progress Doc id ther or not 
        const courseProgress = await CourseProgress.findOne({
            user: userId,
            course: courseId
        })

        if (!courseProgress) {
            throw new ApiError(400, "Course Progress not found")

            //Checking if the user had already completed the lesson or not
            const isLessonCompleted = courseProgress.completedVideos.includes(lessonId)
            if (isLessonCompleted) {
                return ApiResponse(res, 200, "Lesson Already Completed")
            }

            //If not already completed ... add lesson Id to completed videos array
            courseProgress.completedVideos.push(lessonId)

            //saving the updated doc in db 
            await courseProgress.save()


            res
                .status(200)
                .json(
                    new ApiResponse(res, 200, "Lesson Completed Successfully")
                )
        }
    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Updating Course Progress : ${error.message}`)
            )
    }
})



const getCourseProgress = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const userId = req.user._id
        const courseProgress = await CourseProgress.findOne({
            user: userId,
            course: courseId
        })
        if (!courseProgress) {
            throw new ApiError(400, "Course Progress Not found")
        }

        const course = Course.findById(courseId)
        const TotalLessons = course.lessons.length()
        const completedLessons = courseProgress.completedVideos.length()
        const progress = (completedLessons / TotalLessons) * 100

        res
            .status(200)
            .json(
                new ApiResponse(200, progress, "Course Progress fetched Successfully")
            )


    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Getting Course Progress : ${error.message}`)
            )

    }
})

export {
    updateCourseProgress , 
    getCourseProgress
}