import { DecodeDownloadDto } from '@/download/dto/decode-download.dto';
import { ParseDownloadDto } from '@/download/dto/parse-download.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Post('parse')
  @HttpCode(HttpStatus.OK)
  async parse(@Body() { html }: ParseDownloadDto) {
    return this.downloadService.parse(html);
  }

  @Post('decode')
  @HttpCode(HttpStatus.OK)
  decode(@Body() { code }: DecodeDownloadDto) {
    return this.downloadService.decode(code);
  }
}
