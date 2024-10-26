import { MemberRepository } from '@/member/member.repository';
import type { MemberPayload } from '@/types/common';
import {
  Entity,
  Enum,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';

@Entity({ repository: () => MemberRepository })
export class Member {
  [PrimaryKeyProp]?: 'memberId';

  @PrimaryKey({ unsigned: false })
  memberId!: bigint;

  @Property({ length: 6 })
  createdAt: Date = new Date();

  @Property({ length: 6, onUpdate: () => new Date() })
  modifiedAt: Date = new Date();

  @Property({ unique: true })
  oauthId!: string;

  @Enum({ items: () => MemberRole })
  role: MemberRole = MemberRole.BLOCK;

  @Property({ unique: true })
  username!: string;

  constructor({ oauthId, username }: { oauthId: string; username: string }) {
    this.oauthId = oauthId;
    this.username = username;
  }

  toPayload(): MemberPayload {
    return { memberId: this.memberId, role: this.role };
  }
}

export enum MemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  BLOCK = 'BLOCK',
}
