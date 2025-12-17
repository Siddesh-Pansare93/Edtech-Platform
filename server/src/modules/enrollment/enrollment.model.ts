import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IEnrollment {
  course: Types.ObjectId;
  user: Types.ObjectId;
  status: 'completed' | 'inProgress';
}

export type EnrollmentDocument = Document & IEnrollment;

type EnrollmentModel = Model<IEnrollment>;

const enrollmentSchema = new Schema<IEnrollment, EnrollmentModel>({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["completed", "inProgress"], default: "inProgress" }
}, { timestamps: true });

export const Enrollment = mongoose.model<IEnrollment, EnrollmentModel>('Enrollment', enrollmentSchema);
