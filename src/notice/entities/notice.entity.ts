import { CommonBaseEntity } from '@/common/common-base.entity';
import { Member } from '@/member/entities/member.entity';
import { NoticeRepository } from '@/notice/notice.repository';
import {
  Entity,
  Enum,
  Index,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';

@Entity({ repository: () => NoticeRepository })
@Index({ name: 'IDXa4kgkrn6a3145pu6radc2n0av', properties: ['member', 'type'] })
export class Notice extends CommonBaseEntity {
  [PrimaryKeyProp]?: 'noticeId';

  @PrimaryKey({ type: 'bigint', unsigned: false })
  noticeId!: string;

  @Property({ length: 5000 })
  content!: string;

  @Enum({ items: () => NoticeSender })
  sender!: NoticeSender;

  @Property()
  title!: string;

  @Enum({ items: () => NoticeType, index: 'IDXhp55wjos090o41qy9nhwdlxxv' })
  type!: NoticeType;

  @ManyToOne({ entity: () => Member, fieldName: 'member_id' })
  member!: Member;
}

export enum NoticeSender {
  SERVER = 'SERVER',
  USER = 'USER',
}

export enum NoticeType {
  INFO = 'INFO',
  PATCH_NOTE = 'PATCH_NOTE',
  ASK = 'ASK',
}
