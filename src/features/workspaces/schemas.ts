import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, 'Workspace name is required').max(256),
  // imageUrl: z
  //   .union([
  //     z.instanceof(File),
  //     z.string().transform((value) => (value === '' ? undefined : value)),
  //   ])
  //   .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => value || undefined),
    ])
    .optional(),
});
