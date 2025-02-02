'use server';

import { Account, Client, Databases, Storage } from 'node-appwrite';

import { ENV } from '@/lib/env';
import { cookies } from 'next/headers';
import { AUTH_COOKIE } from './constants';

export const createClientSession = async () => {
  const client = new Client()
    .setEndpoint(ENV.APPWRITE_ENDPOINT)
    .setProject(ENV.APPWRITE_PROJECT_ID);

  const session = cookies().get(AUTH_COOKIE);

  if (!session || !session.value)
    throw new Error('You are not authorized to use this function.');

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

export const getCurrentUser = async () => {
  try {
    const { account } = await createClientSession();

    return account.get();
  } catch (error) {
    console.log(error);
    return null;
  }
};
