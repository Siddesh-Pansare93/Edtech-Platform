import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IProgress {
  course: Types.ObjectId;
  user: Types.ObjectId;
  completedVideos: Types.ObjectId[];
}

export type ProgressDocument = Document & IProgress;

type ProgressModel = Model<IProgress>;

const courseProgressSchema = new Schema<IProgress, ProgressModel>({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  completedVideos: [{ type: Schema.Types.ObjectId, ref: "Lesson" }]
});

export const CourseProgress = mongoose.model<IProgress, ProgressModel>('CourseProgress', courseProgressSchema);
