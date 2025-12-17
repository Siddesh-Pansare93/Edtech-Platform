export interface Progress {
  _id: string;
  user: string;
  course: string;
  completedLessons: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProgressStats {
  progress: Progress | null;
  message: string;
}
