import { Lesson } from './lesson.types';

export interface Section {
  _id: string;
  title: string;
  lessons: string[] | Lesson[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
