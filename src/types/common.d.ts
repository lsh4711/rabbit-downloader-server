import type { Member } from '#@/member/entities/member.entity';

declare module 'express' {
  interface Request {
    user?: MemberPayload;
  }
}

type MemberPayload = {
  memberId: Member['memberId'];
  username: Member['username'];
  role: Member['role'];
};
