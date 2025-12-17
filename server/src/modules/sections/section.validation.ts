import { z } from 'zod';

export const createSectionSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    order: z.number().int().positive()
  }),
  params: z.object({
    courseId: z.string().min(1)
  })
});

export const updateSectionSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required")
  }),
  params: z.object({
    courseId: z.string().min(1),
    sectionId: z.string().min(1)
  })
});

export const deleteSectionSchema = z.object({
  params: z.object({
    courseId: z.string().min(1),
    sectionId: z.string().min(1)
  })
});

export type CreateSectionInput = z.infer<typeof createSectionSchema>['body'];
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>['body'];
