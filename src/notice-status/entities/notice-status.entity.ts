import { Entity, OneToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';
import { Member } from '@/member/entities/member.entity';
import { Notice } from '@/notice/entities/notice.entity';

@Entity()
export class NoticeStatus {

  [PrimaryKeyProp]?: 'member';

  @OneToOne({ entity: () => Member, fieldName: 'member_id', primary: true })
  member!: Member;

  @Property({ length: 6 })
  createdAt!: Date;

  @Property({ length: 6 })
  modifiedAt!: Date;

  @OneToOne({ entity: () => Notice, fieldName: 'notice_id', unique: 'UK_97gckiw4f50fajy8l0ukmb4y7' })
  notice!: Notice;

}
