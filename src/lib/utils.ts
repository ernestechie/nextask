import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FileLikeType =
  | File
  | string
  | { name: string; type: string; content: string };

export const processFileInput = (input: FileLikeType) => {
  if (input instanceof File) return input; // Already a File object
  if (typeof input === 'object' && input?.name && input?.type) {
    // Convert plain object to File
    const newFile: File = new File([input?.content || ''], input?.name, {
      type: input?.type,
    });
    return newFile;
  }
  return input; // Return as is for URL validation
};
