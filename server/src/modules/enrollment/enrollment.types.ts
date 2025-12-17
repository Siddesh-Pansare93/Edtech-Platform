import { EnrollmentDocument } from './enrollment.model';

export type EnrollmentStatus = 'completed' | 'inProgress';

export interface VerifyEnrollmentDTO {
  success: boolean;
  courseIds?: string[];
}

export { EnrollmentDocument };
