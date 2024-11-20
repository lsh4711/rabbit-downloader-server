import { CaptchaController } from '#@/captcha/captcha.controller';
import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

@Module({
  controllers: [CaptchaController],
  providers: [CaptchaService],
})
export class CaptchaModule {}
