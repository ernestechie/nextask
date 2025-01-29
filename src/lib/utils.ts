import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// type FileLikeType =
//   | File
//   | string
//   | { name: string; type: string; content: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processFileInput = (input: any) => {
  if (input instanceof File) return input; // Already a File object
  if (typeof input === 'object' && input?.name && input?.type) {
    // Convert plain object to File
    return new File([input?.content || ''], input?.name, {
      type: input?.type,
    });
  }
  return input; // Return as is for URL validation
};
