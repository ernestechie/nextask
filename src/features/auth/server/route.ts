import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { loginSchema } from '../schemas';

// Route, Middleware, Callback func.
const app = new Hono().post(
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
);

export default app;
