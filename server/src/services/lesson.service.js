import { isValidObjectId } from "mongoose"
import { Lesson } from "../models/lesson.model.js"
import { ApiError } from "../utils/ApiError.util.js"
import { Course } from "../models/course.model.js"
import { Section } from "../models/section.model.js"
import { isInstructorOfCourse } from "../utils/isInstructor.util.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/Cloudinary.js"

/**
 * Add a new lesson to a section
 * @param {string} courseId - Course ID
 * @param {string} sectionId - Section ID
 * @param {Object} lessonData - Lesson data
 * @param {string} lessonData.title - Lesson title
 * @param {string} [lessonData.content] - Lesson content
 * @param {number} [lessonData.order] - Lesson order
 * @param {string} [lessonData.videoLocalPath] - Local path to video file
 * @returns {Promise<Object>} Created lesson object
 */
const addLesson = async (courseId, sectionId, { title, content, order, videoLocalPath }) => {
    console.log("request received")

    if (!(isValidObjectId(courseId) && isValidObjectId(sectionId))) {
        throw new ApiError(400, "Invalid Course Id or Section Id")
    }

    // Checking if user is instructor of this course
    const isInstructor = isInstructorOfCourse(courseId)
    if (!isInstructor) {
        throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
    }

    console.log("content: ", videoLocalPath)

    if (!title) {
        throw new ApiError(400, "Please fill in all fields")
    }

    const course = await Course.findById(courseId)

    if (!course?.sections?.includes(sectionId)) {
        throw new ApiError(400, "This Course doesn't contain this section")
    }

    const section = await Section.findById(sectionId)

    if (!section) {
        throw new ApiError(404, "Section not found")
    }

    console.log(videoLocalPath)

    const videoResponseFromCLoudinary = await uploadOnCloudinary(videoLocalPath)
    console.log(videoResponseFromCLoudinary)
    const videoUrl = videoResponseFromCLoudinary.secure_url

    const createdLesson = await Lesson.create({
        title,
        content: videoUrl,
        order,
    })

    if (!createdLesson) {
        throw new ApiError(500, "Failed to create lesson")
    }

    // Adding lesson to lesson array in associated section document
    const lessonAddedToSection = await Section.findByIdAndUpdate(
        sectionId,
        {
            $addToSet: { lessons: createdLesson._id },
        },
        {
            new: true,
        }
    )

    if (!lessonAddedToSection) {
        throw new ApiError(500, "Failed to add lesson to section")
    }

    return createdLesson
}

/**
 * Update an existing lesson
 * @param {string} courseId - Course ID
 * @param {string} lessonId - Lesson ID
 * @param {Object} updateData - Update data
 * @param {string} [updateData.title] - New lesson title
 * @param {string} [updateData.videoLocalPath] - New video local path
 * @returns {Promise<Object>} Updated lesson object
 */
const updateLesson = async (courseId, lessonId, { title, videoLocalPath }) => {
    if (!(isValidObjectId(lessonId) && isValidObjectId(courseId))) {
        throw new ApiError(400, "Invalid Lesson Id or Course Id")
    }

    // Checking if user is the instructor of this course
    const isInstructor = isInstructorOfCourse(courseId)
    if (!isInstructor) {
        throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
    }

    // Fetch the existing lesson
    const existingLesson = await Lesson.findById(lessonId)
    if (!existingLesson) {
        throw new ApiError(404, "Lesson not found")
    }

    let videoUrl = existingLesson.content // Keep existing video if no new one is uploaded

    if (videoLocalPath) {
        // Upload new video to Cloudinary
        const videoResponseFromCloudinary = await uploadOnCloudinary(videoLocalPath)
        if (!videoResponseFromCloudinary) {
            throw new ApiError(500, "Failed to upload new video to Cloudinary")
        }

        videoUrl = videoResponseFromCloudinary.secure_url

        // Delete previous video from Cloudinary
        if (existingLesson.content) {
            await deleteFromCloudinary(existingLesson.content)
        }
    }

    // Update lesson in DB
    const updatedLesson = await Lesson.findByIdAndUpdate(
        lessonId,
        {
            $set: {
                title,
                content: videoUrl
            }
        },
        {
            new: true
        }
    )

    if (!updatedLesson) {
        throw new ApiError(500, "Error updating lesson in database")
    }

    return updatedLesson
}

/**
 * Delete a lesson
 * @param {string} courseId - Course ID
 * @param {string} sectionId - Section ID
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<Object>} Deleted lesson object
 */
const deleteLesson = async (courseId, sectionId, lessonId) => {
    if (!(isValidObjectId(lessonId) || isValidObjectId(sectionId))) {
        throw new ApiError(400, "Invalid Lesson Id")
    }

    // Checking if user is instructor of this course
    const isInstructor = isInstructorOfCourse(courseId)
    if (!isInstructor) {
        throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
    }

    const lessonTobeDeleted = await Lesson.findById(lessonId)

    const cloudinaryResponse = await deleteFromCloudinary(lessonTobeDeleted?.content)
    console.log(cloudinaryResponse)

    // Deleting lesson document
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId)
    if (!deletedLesson) {
        throw new ApiError(404, "error occured while deleting lesson in database")
    }

    // Removing lesson id from lesson array in particular section
    const lessonDeletedFromSection = await Section.findByIdAndUpdate(
        sectionId,
        {
            $pull: { lessons: lessonId }
        },
        { new: true }
    )

    if (!lessonDeletedFromSection) {
        throw new ApiError(404, "error occured while deleting lesson from section in database")
    }

    return deletedLesson
}

export {
    addLesson,
    updateLesson,
    deleteLesson
}
