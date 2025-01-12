import { CourseProgress } from "../models/courseProgress.model.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.util.js"
import mongoose from "mongoose";


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

        // If course Progress doesn't exist ..... create one and directly add lesson Id into it 
        if (!courseProgress) {
            const courseProgressCreation = await CourseProgress.create({
                user: userId,
                course: courseId,
                completedVideos: [lessonId]
            })

            return res
                .status(200)
                .json(
                    new ApiResponse(200, courseProgressCreation, "Lesson Completed Successfully")
                )
        }

        //Checking if the user had already completed the lesson or not
        const isLessonCompleted = courseProgress?.completedVideos.includes(lessonId)
        if (isLessonCompleted) {
            console.log("inside each ...")
            return res
                .status(200)
                .json(
                    new ApiResponse(200, null, "Lesson Already Completed"))
        }

        //If not already completed ... add lesson Id to completed videos array
        courseProgress.completedVideos.push(lessonId)



        //saving the updated doc in db 
        await courseProgress.save()


        return res
            .status(200)
            .json(
                new ApiResponse(200, courseProgress, "Lesson Completed Successfully")
            )

    } catch (error) {
        return res
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
            return res
                .status(200)
                .json(
                    new ApiResponse(200, { progress: 0 }, "Course Progress fetched Successfully")
                )
        }



        const totalLessonsInCourse = await Course.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $lookup: {
                    from: "sections",
                    localField: "sections",
                    foreignField: "_id",
                    as: "sections",
                    pipeline: [
                        {
                            $lookup: {
                                from: "lessons",
                                localField: "lessons",
                                foreignField: "_id",
                                as: "lessons"
                            }
                        },
                        {
                            $addFields: {
                                totalLessons: { $size: "$lessons" }
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    totalLessons: {
                        $sum: {
                            $map: {
                                input: "$sections",
                                as: "section",
                                in: "$$section.totalLessons"
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    totalLessons: 1
                }
            }

        ])

        const totalLessons = totalLessonsInCourse[0].totalLessons


        const completedLessons = courseProgress?.completedVideos?.length
        const progress = (completedLessons / totalLessons) * 100

        return res
            .status(200)
            .json(
                new ApiResponse(200, progress, "Course Progress fetched Successfully")
            )


    } catch (error) {
        return res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Getting Course Progress : ${error.message}`)
            )

    }
})

export {
    updateCourseProgress,
    getCourseProgress
}