import { AuthService } from '@/auth/auth.service';
import { GoogleTokenStrategy } from '@/auth/strategy/google-token.strategy';
import { MemberModule } from '@/member/member.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, MemberModule],
  providers: [AuthService, GoogleTokenStrategy],
})
export class AuthModule {}
