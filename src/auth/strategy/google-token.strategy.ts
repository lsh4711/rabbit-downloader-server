import { AuthService } from '@/auth/auth.service';
import type { MemberPayload } from '@/types/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(
  Strategy,
  'google-token',
) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<MemberPayload> {
    const token = await req.body['token'];

    if (typeof token !== 'string') {
      throw new BadRequestException('body must contains token');
    }

    const member = await this.authService.loadGoogleMember(token);

    return member.toPayload();
  }
}
