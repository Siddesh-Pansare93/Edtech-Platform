import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    username: z.string().min(3).max(30).optional(),
    email: z.string().email().optional(),
    skillLevel: z.string().min(1).optional(),
    role: z.enum(['student', 'instructor']).optional()
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters")
  }).refine((data: { oldPassword: string; newPassword: string }) => data.oldPassword !== data.newPassword, {
    message: "Old password and new password cannot be the same",
    path: ["newPassword"]
  })
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>['body'];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>['body'];

