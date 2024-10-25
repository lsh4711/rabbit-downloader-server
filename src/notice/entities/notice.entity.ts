import { Entity, Enum, Index, ManyToOne, PrimaryKey, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Member } from '@/member/entities/member.entity';

@Entity()
@Index({ name: 'IDXa4kgkrn6a3145pu6radc2n0av', properties: ['member', 'type'] })
export class Notice {

  [PrimaryKeyProp]?: 'noticeId';

  @PrimaryKey({ unsigned: false })
  noticeId!: bigint;

  @Property({ length: 6 })
  createdAt!: Date;

  @Property({ length: 6 })
  modifiedAt!: Date;

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
