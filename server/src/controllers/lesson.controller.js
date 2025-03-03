import { isValidObjectId } from "mongoose"
import { Lesson } from "../models/lesson.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.util.js"
import { Course } from "../models/course.model.js"
import { Section } from "../models/section.model.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { isInstructorOfCourse } from "../utils/isInstructor.util.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/Cloudinary.js"


const handleAddLesson = asyncHandler(async (req, res) => {
    try {
        console.log("request received")
        const { courseId, sectionId } = req.params
        const { title, content, order } = req.body

        if (!(isValidObjectId(courseId) && isValidObjectId(sectionId))) {
            throw new ApiError(400, "Invalid Course Id or Section Id")
        }

        //Checking if user is instructor of this course
        const isInstructor = isInstructorOfCourse(courseId)
        if (!isInstructor) {
            throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
        }

        console.log("body : ", req.body)
        console.log("content: ", req.file)

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

        const videoLocalPath = req.file?.path
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

        //Adding lesson to lesson array in asssociated section document

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

        res
            .status(201)
            .json(
                new ApiResponse(200, createdLesson, "Lesson Created Successfully")
            )


    } catch (error) {
        res
            .status(500)
            .json(new ApiResponse(400, `ERROR : Failed to create Lesson : ${error.message}`))
    }
})


const handleUpdateLesson = asyncHandler(async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const { title } = req.body;

        if (!(isValidObjectId(lessonId) && isValidObjectId(courseId))) {
            throw new ApiError(400, "Invalid Lesson Id or Course Id");
        }

        // Checking if user is the instructor of this course
        const isInstructor = isInstructorOfCourse(courseId);
        if (!isInstructor) {
            throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action");
        }

        // Fetch the existing lesson
        const existingLesson = await Lesson.findById(lessonId);
        if (!existingLesson) {
            throw new ApiError(404, "Lesson not found");
        }

        let videoUrl = existingLesson.content; // Keep existing video if no new one is uploaded

        if (req.file) {
            const videoLocalPath = req.file?.path;

            // Upload new video to Cloudinary
            const videoResponseFromCloudinary = await uploadOnCloudinary(videoLocalPath);
            if (!videoResponseFromCloudinary) {
                throw new ApiError(500, "Failed to upload new video to Cloudinary");
            }

            videoUrl = videoResponseFromCloudinary.secure_url;

            // Delete previous video from Cloudinary
            if (existingLesson.content) {
                await deleteFromCloudinary(existingLesson.content);
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
        );

        if (!updatedLesson) {
            throw new ApiError(500, "Error updating lesson in database");
        }

        res.status(200).json(new ApiResponse(200, updatedLesson, "Lesson Updated Successfully"));
    } catch (error) {
        res.status(400).json(new ApiResponse(400, `ERROR: Failed to update Lesson: ${error.message}`));
    }
});



const handleDeleteLesson = asyncHandler(async (req, res) => {
    try {
        const { courseId, sectionId, lessonId } = req.params

        if (!(isValidObjectId(lessonId) || isValidObjectId(sectionId))) {
            throw new ApiError(400, "Invalid Lesson Id")
        }


        //Checking if user is instructor of this course
        const isInstructor = isInstructorOfCourse(courseId)
        if (!isInstructor) {
            throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
        }

        const lessonTobeDeleted = await Lesson.findById(lessonId)
       
        
        const cloudinaryResponse = await deleteFromCloudinary(lessonTobeDeleted?.content)
        console.log(cloudinaryResponse)
        //deleting lesson document
        const deletedLesson = await Lesson.findByIdAndDelete(lessonId)
        if (!deletedLesson) {
            throw new ApiError(404, "error occured while deleting lesson in database")
        }

        //Removing lesson id from lesson array in particular section
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

        res
            .status(200)
            .json(new ApiResponse(200, deletedLesson, "Lesson Deleted Successfully"))

    } catch (error) {
        res
            .status(400)
            .json(new ApiResponse(400, `ERROR : Failed to delete Lesson : ${error.message}`))
    }
})

export {
    handleAddLesson,
    handleUpdateLesson,
    handleDeleteLesson

}