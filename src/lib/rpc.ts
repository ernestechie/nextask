import { hc } from 'hono/client';
import { AppType } from '../app/api/[[...route]]/route';
import { ENV } from './env';

const appBaseUrl = ENV.PUBLIC_APP_URL;

export const client = hc<AppType>(appBaseUrl);
