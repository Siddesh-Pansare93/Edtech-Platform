import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface ISection {
  title: string;
  lessons: Types.ObjectId[];
  order: number;
}

export type SectionDocument = Document & ISection;

type SectionModel = Model<ISection>;

const sectionSchema = new Schema<ISection, SectionModel>({
  title: { type: String, required: true, trim: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  order: { type: Number, required: true }
}, { timestamps: true });

export const Section = mongoose.model<ISection, SectionModel>('Section', sectionSchema);
