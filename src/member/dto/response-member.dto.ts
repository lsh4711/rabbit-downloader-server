import { MemberRole } from '#@/member/entities/member.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseMemberDto {
  @Expose()
  memberId!: string;

  @Expose()
  oauthId!: string;

  @Expose()
  username!: string;

  @Expose()
  role!: MemberRole;

  @Expose()
  createdAt!: Date;

  @Expose()
  modifiedAt!: Date;
}
