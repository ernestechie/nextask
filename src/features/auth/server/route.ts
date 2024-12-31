import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { loginSchema, signupSchema } from '../schemas';

// Route, Middleware, Callback func.
const app = new Hono()
  .post(
    '/login',
    zValidator('json', loginSchema),
    async ({ json, status, req }) => {
      const body = req.valid('json');
      const { email, password } = body;

      console.log('REQUEST BODY -> ', body);

      status(200);
      return json({
        status: 'success',
        message: 'Login Successful!',
        data: { email },
      });
    }
  )
  .post(
    '/sign-up',
    zValidator('json', signupSchema),
    async ({ json, status, req }) => {
      const body = req.valid('json');
      const { email, password, fullName } = body;

      console.log('REQUEST BODY -> ', body);

      status(201);
      return json({
        status: 'success',
        message: 'Account Created Successfully!',
        data: { email, fullName },
      });
    }
  );

export default app;
