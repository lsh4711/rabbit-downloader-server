import { Public } from '#@/decorators/public.decorator';
import { MikroORM } from '@mikro-orm/mysql';
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(private readonly orm: MikroORM) {}

  @Public({ skipAuth: true })
  @Get()
  home() {
    // for ssllabs test
  }

  @Public({ skipAuth: true })
  @Get('health')
  @Timeout(0)
  async healthCheck() {
    const isConnected = await this.orm.isConnected();

    if (!isConnected) {
      throw new InternalServerErrorException('unhealthy');
    }

    return 'ok';
  }
}
