import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface ICourse {
  title: string;
  thumbnail: string;
  description: string;
  preRequisites: string[];
  curriculum: string[];
  instructor: Types.ObjectId;
  paid: boolean;
  price?: number;
  validity?: string;
  sections: Types.ObjectId[];
  isPublished: boolean;
}

export type CourseDocument = Document & ICourse;

type CourseModel = Model<ICourse>;

const courseSchema = new Schema<ICourse, CourseModel>({
  title: { type: String, required: true, trim: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  preRequisites: [{ type: String }],
  curriculum: [{ type: String, required: true, trim: true }],
  instructor: { type: Schema.Types.ObjectId, ref: "User" },
  paid: { type: Boolean, required: true },
  price: { type: Number },
  validity: { type: String },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export const Course = mongoose.model<ICourse, CourseModel>('Course', courseSchema);
