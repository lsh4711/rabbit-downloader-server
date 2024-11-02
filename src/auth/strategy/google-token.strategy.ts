import { AuthService } from '@/auth/auth.service';
import { MemberRole } from '@/member/entities/member.entity';
import type { MemberPayload } from '@/types/common';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';

const name = 'google-token';

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(Strategy, name) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<MemberPayload> {
    const token = await req.body['token'];

    if (typeof token !== 'string') {
      throw new BadRequestException('body must contains token');
    }

    const member = await this.authService.loadGoogleMember(token);

    if (member.role === MemberRole.BLOCK) {
      throw new UnauthorizedException();
    }

    return member.toPayload();
  }
}

export class GoogleTokenAuthGuard extends AuthGuard(name) {}
