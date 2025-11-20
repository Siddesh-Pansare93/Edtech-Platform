import { isValidObjectId } from 'mongoose'
import { Section } from '../models/section.model.js'
import { Course } from "../models/course.model.js"
import { isInstructorOfCourse } from '../utils/isInstructor.util.js'
import { ApiError } from '../utils/ApiError.util.js'

/**
 * Create a new section in a course
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID (instructor)
 * @param {Object} sectionData - Section data
 * @param {string} sectionData.title - Section title
 * @param {number} [sectionData.order] - Section order
 * @returns {Promise<Object>} Created section object
 */
const createSection = async (courseId, userId, { title, order }) => {
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid Course Id")
    }

    // Checking if user is instructor of this course
    const isInstructor = await isInstructorOfCourse(courseId, userId)
    if (!isInstructor) {
        throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
    }

    const course = await Course.findById(courseId)
    if (!course) {
        throw new ApiError(400, "Course not Found")
    }

    const createdSection = await Section.create({
        title,
        order,
    })

    if (!createdSection) {
        throw new ApiError(400, "Failed to create section")
    }

    course.sections.push(createdSection._id)
    await course.save()

    return createdSection
}

/**
 * Update section details
 * @param {string} courseId - Course ID
 * @param {string} sectionId - Section ID
 * @param {string} userId - User ID (instructor)
 * @param {Object} updateData - Update data
 * @param {string} [updateData.title] - New section title
 * @returns {Promise<Object>} Updated section object
 */
const updateSection = async (courseId, sectionId, userId, { title }) => {
    if (!(isValidObjectId(courseId) || isValidObjectId(sectionId))) {
        throw new ApiError(400, "Invalid Course Id or Section Id")
    }

    // Checking if user is instructor of this course
    const isInstructor = isInstructorOfCourse(courseId, userId)
    if (!isInstructor) {
        throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
    }

    const course = await Course.findById(courseId)
    if (!course) {
        throw new ApiError(400, "Course not Found")
    }

    const updatedSection = await Section.findByIdAndUpdate(
        sectionId,
        {
            $set: {
                title,
            }
        },
        {
            new: true
        }
    )

    if (!updatedSection) {
        throw new ApiError(404, "Failed to update section")
    }

    return updatedSection
}

/**
 * Delete a section from a course
 * @param {string} courseId - Course ID
 * @param {string} sectionId - Section ID
 * @param {string} userId - User ID (instructor)
 * @returns {Promise<Object>} Deleted section object
 */
const deleteSection = async (courseId, sectionId, userId) => {
    if (!(isValidObjectId(sectionId) || isValidObjectId(courseId))) {
        throw new ApiError(400, "Invalid Section Id or Course Id")
    }

    // Checking if user is instructor of this course
    const isInstructor = isInstructorOfCourse(courseId, userId)
    if (!isInstructor) {
        throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
    }

    const section = await Section.findById(sectionId)
    if (!section) {
        throw new ApiError(404, "Section not found")
    }

    // Deleting section from sections array in course
    const updateCourse = Course.findByIdAndUpdate(
        courseId,
        {
            $pull: { sections: sectionId }
        }
    )

    if (!updateCourse) {
        throw new ApiError(404, "Course not found or error in deleting section from course")
    }

    // Deleting section document
    const deletedSection = await Section.findByIdAndDelete(sectionId)

    return deletedSection
}

export {
    createSection,
    updateSection,
    deleteSection
}
