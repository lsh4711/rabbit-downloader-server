import { Member } from '@/member/entities/member.entity';
import { MemberService } from '@/member/member.service';
import type { MemberPayload } from '@/types/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
    private readonly jwtService: JwtService,
  ) {}

  async loadGoogleMember(token: string) {
    const { sub, email } = await this.loadGoogleProfile(token);
    const oauthId = `google_${sub}`;
    const username = email.replace(/@.+/, '');
    const member = new Member({ oauthId, username });

    return await this.memberService.findOrCreate(member);
  }

  private async loadGoogleProfile(token: string) {
    return fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    }).then<GoogleProfile>(async (r) => {
      if (!r.ok) {
        const body = await r.json();
        throw new UnauthorizedException(body['error_description']);
      }
      return r.json();
    });
  }

  generateJwt(payload: MemberPayload) {
    return this.jwtService.sign(payload);
  }

  async memberAvailable(payload: MemberPayload) {
    return this.memberService.exist(payload);
  }
}
