'use server';

import { ENV } from '@/lib/env';
import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';
import { AUTH_COOKIE } from './constants';

export const getCurrentUser = async () => {
  try {
    const client = new Client()
      .setEndpoint(ENV.APPWRITE_ENDPOINT)
      .setProject(ENV.APPWRITE_PROJECT_ID);

    const session = cookies().get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session?.value);

    const account = new Account(client);
    return await account.get();
  } catch (error) {
    console.log(error);
    return null;
  }
};
