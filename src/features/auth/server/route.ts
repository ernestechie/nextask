import { createAdminClient } from '@/lib/appwrite';
import { setHttpCookie } from '@/lib/cookies';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { AppwriteException, ID } from 'node-appwrite';
import { AUTH_COOKIE } from '../constants';
import { loginSchema, signupSchema } from '../schemas';

const app = new Hono()
  // POST / login
  .post('/login', zValidator('json', loginSchema), async (context) => {
    const { json, status, req } = context;

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
        context,
        name: AUTH_COOKIE,
        value: session.secret,
      });

      status(200);
      return json({
        status: 'success',
        message: 'Login Successful!',
        data: { email },
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
  // POST / sign-up
  .post('/sign-up', zValidator('json', signupSchema), async (context) => {
    const { json, status, req } = context;

    const body = req.valid('json');
    const { email, password, fullName } = body;

    try {
      const { account } = await createAdminClient();
      // Ceate a new user account with Appwrite
      const user = await account.create(ID.unique(), email, password, fullName);
      const session = await account.createEmailPasswordSession(email, password);

      setHttpCookie({
        context,
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
  // POST / logout
  .post('/logout', async (context) => {
    const { json, status, req } = context;

    status(200);
    return json({
      status: 'success',
      message: 'Logout Successfully!',
    });
  });

export default app;
