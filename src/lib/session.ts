import { AUTH_COOKIE } from '@/features/auth/constants';
import { cookies } from 'next/headers';
import { Client } from 'node-appwrite';

import { ENV } from './env';

export default async function createClientSession() {
  const client = new Client()
    .setEndpoint(ENV.APPWRITE_ENDPOINT)
    .setProject(ENV.APPWRITE_PROJECT_ID);

  const session = cookies().get(AUTH_COOKIE);

  if (!session) throw new Error('You are not authorized to use this function.');

  return client.setSession(session?.value);
}
