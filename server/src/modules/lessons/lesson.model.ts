import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILesson {
  title: string;
  content: string;
  order?: number;
}

export type LessonDocument = Document & ILesson;

type LessonModel = Model<ILesson>;

const lessonSchema = new Schema<ILesson, LessonModel>({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  order: { type: Number }
}, { timestamps: true });

export const Lesson = mongoose.model<ILesson, LessonModel>('Lesson', lessonSchema);
