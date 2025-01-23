import { AUTH_COOKIE } from '@/features/auth/constants';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from 'node-appwrite';
import 'server-only';
import { ENV } from './env';

type Context = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<Context>(
  async (ctx, next) => {
    const { json, status } = ctx;

    const client = new Client()
      .setEndpoint(ENV.APPWRITE_ENDPOINT)
      .setProject(ENV.APPWRITE_PROJECT_ID);
    const session = getCookie(ctx, AUTH_COOKIE);

    if (!session) {
      status(401);
      return json({ status: 'error', message: 'Insufficient Permissions' });
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    ctx.set('user', user);
    ctx.set('account', account);
    ctx.set('databases', databases);
    ctx.set('storage', storage);

    await next();
  }
);
