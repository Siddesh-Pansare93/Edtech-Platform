import { CourseProgress } from "../models/courseProgress.model.js"
import { Course } from "../models/course.model.js"
import { ApiError } from "../utils/ApiError.util.js"
import mongoose from "mongoose"

/**
 * Update course progress - mark a lesson as completed
 * @param {string} courseId - Course ID
 * @param {string} lessonId - Lesson ID
 * @param {string} userId - User ID
 * @returns {Promise<{progress: Object, message: string}>}
 */
const updateProgress = async (courseId, lessonId, userId) => {
    // Finding if the course Progress Doc is there or not
    const courseProgress = await CourseProgress.findOne({
        user: userId,
        course: courseId
    })

    // If course Progress doesn't exist... create one and directly add lesson Id into it
    if (!courseProgress) {
        const courseProgressCreation = await CourseProgress.create({
            user: userId,
            course: courseId,
            completedVideos: [lessonId]
        })

        return { progress: courseProgressCreation, message: "Lesson Completed Successfully" }
    }

    // Checking if the user had already completed the lesson or not
    const isLessonCompleted = courseProgress?.completedVideos.includes(lessonId)
    if (isLessonCompleted) {
        console.log("inside each ...")
        return { progress: null, message: "Lesson Already Completed" }
    }

    // If not already completed... add lesson Id to completed videos array
    courseProgress.completedVideos.push(lessonId)

    // Saving the updated doc in db
    await courseProgress.save()

    return { progress: courseProgress, message: "Lesson Completed Successfully" }
}

/**
 * Get course progress percentage
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID
 * @returns {Promise<number>} Progress percentage (0-100)
 */
const getProgress = async (courseId, userId) => {
    const courseProgress = await CourseProgress.findOne({
        user: userId,
        course: courseId
    })

    if (!courseProgress) {
        return 0
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

    const totalLessons = totalLessonsInCourse[0]?.totalLessons || 0

    if (totalLessons === 0) {
        return 0
    }

    const completedLessons = courseProgress?.completedVideos?.length || 0
    const progress = (completedLessons / totalLessons) * 100

    return progress
}

export {
    updateProgress,
    getProgress
}
