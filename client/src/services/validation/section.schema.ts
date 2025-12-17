import { z } from 'zod';

export const createSectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  order: z.number().min(1, 'Order must be at least 1'),
});

export const updateSectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
});

export type CreateSectionFormData = z.infer<typeof createSectionSchema>;
export type UpdateSectionFormData = z.infer<typeof updateSectionSchema>;
