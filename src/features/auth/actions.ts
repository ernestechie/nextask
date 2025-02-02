'use server';

import { Account, Client } from 'node-appwrite';

import { ENV } from '@/lib/env';
import { cookies } from 'next/headers';
import { AUTH_COOKIE } from './constants';

export const createClientSession = async () => {
  const client = new Client()
    .setEndpoint(ENV.APPWRITE_ENDPOINT)
    .setProject(ENV.APPWRITE_PROJECT_ID);

  const session = cookies().get(AUTH_COOKIE);

  if (!session) throw new Error('You are not authorized to use this function.');

  return client.setSession(session?.value);
};

export const getCurrentUser = async () => {
  try {
    const client = await createClientSession();

    const account = new Account(client);
    return await account.get();
  } catch (error) {
    console.log(error);
    return null;
  }
};
