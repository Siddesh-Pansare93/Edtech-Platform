import { CertificateDocument } from './certificate.model';

export interface CreateCertificateDTO {
  userId: string;
  courseId: string;
  certificateUrl: string;
}

export { CertificateDocument };
