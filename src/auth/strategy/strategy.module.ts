import { GoogleStrategy } from '@/auth/strategy/google.strategy';
import { Module } from '@nestjs/common';

@Module({ providers: [GoogleStrategy] })
export class StrategyModule {}
