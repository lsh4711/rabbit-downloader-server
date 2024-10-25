import type { Member } from '@/member/entities/member.entity';
import type { Request } from 'express';

type AuthRequest = Request & { user: Member };
