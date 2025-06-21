import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        process.env?.GOOGLE_CLIENT_ID ||
        '1025479226072-roo57bcn0n8c9gttlfrpevmtl1ce932p.apps.googleusercontent.com',
      clientSecret:
        process.env?.GOOGLE_CLIENT_SECRET ||
        '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',
      callbackURL:
        process.env?.GOOGLE_CLIENT_CALLBACK ||
        'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, _: string, profile: any, done: VerifyCallback) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
