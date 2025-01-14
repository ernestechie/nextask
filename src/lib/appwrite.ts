import { Account, Client, Databases, Storage, Users } from 'node-appwrite';
import 'server-only';
import { ENV } from './env';

const appWriteEndpoint = ENV.APPWRITE_ENDPOINT;
const appWriteProjectId = ENV.APPWRITE_PROJECT_ID;
const appwriteKey = ENV.APPWRITE_KEY;

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appWriteEndpoint)
    .setProject(appWriteProjectId)
    .setKey(appwriteKey);

  return {
    get account() {
      return new Account(client);
    },
  };
}
