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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/svg',
  'image/png',
  'image/webp',
  'image/avif',
];

const fileSchema = z
  .any()
  .refine((file) => {
    if (!file) return `Please attach a valid image.`;
    if (file?.size <= MAX_FILE_SIZE) return `Max image size is 5MB.`;
  })
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  )
  .or(z.string().transform((value) => value || undefined))
  .optional();

const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.'
  );

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, 'Workspace name is required').max(256),
  image: z
    .union([imageSchema, z.string().transform((value) => value || undefined)])
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Must be 1 or more characters')
    .max(256)
    .optional(),
  image: z
    .union([imageSchema, z.string().transform((value) => value || undefined)])
    .optional(),
});
