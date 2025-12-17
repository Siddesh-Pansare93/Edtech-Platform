import { z } from 'zod';

export const createLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    order: z.number().int().positive().optional()
  }),
  params: z.object({
    courseId: z.string().min(1),
    sectionId: z.string().min(1)
  })
});

export const updateLessonSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional()
  }),
  params: z.object({
    courseId: z.string().min(1),
    lessonId: z.string().min(1)
  })
});

export const deleteLessonSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
    sectionId: z.string().min(1),
    lessonId: z.string().min(1)
  })
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>['body'];
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>['body'];
