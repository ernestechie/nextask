'use server';

import { ENV } from '@/lib/env';
import { Account, Databases, Query } from 'node-appwrite';
import { createClientSession, getCurrentUser } from '../auth/actions';
import { getMember } from '../members/utils';
import { NextaskWorkspace } from './types';

export const getWorkspaces = async () => {
  try {
    const client = await createClientSession();

    const account = new Account(client);
    const databases = new Databases(client);
    const user = await account.get();

    const userId = user.$id;

    const members = await databases.listDocuments(
      ENV.APPWRITE_DATABASE_ID,
      ENV.APPWRITE_DATABASE_MEMBERS_COLLECTION_ID,
      // Write a query to appwrite database
      [Query.equal('userId', userId)]
    );

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);
    const workspaces = await databases.listDocuments(
      ENV.APPWRITE_DATABASE_ID,
      ENV.APPWRITE_DATABASE_WORKSPACES_COLLECTION_ID,
      // Write a query to appwrite database for sorting
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
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const client = await createClientSession();
    const databases = new Databases(client);

    const userId = currentUser.$id;

    const member = await getMember({
      databases,
      userId,
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
