import { ENV } from '@/lib/env';
import { sessionMiddleware } from '@/lib/session-middleware';
import { getMimeType } from '@/lib/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID } from 'node-appwrite';
import { createWorkspaceSchema } from '../schemas';

const bufferToBase64 = (input: ArrayBuffer, type: string): string => {
  const buffer = Buffer.from(input);
  const url = buffer.toString('base64');

  return `data:${type};base64,${url}`;
};

const app = new Hono()
  .get('/', sessionMiddleware, async (ctx) => {
    const { json, status } = ctx;

    status(200);
    return json({
      status: 'success',
      message: 'Successful!',
      data: null,
    });
  })
  // POST | Create a new workspace
  .post(
    '/',
    zValidator('form', createWorkspaceSchema),
    sessionMiddleware,
    async ({ json, status, req, get }) => {
      try {
        const body = req.valid('form');

        const { name, image } = body;

        // Get the entities from current user session
        const user = get('user');
        const storage = get('storage');
        const databases = get('databases');

        // Handle Image uploading to appwrite.
        const bucketId = ENV.APPWRITE_IMAGES_STORAGE_BUCKET_ID;

        const mimeType = await getMimeType(image);
        const buffer = await image.arrayBuffer();

        const validatedFile = new File([buffer], image.name, {
          type: mimeType,
        });

        const file = await storage.createFile(
          bucketId,
          ID.unique(),
          validatedFile
        );

        console.log('File -> ', file);

        const arrayBuffer = await storage.getFilePreview(bucketId, file.$id);
        const imageUrl = bufferToBase64(arrayBuffer, image.type);

        const requestPayload = {
          name,
          userId: user.$id,
          imageUrl,
        };

        const workspace = await databases.createDocument(
          ENV.APPWRITE_DATABASE_ID,
          ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
          ID.unique(),
          requestPayload
        );

        status(201);
        return json({
          status: 'success',
          message: 'Workspace Created Successfully!',
          data: { workspace },
        });
      } catch (err) {
        console.log('Error -> ', err);
        const message =
          err instanceof Error ? err.message : 'Unexpected error occurred';

        status(400);
        return json({
          status: 'fail',
          message,
        });
      }
    }
  );

export default app;
