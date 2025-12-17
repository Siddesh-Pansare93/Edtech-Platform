import { z } from 'zod';

export const createLessonSchema = z.object({
  title: z.string().min(1, 'Lesson title is required'),
  order: z.number().min(1, 'Order must be at least 1'),
  content: z.instanceof(File, { message: 'Video content is required' }),
});

export const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.instanceof(File).optional(),
});

export type CreateLessonFormData = z.infer<typeof createLessonSchema>;
export type UpdateLessonFormData = z.infer<typeof updateLessonSchema>;
