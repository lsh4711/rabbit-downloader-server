import { AuthService } from '@/auth/auth.service';
import { GoogleTokenStrategy } from '@/auth/strategy/google-token.strategy';
import { JwtAuthGuard, JwtStrategy } from '@/auth/strategy/jwt.strategy';
import { MemberModule } from '@/member/member.module';
import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as process from 'node:process';

@Module({
  imports: [
    forwardRef(() => MemberModule),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    GoogleTokenStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
