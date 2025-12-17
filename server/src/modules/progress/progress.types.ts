import { ProgressDocument } from './progress.model';

export interface UpdateProgressDTO {
  courseId: string;
  lessonId: string;
}

export interface ProgressStats {
  progress: ProgressDocument | null;
  message: string;
}

export { ProgressDocument };
