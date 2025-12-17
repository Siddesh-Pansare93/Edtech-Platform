import { LessonDocument } from './lesson.model';

export interface CreateLessonDTO {
  title: string;
  content?: string;
  order?: number;
  videoLocalPath?: string;
}

export interface UpdateLessonDTO {
  title?: string;
  videoLocalPath?: string;
}

export { LessonDocument };
