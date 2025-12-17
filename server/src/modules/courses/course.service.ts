import { Course } from './course.model';
import { ApiError } from '@/shared/utils/ApiError.util';
import { uploadOnCloudinary } from '@/shared/utils/Cloudinary';
import { isValidObjectId, Types } from 'mongoose';
import mongoose from 'mongoose';
import { isEnrolled } from '@/shared/utils/isEnrolled.util';
import { CreateCourseDTO, UpdateCourseDTO } from './course.types';

export const createCourse = async (courseData: CreateCourseDTO) => {
  const { title, description, paid, price, validity, curriculum, preRequisites, instructor, thumbnailLocalPath } = courseData;

  if ([title, description, paid, validity].some(field => !field || field.toString().trim() === "")) {
    throw new ApiError(400, "ALL fields are required");
  }

  if (!curriculum?.length) {
    throw new ApiError(400, "Curriculum is required");
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail file is required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new ApiError(400, "Failed to upload thumbnail");
  }

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
  });

  if (!createdCourse) {
    throw new ApiError(500, "Failed to create course");
  }

  return createdCourse;
};

export const updateCourse = async (courseId: string, userId: string, updateData: UpdateCourseDTO) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid course id");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.instructor.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this course");
  }

  const { title, description, paid, price, validity, curriculum, preRequisites } = updateData;

  if ([title, description, paid, validity].some(field => !field || field.toString().trim() === "")) {
    throw new ApiError(400, "ALL fields are required");
  }

  // Curriculum is already typed as string[] in UpdateCourseDTO, so we can use it directly
  const courseCurriculum: string[] = Array.isArray(curriculum) ? curriculum : [];
  
  if (courseCurriculum.length === 0) {
    throw new ApiError(400, "Curriculum cannot be empty");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: {
        title,
        description,
        paid,
        price,
        validity,
        preRequisites: preRequisites || [],
        curriculum: courseCurriculum
      }
    },
    { new: true }
  );

  if (!updatedCourse) {
    throw new ApiError(404, "Course not found");
  }

  return updatedCourse;
};

export const deleteCourse = async (courseId: string, userId: string) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Course Id");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.instructor.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this course");
  }

  const deletedCourse = await Course.findByIdAndDelete(courseId);
  if (!deletedCourse) {
    throw new ApiError(404, "Error in deleting Course");
  }
};

export const togglePublishStatus = async (courseId: string, userId: string) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Course Id");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (course.instructor.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to publish this course");
  }

  course.isPublished = !course.isPublished;
  const publishedCourse = await course.save();

  if (!publishedCourse) {
    throw new ApiError(404, "Error in publishing Course");
  }

  return publishedCourse;
};

export const getAllPublishedCourses = async () => {
  const courses = await Course.find({
    isPublished: true
  }).populate({
    path: 'instructor',
    select: 'name -_id'
  });

  if (!courses?.length) {
    throw new ApiError(404, "No Courses Found");
  }

  return courses;
};

export const getCourseDetails = async (courseId: string) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Course Id");
  }

  const course = await Course.findById(courseId).populate({
    path: 'instructor',
    select: 'name email'
  }).select("-sections");

  if (!course) {
    throw new ApiError(404, "Course Not Found");
  }

  return course;
};

export const getCourseContent = async (courseId: string, userId: string) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Course Id");
  }

  const isEnrolledInCourse = await isEnrolled(courseId, userId);
  if (!isEnrolledInCourse) {
    throw new ApiError(403, "You are not enrolled in this course");
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
  ]);

  if (!completeCourseDetails?.length) {
    throw new ApiError(404, "Course Content Not Found");
  }

  const courseContent = completeCourseDetails[0].content.map((section: any) => {
    return {
      sectionId: section._id,
      title: section.title,
      lessons: section.lessons.map((lesson: any) => {
        return {
          lessonId: lesson._id,
          title: lesson.title,
          content: lesson.content
        };
      })
    };
  });

  if (!courseContent?.length) {
    throw new ApiError(404, "Course Content Not Found OR These Course Dont Have any Content yet");
  }

  return courseContent;
};
