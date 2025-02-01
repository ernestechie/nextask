import { Models } from 'node-appwrite';

export type NextaskWorkspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
