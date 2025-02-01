import { ENV } from '@/lib/env';
import { Query, type Databases } from 'node-appwrite';

interface GetMemberProps {
  databases: Databases;
  workspaceId: string;
  userId: string;
}

export const getMember = async ({
  databases,
  workspaceId,
  userId,
}: GetMemberProps) => {
  const members = await databases.listDocuments(
    ENV.APPWRITE_DATABASE_ID,
    ENV.APPWRITE_DATABASE_MEMBERS_COLLECTION_ID,
    [Query.equal('workspaceId', workspaceId), Query.equal('userId', userId)]
  );

  return members.documents[0];
};
