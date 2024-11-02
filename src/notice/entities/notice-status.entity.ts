import { CommonBaseEntity } from '@/common/common-base.entity';
import { Member } from '@/member/entities/member.entity';
import { Notice } from '@/notice/entities/notice.entity';
import { NoticeStatusRepository } from '@/notice/notice-status.repository';
import { Entity, OneToOne, PrimaryKeyProp } from '@mikro-orm/core';

@Entity({ repository: () => NoticeStatusRepository })
export class NoticeStatus extends CommonBaseEntity {
  [PrimaryKeyProp]?: 'member';

  @OneToOne({ entity: () => Member, fieldName: 'member_id', primary: true })
  member!: Member;

  @OneToOne({
    entity: () => Notice,
    fieldName: 'notice_id',
    unique: 'UK_97gckiw4f50fajy8l0ukmb4y7',
  })
  notice!: Notice;
}
