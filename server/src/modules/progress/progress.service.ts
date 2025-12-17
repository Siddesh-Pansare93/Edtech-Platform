import { CourseProgress } from './progress.model';
import { Course } from '@/modules/courses/course.model';
import { ApiError } from '@/shared/utils/ApiError.util';
import mongoose from 'mongoose';
import { ProgressStats } from './progress.types';

export const updateProgress = async (courseId: string, lessonId: string, userId: string): Promise<ProgressStats> => {
  const courseProgress = await CourseProgress.findOne({
    user: userId,
    course: courseId
  });

  if (!courseProgress) {
    const courseProgressCreation = await CourseProgress.create({
      user: userId,
      course: courseId,
      completedVideos: [lessonId]
    });

    return { progress: courseProgressCreation, message: "Lesson Completed Successfully" };
  }

  const isLessonCompleted = courseProgress.completedVideos.some(
    (id: any) => id.toString() === lessonId
  );

  if (isLessonCompleted) {
    return { progress: null, message: "Lesson Already Completed" };
  }

  courseProgress.completedVideos.push(lessonId as any);
  await courseProgress.save();

  return { progress: courseProgress, message: "Lesson Completed Successfully" };
};

export const getProgress = async (courseId: string, userId: string): Promise<number> => {
  const courseProgress = await CourseProgress.findOne({
    user: userId,
    course: courseId
  });

  if (!courseProgress) {
    return 0;
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
  ]);

  const totalLessons = totalLessonsInCourse[0]?.totalLessons || 0;

  if (totalLessons === 0) {
    return 0;
  }

  const completedLessons = courseProgress.completedVideos?.length || 0;
  const progress = (completedLessons / totalLessons) * 100;

  return progress;
};
