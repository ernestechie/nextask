import { Context } from 'hono';
import { setCookie } from 'hono/cookie';

const defaultCookieAge = 60 * 60 * 24 * 1; // 1 day

type SetCookieProps = {
  context: Context;
  name: string;
  value: string;
  age?: number;
};

export const setHttpCookie = ({
  context,
  name,
  value,
  age,
}: SetCookieProps) => {
  setCookie(context, name, value, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: age ?? defaultCookieAge,
  });
};
