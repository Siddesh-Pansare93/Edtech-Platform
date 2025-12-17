import { z } from 'zod';

export const purchaseSchema = z.object({
  courseIds: z.array(z.string().min(1)).min(1, 'At least one course must be selected'),
});

export type PurchaseFormData = z.infer<typeof purchaseSchema>;
