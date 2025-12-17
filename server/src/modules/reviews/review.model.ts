import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IReview {
  user: Types.ObjectId;
  course: Types.ObjectId;
  rating: number;
  review: string;
}

export type ReviewDocument = Document & IReview;

type ReviewModel = Model<IReview>;

const reviewSchema = new Schema<IReview, ReviewModel>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true }
}, { timestamps: true });

export const Review = mongoose.model<IReview, ReviewModel>('Review', reviewSchema);
