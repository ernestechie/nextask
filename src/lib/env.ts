import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const ENV = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
