import { createAdminClient } from '@/lib/appwrite';
import { setHttpCookie } from '@/lib/cookies';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { deleteCookie } from 'hono/cookie';
import { AppwriteException, ID } from 'node-appwrite';
import { AUTH_COOKIE } from '../constants';
import { loginSchema, signupSchema } from '../schemas';

const app = new Hono()
  // GET / Current logged-in user
  .get('/current', sessionMiddleware, async (ctx) => {
    const { json, status } = ctx;
    const user = ctx.get('user');

    status(200);
    return json({
      status: 'success',
      message: 'User Retrieved Successfully!',
      data: { user },
    });
  })
  // POST / Login
  .post('/login', zValidator('json', loginSchema), async (ctx) => {
    const { json, status, req } = ctx;

    // Validate the request body
    const body = req.valid('json');
    const { email, password } = body;

    try {
      // Create a new Appwrite client
      const { account } = await createAdminClient();
      // Ceate a new user account with Appwrite
      const session = await account.createEmailPasswordSession(email, password);

      // Set the appwrite session cookie
      setHttpCookie({
        context: ctx,
        name: AUTH_COOKIE,
        value: session.secret,
      });

      status(200);
      return json({
        status: 'success',
        message: 'Login Successful!',
        data: { user: { email } },
      });
    } catch (error: unknown) {
      console.log('API ERROR -> ', error);

      status(401);
      return json({
        status: 'error',
        message: 'Invalid Credentials!',
      });
    }
  })
  // POST / Sign up
  .post('/sign-up', zValidator('json', signupSchema), async (ctx) => {
    const { json, status, req } = ctx;

    const body = req.valid('json');
    const { email, password, fullName } = body;

    try {
      const { account } = await createAdminClient();
      // Ceate a new user account with Appwrite
      const user = await account.create(ID.unique(), email, password, fullName);
      const session = await account.createEmailPasswordSession(email, password);

      setHttpCookie({
        context: ctx,
        name: AUTH_COOKIE,
        value: session.secret,
      });

      status(201);
      return json({
        status: 'success',
        message: 'Account Created Successfully!',
        data: { user },
      });
    } catch (err) {
      const error =
        err instanceof AppwriteException ? err.message : 'Something went wrong';

      status(400);
      return json({
        status: 'error',
        message: error,
      });
    }
  })
  // POST / Logout
  .post('/logout', sessionMiddleware, async (context) => {
    const { json, status, get } = context;

    const account = get('account');

    deleteCookie(context, AUTH_COOKIE);
    await account.deleteSession('current');

    status(200);
    return json({
      status: 'success',
      message: 'Logout Successful!',
    });
  });

export default app;
