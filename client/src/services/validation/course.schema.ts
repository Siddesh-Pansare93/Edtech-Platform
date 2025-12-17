import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  paid: z.boolean(),
  price: z.number().min(0).optional(),
  validity: z.string().min(1, 'Validity is required'),
  curriculum: z.string().min(1, 'Curriculum is required'),
  preRequisites: z.string().optional(),
  thumbnail: z.instanceof(File, { message: 'Thumbnail is required' }),
}).refine((data) => {
  if (data.paid && !data.price) return false;
  return true;
}, {
  message: 'Price is required for paid courses',
  path: ['price'],
});

export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  paid: z.boolean().optional(),
  price: z.number().min(0).optional(),
  validity: z.string().optional(),
  curriculum: z.array(z.string()).optional(),
  preRequisites: z.array(z.string()).optional(),
});

export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
export type UpdateCourseFormData = z.infer<typeof updateCourseSchema>;
