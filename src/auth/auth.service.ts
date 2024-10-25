import { Member } from '@/member/entities/member.entity';
import { MemberService } from '@/member/member.service';
import { Injectable } from '@nestjs/common';

type GoogleProfile = {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MemberService,
    // private readonly jwtService: JwtService,
  ) {}

  async loadGoogleMember(token: string) {
    const { sub, email } = await this.loadGoogleProfile(token);
    const oauthId = `google_${sub}`;
    const username = email.replace(/@.+/, '');

    return await this.memberService.findOrCreate(
      new Member({ oauthId, username }),
    );
  }

  private async loadGoogleProfile(token: string) {
    return fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    }).then<GoogleProfile>((r) => r.json());
  }

  // generateJwt(payload: MemberPayload) {}
}
