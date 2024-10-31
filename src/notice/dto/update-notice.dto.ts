import { Notice } from '@/notice/entities/notice.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateNoticeDto extends PartialType(Notice) {}
