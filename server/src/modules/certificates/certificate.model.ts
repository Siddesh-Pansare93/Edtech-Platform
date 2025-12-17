import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface ICertificate {
  user: Types.ObjectId;
  course: Types.ObjectId;
  IssueDate: Date;
  certificateUrl: string;
}

export type CertificateDocument = Document & ICertificate;

type CertificateModel = Model<ICertificate>;

const certificateSchema = new Schema<ICertificate, CertificateModel>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  IssueDate: { type: Date, required: true },
  certificateUrl: { type: String, required: true }
}, { timestamps: true });

export const Certificate = mongoose.model<ICertificate, CertificateModel>('Certificate', certificateSchema);
