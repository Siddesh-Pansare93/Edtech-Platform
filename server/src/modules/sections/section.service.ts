import { isValidObjectId } from 'mongoose';
import { Section } from './section.model';
import { Course } from '@/modules/courses/course.model';
import { isInstructorOfCourse } from '@/shared/utils/isInstructor.util';
import { ApiError } from '@/shared/utils/ApiError.util';
import { CreateSectionDTO, UpdateSectionDTO } from './section.types';

export const createSection = async (courseId: string, userId: string, sectionData: CreateSectionDTO) => {
  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Course Id");
  }

  const isInstructor = await isInstructorOfCourse(courseId, userId);
  if (isInstructor !== 1) {
    throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(400, "Course not Found");
  }

  const createdSection = await Section.create({
    title: sectionData.title,
    order: sectionData.order,
  });

  if (!createdSection) {
    throw new ApiError(400, "Failed to create section");
  }

  course.sections.push(createdSection._id);
  await course.save();

  return createdSection;
};

export const updateSection = async (courseId: string, sectionId: string, userId: string, updateData: UpdateSectionDTO) => {
  if (!isValidObjectId(courseId) || !isValidObjectId(sectionId)) {
    throw new ApiError(400, "Invalid Course Id or Section Id");
  }

  const isInstructor = await isInstructorOfCourse(courseId, userId);
  if (isInstructor !== 1) {
    throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(400, "Course not Found");
  }

  const updatedSection = await Section.findByIdAndUpdate(
    sectionId,
    {
      $set: {
        title: updateData.title,
      }
    },
    { new: true }
  );

  if (!updatedSection) {
    throw new ApiError(404, "Failed to update section");
  }

  return updatedSection;
};

export const deleteSection = async (courseId: string, sectionId: string, userId: string) => {
  if (!isValidObjectId(sectionId) || !isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid Section Id or Course Id");
  }

  const isInstructor = await isInstructorOfCourse(courseId, userId);
  if (isInstructor !== 1) {
    throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action");
  }

  const section = await Section.findById(sectionId);
  if (!section) {
    throw new ApiError(404, "Section not found");
  }

  await Course.findByIdAndUpdate(
    courseId,
    {
      $pull: { sections: sectionId }
    }
  );

  const deletedSection = await Section.findByIdAndDelete(sectionId);
  return deletedSection;
};
