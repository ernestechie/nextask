import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, 'Password must be at least 8 digits'),
});
