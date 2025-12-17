import { z } from 'zod';

export const verifyEnrollmentSchema = z.object({
  success: z.boolean(),
  courseIds: z.string().optional(),
});

export type VerifyEnrollmentFormData = z.infer<typeof verifyEnrollmentSchema>;
