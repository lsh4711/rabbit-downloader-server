import { CommonBaseEntity } from '#@/common/common-base.entity';
import { MemberRepository } from '#@/member/member.repository';
import type { MemberPayload } from '#@/types/common';
import {
  Entity,
  Enum,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';

@Entity({ repository: () => MemberRepository })
export class Member extends CommonBaseEntity {
  [PrimaryKeyProp]?: 'memberId';

  @PrimaryKey({ type: 'bigint', unsigned: false })
  memberId!: string;

  @Property({ unique: true })
  oauthId: string;

  @Enum({ items: () => MemberRole })
  role: MemberRole = MemberRole.BLOCK;

  @Property({ unique: true })
  username: string;

  constructor({ oauthId, username }: { oauthId: string; username: string }) {
    super();
    this.oauthId = oauthId;
    this.username = username;
  }

  toPayload(): MemberPayload {
    return {
      memberId: this.memberId,
      username: this.username,
      role: this.role,
    };
  }
}

export enum MemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  BLOCK = 'BLOCK',
}
