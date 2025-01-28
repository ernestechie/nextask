import { processFileInput } from '@/lib/utils';
import { z } from 'zod';

export const fileOrUrlSchema = z.preprocess(
  processFileInput,
  z
    .union([
      z.instanceof(File),
      z.string().transform((value) => value || undefined),
    ])
    .optional()
);

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, 'Workspace name is required').max(256),
  image: fileOrUrlSchema,
});
