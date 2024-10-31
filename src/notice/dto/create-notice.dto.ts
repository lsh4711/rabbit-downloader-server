import { Member } from '@/member/entities/member.entity';
import {
  Notice,
  NoticeSender,
  NoticeType,
} from '@/notice/entities/notice.entity';
import { AuthContext } from '@/utils/auth-context.util';
import { rel } from '@mikro-orm/core';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateAskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  toEntity() {
    const notice = plainToInstance(Notice, this);
    notice.type = NoticeType.ASK;
    notice.sender = NoticeSender.USER;
    notice.member = rel(Member, AuthContext.find('memberId')!);
    return notice;
  }
}

export class CreateAnswerDto {
  @IsNumberString()
  memberId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  toEntity() {
    const notice = plainToInstance(Notice, this, {
      excludePrefixes: ['memberId'],
    });
    notice.type = NoticeType.ASK;
    notice.sender = NoticeSender.SERVER;
    notice.member = rel(Member, this.memberId);
    return notice;
  }
}

export class CreatePatchNoteDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  toEntity() {
    const notice = plainToInstance(Notice, this);
    notice.type = NoticeType.ASK;
    notice.sender = NoticeSender.USER;
    notice.member = rel(Member, AuthContext.find('memberId')!);
    return notice;
  }
}
