import { CaptchaService } from '#@/captcha/captcha.service';
import {
  Controller,
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

const captchaValidators: FileValidator[] = [
  new MaxFileSizeValidator({ maxSize: 5000 }),
  new FileTypeValidator({ fileType: 'image/jpeg' }),
];

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Post('recognize')
  @UseInterceptors(FileInterceptor('image'))
  async recognizeCaptcha(
    @UploadedFile(new ParseFilePipe({ validators: captchaValidators }))
    file: Express.Multer.File,
  ) {
    const blob = new Blob([file.buffer], { type: file.mimetype });

    const formData = new FormData();
    formData.append('image', blob);

    const captcha = await this.captchaService.sendRecognizeRequest(formData);

    return { result: captcha };
  }
}
