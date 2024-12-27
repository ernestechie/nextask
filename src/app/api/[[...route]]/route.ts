import authRoutes from '@/features/auth/server/route';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';
const app = new Hono().basePath('/api');

const routes = app.route('/auth', authRoutes);

app.all('*', ({ json, status, req }) => {
  status(404);
  return json({
    message: `Cannot find URL -> ${req.url}`,
  });
});

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
