import { Document, Types } from 'mongoose';

export type ObjectId = Types.ObjectId;

export interface TimestampFields {
  createdAt: Date;
  updatedAt: Date;
}

export type WithId<T> = T & { _id: ObjectId };
export type WithTimestamps<T> = T & TimestampFields;
export type MongoDocument<T> = Document & WithId<T> & WithTimestamps<T>;

