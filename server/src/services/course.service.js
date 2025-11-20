import { Course } from '../models/course.model.js'
import { ApiError } from "../utils/ApiError.util.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { isValidObjectId } from 'mongoose'
import mongoose from 'mongoose'
import { isEnrolled } from '../utils/isEnrolled.util.js'

/**
 * Create a new course
 * @param {Object} courseData - Course creation data
 * @returns {Promise<Object>} Created course object
 */
const createCourse = async ({ title, description, paid, price, validity, curriculum, preRequisites, instructor, thumbnailLocalPath }) => {
    console.log("Creating course with data:", { title, description, paid, price, validity })

    if ([title, description, paid, price, validity].some(field => !field || field.toString().trim() === "")) {
        throw new ApiError(400, "ALL fields are required")
    }

    if (!curriculum?.length) {
        throw new ApiError(400, "Curriculum is required")
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail file is required")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    console.log(thumbnail)

    const createdCourse = await Course.create({
        title,
        description,
        paid,
        price,
        validity,
        preRequisites,
        thumbnail: thumbnail.url,
        instructor,
        curriculum
    })

    console.log(createdCourse)

    if (!createdCourse) {
        throw new ApiError(500, "Failed to create course")
    }

    return createdCourse
}

/**
 * Update course details
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID (instructor)
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated course object
 */
const updateCourse = async (courseId, userId, { title, description, paid, price, validity, curriculum, preRequisites }) => {
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid course id")
    }

    const course = await Course.findById(courseId)
    if (!course) {
        throw new ApiError(404, "Course not found")
    }

    if (course.instructor.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this course")
    }

    if ([title, description, paid, price, validity, curriculum].some(field => !field || field.toString().trim() === "")) {
        throw new ApiError(400, "ALL fields are required")
    }

    const courseCurriculum = curriculum.split(",")

    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                title,
                description,
                paid,
                price,
                validity,
                preRequisites: preRequisites,
                curriculum: courseCurriculum
            }
        },
        {
            new: true
        }
    )

    if (!updatedCourse) {
        throw new ApiError(404, "Course not found")
    }

    return updatedCourse
}

/**
 * Delete a course
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID (instructor)
 * @returns {Promise<void>}
 */
const deleteCourse = async (courseId, userId) => {
    console.log(courseId)

    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid Course Id")
    }

    const course = await Course.findById(courseId)
    console.log(course)
    if (!course) {
        throw new ApiError(404, "Course not found")
    }

    if (course.instructor?.toString() !== userId?.toString()) {
        throw new ApiError(403, "You are not authorized to delete this course")
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId)

    if (!deletedCourse) {
        throw new ApiError(404, "Error in deleting Course")
    }
}

/**
 * Toggle course publish status
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID (instructor)
 * @returns {Promise<Object>} Updated course object
 */
const togglePublishStatus = async (courseId, userId) => {
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid Course Id")
    }

    const course = await Course.findById(courseId)

    if (!course.instructor === userId) {
        throw new ApiError(403, "You are not authorized to publish this course")
    }

    course.isPublished = !course.isPublished
    const publishedCourse = await course.save()

    console.log(publishedCourse)

    if (!publishedCourse) {
        throw new ApiError(404, "Error in publishing Course")
    }

    return publishedCourse
}

/**
 * Get all published courses
 * @returns {Promise<Array>} Array of published courses
 */
const getAllPublishedCourses = async () => {
    const courses = await Course.find({
        isPublished: true
    }).populate(
        {
            path: 'instructor',
            select: 'name -_id'
        }
    )

    console.log(courses)
    if (!courses?.length) {
        throw new ApiError(404, "No Courses Found")
    }

    return courses
}

/**
 * Get course details by ID
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} Course details
 */
const getCourseDetails = async (courseId) => {
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid Course Id")
    }
    console.log(courseId)

    const course = await Course.findById(courseId).populate(
        {
            path: 'instructor',
            select: 'name email'
        }
    ).select("-sections")

    if (!course) {
        throw new ApiError(404, "Course Not Found")
    }

    return course
}

/**
 * Get full course content (for enrolled users)
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Course content with sections and lessons
 */
const getCourseContent = async (courseId, userId) => {
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid Course Id")
    }

    const isEnrolledInCourse = await isEnrolled(courseId, userId)
    console.log(isEnrolledInCourse)
    if (!isEnrolledInCourse) {
        throw new ApiError(403, "You are not enrolled in this course")
    }

    const completeCourseDetails = await Course.aggregate([
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
                as: "content",
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
                        $project: {
                            title: 1,
                            lessons: 1
                        }
                    }
                ]
            }
        }
    ])

    if (!completeCourseDetails?.length) {
        throw new ApiError(404, "Course Content Not Found")
    }

    const courseContent = completeCourseDetails[0].content.map((section) => {
        return {
            sectionId: section._id,
            title: section.title,
            lessons: section.lessons.map((lesson) => {
                return {
                    lessonId: lesson._id,
                    title: lesson.title,
                    content: lesson.content
                }
            })
        }
    })

    if (!courseContent?.length) {
        throw new ApiError(404, "Course Content Not Found OR These Course Dont Have any Content yet")
    }

    return courseContent
}

export {
    createCourse,
    updateCourse,
    deleteCourse,
    togglePublishStatus,
    getAllPublishedCourses,
    getCourseDetails,
    getCourseContent
}
