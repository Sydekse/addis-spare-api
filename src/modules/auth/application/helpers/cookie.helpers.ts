import { Response } from 'express';

export class CookieHelper {
  static setRefreshToken(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh-token',
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  static clearRefreshToken(res: Response) {
    res.clearCookie('refreshToken', { path: '/auth/refresh-token' });
  }
}
