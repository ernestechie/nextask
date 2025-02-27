import { ENV } from '@/lib/env';
import { sessionMiddleware } from '@/lib/session-middleware';
// import { getMimeType } from '@/lib/utils';
import { MemberRole } from '@/features/members/types';
import { getMember } from '@/features/members/utils';
import { generateInviteCode } from '@/lib/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { createWorkspaceSchema, updateWorkspaceSchema } from '../schemas';

const bufferToBase64 = (input: ArrayBuffer, type: string): string => {
  const buffer = Buffer.from(input);
  const url = buffer.toString('base64');

  return `data:${type};base64,${url}`;
};

const app = new Hono()
  .get('/', sessionMiddleware, async (ctx) => {
    const { json, status } = ctx;

    const user = ctx.get('user');
    const databases = ctx.get('databases');

    const members = await databases.listDocuments(
      ENV.APPWRITE_DATABASE_ID,
      ENV.APPWRITE_DATABASE_MEMBERS_COLLECTION_ID,
      // Write a query to appwrite database
      [Query.equal('userId', user.$id)]
    );

    if (members.total === 0) {
      status(200);
      return json({
        status: 'success',
        message: 'No members found for this user',
        data: { workspaces: null },
      });
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      ENV.APPWRITE_DATABASE_ID,
      ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
      // Write a query to appwrite database for sorting
      [Query.orderDesc('$createdAt'), Query.contains('$id', workspaceIds)]
    );

    status(200);
    return json({
      status: 'success',
      message: 'Workspaces retrieved successfully!',
      data: { workspaces },
    });
  })
  // POST | Create a new workspace
  .post(
    '/',
    zValidator('form', createWorkspaceSchema),
    sessionMiddleware,
    async ({ json, status, req, get }) => {
      try {
        const { name, image } = req.valid('form');

        // Get the entities from current user session
        const user = get('user');
        const storage = get('storage');
        const databases = get('databases');

        // Handle Image uploading to appwrite.
        const bucketId = ENV.APPWRITE_IMAGES_STORAGE_BUCKET_ID;

        // const mimeType = await getMimeType(image);
        // const buffer = await image.arrayBuffer();

        // const validatedFile = new File([buffer], image.name, {
        //   type: mimeType,
        // });

        let imageUrl: string | undefined;

        if (image instanceof File) {
          const file = await storage.createFile(bucketId, ID.unique(), image);

          console.log('File -> ', file);

          const arrayBuffer = await storage.getFilePreview(bucketId, file.$id);
          imageUrl = bufferToBase64(arrayBuffer, image?.type);
        }

        const requestPayload = {
          name,
          userId: user.$id,
          imageUrl,
          inviteCode: generateInviteCode(10),
        };

        const workspace = await databases.createDocument(
          ENV.APPWRITE_DATABASE_ID,
          ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
          ID.unique(),
          requestPayload
        );

        await databases.createDocument(
          ENV.APPWRITE_DATABASE_ID,
          ENV.APPWRITE_DATABASE_MEMBERS_COLLECTION_ID,
          ID.unique(),
          {
            userId: user.$id,
            workspaceId: workspace.$id,
            role: MemberRole.ADMIN,
          }
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
          data: { workspace: null },
        });
      }
    }
  )
  .patch(
    '/:workspaceId',
    zValidator('form', updateWorkspaceSchema),
    sessionMiddleware,
    async ({ json, status, req, get }) => {
      try {
        const { name, image } = req.valid('form');
        const { workspaceId } = req.param();

        const bucketId = ENV.APPWRITE_IMAGES_STORAGE_BUCKET_ID;

        // Get the entities from current user session
        const user = get('user');
        const storage = get('storage');
        const databases = get('databases');

        const member = await getMember({
          databases,
          userId: user.$id,
          workspaceId,
        });

        if (!member || member.role !== MemberRole.ADMIN)
          throw new Error('You are not authorized to perform this action!');

        let imageUrl: string | undefined;

        if (image instanceof File) {
          const file = await storage.createFile(bucketId, ID.unique(), image);

          const arrayBuffer = await storage.getFilePreview(bucketId, file.$id);
          imageUrl = bufferToBase64(arrayBuffer, image?.type);
        } else {
          imageUrl = image;
        }

        const workspace = await databases.updateDocument(
          ENV.APPWRITE_DATABASE_ID,
          ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
          workspaceId,
          {
            name,
            imageUrl,
          }
        );

        status(200);
        return json({
          status: 'success',
          message: 'Workspace Updated Successfully!',
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
          data: null,
        });
      }
    }
  )
  .delete(
    '/:workspaceId',
    sessionMiddleware,
    async ({ json, status, req, get }) => {
      try {
        const { workspaceId } = req.param();

        const bucketId = ENV.APPWRITE_IMAGES_STORAGE_BUCKET_ID;

        // Get the entities from current user session
        const user = get('user');
        const storage = get('storage');
        const databases = get('databases');

        const member = await getMember({
          databases,
          userId: user.$id,
          workspaceId,
        });

        if (!member || member.role !== MemberRole.ADMIN) {
          status(401);
          return json({
            status: 'fail',
            message: 'Unauthorized!',
            data: null,
          });
        }

        // TODO: Delete members, projects and tasks.

        await databases.deleteDocument(
          ENV.APPWRITE_DATABASE_ID,
          ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
          workspaceId
        );

        status(200);
        return json({
          status: 'success',
          message: 'Workspace Deleted Successfully!',
          data: {
            workspace: { $id: workspaceId },
          },
        });
      } catch (err) {
        console.log('Error -> ', err);
        const message =
          err instanceof Error ? err.message : 'Unexpected error occurred';

        status(400);
        return json({
          status: 'fail',
          message,
          data: null,
        });
      }
    }
  );

export default app;
