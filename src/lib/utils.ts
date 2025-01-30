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

export async function getMimeType(file: File): Promise<string> {
  const buffer = await file.slice(0, 4).arrayBuffer();
  const view = new Uint8Array(buffer);

  // Check for JPEG, PNG, etc.
  if (view[0] === 0xff && view[1] === 0xd8 && view[2] === 0xff)
    return 'image/jpeg';
  if (
    view[0] === 0x89 &&
    view[1] === 0x50 &&
    view[2] === 0x4e &&
    view[3] === 0x47
  )
    return 'image/png';

  return file.type || 'application/octet-stream'; // Fallback
}
