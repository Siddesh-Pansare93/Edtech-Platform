import { z } from 'zod';

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    paid: z.boolean(),
    price: z.number().positive().optional(),
    validity: z.string().min(1, "Validity is required"),
    curriculum: z.array(z.string()).min(1, "At least one curriculum item is required"),
    preRequisites: z.array(z.string()).optional()
  })
});

export const updateCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    paid: z.boolean().optional(),
    price: z.number().positive().optional(),
    validity: z.string().min(1).optional(),
    curriculum: z.array(z.string()).min(1).optional(),
    preRequisites: z.array(z.string()).optional()
  }),
  params: z.object({
    courseId: z.string().min(1)
  })
});

export const courseIdSchema = z.object({
  params: z.object({
    courseId: z.string().min(1)
  })
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>['body'];
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>['body'];
