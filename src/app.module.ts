import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';

@Module({
  imports: [MikroOrmModule.forRoot(), MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
