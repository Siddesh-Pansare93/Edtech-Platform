import { z } from 'zod';

export const purchaseCourseSchema = z.object({
  body: z.object({
    courses: z.array(z.string()).min(1, "At least one course ID is required")
  })
});

export type PurchaseCourseInput = z.infer<typeof purchaseCourseSchema>['body'];
