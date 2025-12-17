import { z } from 'zod';

export const createCertificateSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
    certificateUrl: z.string().url("Invalid certificate URL")
  })
});

export type CreateCertificateInput = z.infer<typeof createCertificateSchema>['body'];
