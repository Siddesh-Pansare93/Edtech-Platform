import { isValidObjectId } from "mongoose";
import { Lesson } from './lesson.model';
import { ApiError } from '@/shared/utils/ApiError.util';
import { Course } from '@/modules/courses/course.model';
import { Section } from '@/modules/sections/section.model';
import { isInstructorOfCourse } from '@/shared/utils/isInstructor.util';
import { uploadOnCloudinary, deleteFromCloudinary } from '@/shared/utils/Cloudinary';
import { CreateLessonDTO, UpdateLessonDTO } from './lesson.types';

export const addLesson = async (courseId: string, sectionId: string, userId: string, lessonData: CreateLessonDTO) => {
  if (!(isValidObjectId(courseId) && isValidObjectId(sectionId))) {
    throw new ApiError(400, "Invalid Course Id or Section Id");
  }

  const isInstructor = await isInstructorOfCourse(courseId, userId);
  if (isInstructor !== 1) {
    throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action");
  }

  if (!lessonData.title) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const course = await Course.findById(courseId);
  if (!course?.sections?.includes(sectionId as any)) {
    throw new ApiError(400, "This Course doesn't contain this section");
  }

  const section = await Section.findById(sectionId);
  if (!section) {
    throw new ApiError(404, "Section not found");
  }

  if (!lessonData.videoLocalPath) {
    throw new ApiError(400, "Video file is required");
  }

  const videoResponseFromCloudinary = await uploadOnCloudinary(lessonData.videoLocalPath);
  if (!videoResponseFromCloudinary) {
    throw new ApiError(500, "Failed to upload video");
  }

  const videoUrl = videoResponseFromCloudinary.secure_url;

  const createdLesson = await Lesson.create({
    title: lessonData.title,
    content: videoUrl,
    order: lessonData.order,
  });

  if (!createdLesson) {
    throw new ApiError(500, "Failed to create lesson");
  }

  await Section.findByIdAndUpdate(
    sectionId,
    {
      $addToSet: { lessons: createdLesson._id },
    },
    { new: true }
  );

  return createdLesson;
};

export const updateLesson = async (courseId: string, lessonId: string, userId: string, updateData: UpdateLessonDTO) => {
  if (!(isValidObjectId(lessonId) && isValidObjectId(courseId))) {
    throw new ApiError(400, "Invalid Lesson Id or Course Id");
  }

  const isInstructor = await isInstructorOfCourse(courseId, userId);
  if (isInstructor !== 1) {
    throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action");
  }

  const existingLesson = await Lesson.findById(lessonId);
  if (!existingLesson) {
    throw new ApiError(404, "Lesson not found");
  }

  let videoUrl = existingLesson.content;

  if (updateData.videoLocalPath) {
    const videoResponseFromCloudinary = await uploadOnCloudinary(updateData.videoLocalPath);
    if (!videoResponseFromCloudinary) {
      throw new ApiError(500, "Failed to upload new video to Cloudinary");
    }

    videoUrl = videoResponseFromCloudinary.secure_url;

    if (existingLesson.content) {
      await deleteFromCloudinary(existingLesson.content);
    }
  }

  const updatedLesson = await Lesson.findByIdAndUpdate(
    lessonId,
    {
      $set: {
        title: updateData.title || existingLesson.title,
        content: videoUrl
      }
    },
    { new: true }
  );

  if (!updatedLesson) {
    throw new ApiError(500, "Error updating lesson in database");
  }

  return updatedLesson;
};

export const deleteLesson = async (courseId: string, sectionId: string, lessonId: string, userId: string) => {
  if (!(isValidObjectId(lessonId) || isValidObjectId(sectionId))) {
    throw new ApiError(400, "Invalid Lesson Id");
  }

  const isInstructor = await isInstructorOfCourse(courseId, userId);
  if (isInstructor !== 1) {
    throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action");
  }

  const lessonToBeDeleted = await Lesson.findById(lessonId);
  if (lessonToBeDeleted?.content) {
    await deleteFromCloudinary(lessonToBeDeleted.content);
  }

  const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
  if (!deletedLesson) {
    throw new ApiError(404, "error occured while deleting lesson in database");
  }

  await Section.findByIdAndUpdate(
    sectionId,
    {
      $pull: { lessons: lessonId }
    },
    { new: true }
  );

  return deletedLesson;
};
