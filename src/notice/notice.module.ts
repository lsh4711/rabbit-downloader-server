import { NoticeStatus } from '#@/notice/entities/notice-status.entity';
import { Notice } from '#@/notice/entities/notice.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  imports: [MikroOrmModule.forFeature([Notice, NoticeStatus])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
