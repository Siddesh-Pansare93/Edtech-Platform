import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(3).max(30),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['student', 'instructor']),
    skillLevel: z.string().min(1, "Skill level is required")
  })
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(1, "Password is required")
  }).refine((data: { username?: string; email?: string; password: string }) => data.username || data.email, {
    message: "Either username or email is required"
  })
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
