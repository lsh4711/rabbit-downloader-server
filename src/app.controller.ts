import { Public } from '#@/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public({ skipAuth: true })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
