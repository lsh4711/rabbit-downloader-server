import { AuthService } from '@/auth/auth.service';
import { EntityManager, MikroORM } from '@mikro-orm/mysql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';

@Injectable()
export class GoogleTokenStrategy extends PassportStrategy(
  Strategy,
  'google-token',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {
    super();
  }

  async validate(req: Request) {
    console.log(this.em === this.orm.em);

    const token = await req.body['token'];

    if (typeof token !== 'string') {
      throw new BadRequestException('body must contains token');
    }

    return await this.authService.loadGoogleMember(token);
  }
}
