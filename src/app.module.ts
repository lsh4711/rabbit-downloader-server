import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StrategyModule } from './auth/strategy/strategy.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    MemberModule,
    StrategyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
