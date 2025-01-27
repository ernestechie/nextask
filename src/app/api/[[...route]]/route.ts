import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import authRoutes from '../../../features/auth/server/route';
import workspacesRoutes from '../../../features/workspaces/server/route';

export const runtime = 'edge';
const app = new Hono().basePath('/api');

export const routes = app
  .route('/auth', authRoutes)
  .route('/workspaces', workspacesRoutes);

app.all('*', ({ json, status, req }) => {
  status(404);
  return json({
    message: `Cannot find URL -> ${req.url}`,
  });
});

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
