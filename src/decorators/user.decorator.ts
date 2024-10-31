import type { MemberPayload } from '@/types/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const User = createParamDecorator<keyof MemberPayload, ExecutionContext>(
  (key, ctx) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return key ? req.user?.[key] : req.user;
  },
);
