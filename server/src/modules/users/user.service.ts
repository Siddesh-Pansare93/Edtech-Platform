import { ApiError } from '@/shared/utils/ApiError.util';
import { User } from './user.model';
import { Enrollment } from '@/modules/enrollment/enrollment.model';
import { Course } from '@/modules/courses/course.model';
import { UpdateProfileDTO, ChangePasswordDTO } from './user.types';
import mongoose from 'mongoose';

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  updateData: UpdateProfileDTO
) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name: updateData.name,
        email: updateData.email,
        username: updateData.username,
        skillLevel: updateData.skillLevel,
        role: updateData.role
      }
    },
    {
      new: true
    }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User Not Found");
  }

  return updatedUser;
};

/**
 * Change user password
 */
export const changePassword = async (
  userId: string,
  passwords: ChangePasswordDTO
) => {
  const { oldPassword, newPassword } = passwords;

  if (oldPassword === newPassword) {
    throw new ApiError(400, "Old Password and New Password cannot be the same. Please choose a different password");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();
};

/**
 * Get courses enrolled by a user
 */
export const getEnrolledCourses = async (userId: string) => {
  const enrolledCourses = await Enrollment.find({
    user: userId
  }).select("course").populate({
    path: "course",
    populate: {
      path: "instructor",
      select: "name"
    }
  });

  return enrolledCourses;
};

/**
 * Get courses created by an instructor
 */
export const getCreatedCourses = async (userId: string) => {
  const instructorCourses = await Course.aggregate([
    {
      $match: {
        instructor: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: "enrollments",
        localField: "_id",
        foreignField: "course",
        as: "enrolledStudents",
      }
    },
    {
      $addFields: {
        enrolledStudents: { $size: "$enrolledStudents" }
      }
    },
  ]);

  const courseStatics = {
    totalCourses: instructorCourses.length,
    totalEnrolledStudents: instructorCourses.reduce((acc: number, course: any) => acc + course.enrolledStudents, 0),
    instructorCourses
  };

  return courseStatics;
};
