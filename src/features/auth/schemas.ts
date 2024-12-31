import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, 'Password must be at least 8 digits'),
});

export const signupSchema = z.object({
  email: z.string().email('Email is invalid'),
  password: z.string().min(8, 'Password must be at least 8 digits'),
  fullName: z.string().min(1, 'Full name is required'),
});
