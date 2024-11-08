import { AuthService } from '#@/auth/auth.service';
import { GoogleTokenAuthGuard } from '#@/auth/strategy/google-token.strategy';
import { Public } from '#@/decorators/public.decorator';
import { User } from '#@/decorators/user.decorator';
import { ResponseMemberDto } from '#@/member/dto/response-member.dto';
import type { MemberPayload } from '#@/types/common';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { Response } from 'express';
import { MemberService } from './member.service';

@Controller('members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
  ) {}

  @Public({ skipAuth: true })
  @Post('login')
  @UseGuards(GoogleTokenAuthGuard)
  async login(
    @User() payload: MemberPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.generateJwt(payload);
    const member = (await this.memberService.findByMemberId(payload.memberId))!;

    res.status(200);
    res.setHeader('authorization', jwt);

    return plainToInstance(ResponseMemberDto, member);
  }
}
