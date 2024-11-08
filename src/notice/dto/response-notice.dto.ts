import { ResponseMemberDto } from '#@/member/dto/response-member.dto';
import { NoticeSender, NoticeType } from '#@/notice/entities/notice.entity';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class ResponseNoticeData {
  @Expose()
  @Type(() => ResponseNoticeDto)
  notices!: ResponseNoticeDto[];

  @Expose()
  lastNoticeId!: string;

  @Expose()
  isNew!: boolean;
}

@Exclude()
export class ResponseNoticeDto {
  @Expose()
  noticeId!: string;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  type!: NoticeType;

  @Expose()
  sender!: NoticeSender;

  @Expose()
  createdAt!: Date;
}

@Exclude()
export class ResponseNoticeDtoForAdmin {
  @Expose()
  noticeId!: string;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  type!: NoticeType;

  @Expose()
  sender!: NoticeSender;

  @Expose()
  createdAt!: Date;

  @Expose()
  @Type(() => ResponseMemberDto)
  member!: ResponseMemberDto;
}
