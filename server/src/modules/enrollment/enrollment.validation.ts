import { z } from 'zod';

export const verifyEnrollmentSchema = z.object({
  body: z.object({
    success: z.boolean(),
    courseIds: z.array(z.string()).optional()
  })
});

export const checkEnrollmentSchema = z.object({
  params: z.object({
    courseId: z.string().min(1)
  })
});

export type VerifyEnrollmentInput = z.infer<typeof verifyEnrollmentSchema>['body'];
