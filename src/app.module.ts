import { EnvUtil } from '#@/utils/env.util';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { DownloadModule } from './download/download.module';
import { MemberModule } from './member/member.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: EnvUtil.getDotEnvPath() }),
    MikroOrmModule.forRootAsync({ useFactory: EnvUtil.importMikroOrmConfig }),
    ScheduleModule.forRoot(),
    MemberModule,
    NoticeModule,
    BookmarkModule,
    DownloadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
        // disableErrorMessages: true
      }),
    },
  ],
})
export class AppModule {}
