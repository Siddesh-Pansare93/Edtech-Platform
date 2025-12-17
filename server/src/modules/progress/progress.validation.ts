import { z } from 'zod';

export const updateProgressSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
    lessonId: z.string().min(1)
  })
});

export const getProgressSchema = z.object({
  params: z.object({
    courseId: z.string().min(1)
  })
});
