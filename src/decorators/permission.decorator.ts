import { MemberRole } from '@/member/entities/member.entity';
import type { MemberPayload } from '@/types/common';
import { Reflector } from '@nestjs/core';

type Permission = 'ADMIN' | 'MEMBER';

const permissions: Record<MemberRole, (Permission | 'BLOCK')[]> = {
  [MemberRole.ADMIN]: ['ADMIN', 'MEMBER'],
  [MemberRole.MEMBER]: ['MEMBER'],
  [MemberRole.BLOCK]: ['BLOCK'],
};

export const hasPermission = (
  requirePermissions: Permission[] = [],
  payload?: MemberPayload,
) => {
  const rolePermissions = payload?.role ? permissions[payload?.role] : [];

  for (const permission of requirePermissions) {
    if (!rolePermissions.includes(permission)) {
      return false;
    }
  }

  return true;
};

export const Permission = Reflector.createDecorator<Permission[] | undefined>();
