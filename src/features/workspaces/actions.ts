'use server';

import { ENV } from '@/lib/env';
import { cookies } from 'next/headers';
import { Account, Client, Databases, Query } from 'node-appwrite';
import { AUTH_COOKIE } from '../auth/constants';

export const getWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(ENV.APPWRITE_ENDPOINT)
      .setProject(ENV.APPWRITE_PROJECT_ID);

    const session = cookies().get(AUTH_COOKIE);

    if (!session) return { workspaces: { documents: [], total: 0 } };

    client.setSession(session?.value);

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
