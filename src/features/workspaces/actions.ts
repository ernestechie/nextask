'use server';

import { ENV } from '@/lib/env';
import { Query } from 'node-appwrite';
import { createClientSession } from '../auth/actions';
import { getMember } from '../members/utils';
import { NextaskWorkspace } from './types';

export const getWorkspaces = async () => {
  try {
    const { account, databases } = await createClientSession();

    const user = await account.get();
    const userId = user.$id;

    // Check if current user ID exist in any "member" document.
    const members = await databases.listDocuments(
      ENV.APPWRITE_DATABASE_ID,
      ENV.APPWRITE_DATABASE_MEMBERS_COLLECTION_ID,
      [Query.equal('userId', userId)]
    );

    // If current user is not a member to any collection.
    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    // If current user is a member to a collection, get all workspaces he is a member of.
    const workspaceIds = members.documents.map((member) => member.workspaceId);
    const workspaces = await databases.listDocuments(
      ENV.APPWRITE_DATABASE_ID,
      ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.contains('$id', workspaceIds)]
    );

    return { documents: workspaces.documents, total: workspaces.total };
  } catch (error) {
    console.log(error);
    return { documents: [], total: 0 };
  }
};

export const getWorkspace = async (
  workspaceId: string
): Promise<NextaskWorkspace | null> => {
  try {
    const { databases, account } = await createClientSession();

    const user = await account.get();

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });

    if (!member) return null;

    return await databases.getDocument<NextaskWorkspace>(
      ENV.APPWRITE_DATABASE_ID,
      ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
      workspaceId
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
