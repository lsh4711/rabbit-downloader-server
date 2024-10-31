import { AuthService } from '@/auth/auth.service';
import { hasPermission, Permission } from '@/decorators/permission.decorator';
import { Public } from '@/decorators/public.decorator';
import type { MemberPayload } from '@/types/common';
import { AuthContext } from '@/utils/auth-context.util';
import { CookieUtil } from '@/utils/cookie.util';
import {
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import * as process from 'node:process';
import { ExtractJwt, Strategy } from 'passport-jwt';

const name = 'jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, name) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.jwtCookieExtractor,
      ]),
    });
  }

  private static jwtCookieExtractor(req: Request) {
    return (() => {
      return CookieUtil.extractJwtFromCookies(CookieUtil.parse(req)) || null;
    })();
  }

  async validate(payload: JwtPayload & MemberPayload): Promise<MemberPayload> {
    const memberPayload: MemberPayload = {
      memberId: payload.memberId,
      username: payload.username,
      role: payload.role,
    };
    const available = await this.authService.memberAvailable(memberPayload);

    if (!available) {
      throw new UnauthorizedException();
    }

    AuthContext.update(memberPayload);

    return memberPayload;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard(name) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override canActivate(context: ExecutionContext) {
    const metadata = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass(),
    ]);

    AuthContext.init();

    return metadata?.skipAuth || super.canActivate(context);
  }

  override handleRequest(
    err: any,
    user: MemberPayload | undefined,
    info: any,
    context: ExecutionContext,
    status: any,
  ) {
    if (!user) {
      AuthContext.disable();
    }

    const requirePermissions = this.reflector.getAllAndOverride(Permission, [
      context.getHandler(),
      context.getClass(),
    ]);
    const metadata = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!hasPermission(requirePermissions, user)) {
      throw new ForbiddenException();
    }

    return metadata?.isPublic
      ? user || undefined
      : super.handleRequest(err, user, info, context, status);
  }
}
