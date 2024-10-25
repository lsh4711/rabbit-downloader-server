import { MemberRepository } from '@/member/member.repository';
import {
  Entity,
  Enum,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';

@Entity()
// @Entity({ repository: () => MemberRepository })
export class Member {
  [PrimaryKeyProp]?: 'memberId';

  @PrimaryKey({ unsigned: false })
  memberId!: bigint;

  @Property({ length: 6 })
  createdAt!: Date;

  @Property({ length: 6 })
  modifiedAt!: Date;

  @Property()
  oauthId!: string;

  @Enum({ items: () => MemberRole })
  role!: MemberRole;

  @Property({ unique: 'UK_gc3jmn7c2abyo3wf6syln5t2i' })
  username!: string;

  constructor({ oauthId, username }: { oauthId: string; username: string }) {
    this.oauthId = oauthId;
    this.username = username;
  }
}

export enum MemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  BLOCK = 'BLOCK',
}
