import cookieParser from 'cookie-parser';
import type { Request } from 'express';

export class CookieUtil {
  private static readonly jwtKey = 'rabbit';

  static parse(req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    cookieParser()(req, undefined, () => {});
    return req.cookies;
  }

  static extractJwtFromCookies(cookies: Record<string, string | undefined>) {
    return cookies[this.jwtKey]?.replace('Bearer ', '');
  }
}
