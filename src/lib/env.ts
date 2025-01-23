import { z } from 'zod';

const envSchema = z.object({
  PUBLIC_APP_URL: z.string().min(1),
  APPWRITE_KEY: z.string().min(1),
  APPWRITE_PROJECT_ID: z.string().min(1),
  APPWRITE_ENDPOINT: z.string().min(1),
  APPWRITE_DATABASE_ID: z.string().min(1),
});

export const ENV = envSchema.parse({
  PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  APPWRITE_KEY: process.env.NEXT_PUBLIC_APPWRITE_KEY,
  APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
});
