import { AuthService } from '#@/auth/auth.service';
import { Member } from '#@/member/entities/member.entity';
import { MemberService } from '#@/member/member.service';
import { EntityManager } from '@mikro-orm/core';
import { RequestContext } from '@mikro-orm/mysql';
import { INestApplication } from '@nestjs/common';

export class TestUtil {
  static async generateTestToken(app: INestApplication) {
    const member = await RequestContext.create(app.get(EntityManager), () => {
      return app
        .get(MemberService)
        .findOrCreate(new Member({ oauthId: 'test', username: 'test' }));
    });
    return app.get(AuthService).generateJwt(member.toPayload());
  }
}
