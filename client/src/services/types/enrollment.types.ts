export interface Enrollment {
  _id: string;
  user: string;
  course: string;
  status: 'completed' | 'inProgress';
  createdAt?: string;
  updatedAt?: string;
}
