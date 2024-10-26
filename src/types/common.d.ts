import type { Member } from '@/member/entities/member.entity';
import type { Request } from 'express';

type AuthRequest = Request & { user: MemberPayload };

type MemberPayload = {
  memberId: Member['memberId'];
  role: Member['role'];
};
