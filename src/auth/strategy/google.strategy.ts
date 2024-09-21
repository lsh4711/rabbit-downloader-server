import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'oauth-google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // try {
    // const { id, name, emails, photos, su } = profile;
    //
    // const user = {
    //   id: id,
    //   email: emails[0].value,
    //   firstName: name.familyName,
    //   lastName: name.givenName,
    //   photo: photos[0].value,
    // };
    return profile;
    // } catch (error) {
    //   return error;
    // }
  }
}
