import { Permission } from '@/decorators/permission.decorator';
import { Public } from '@/decorators/public.decorator';
import {
  ResponseNoticeData,
  ResponseNoticeDtoForAdmin,
} from '@/notice/dto/response-notice.dto';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { Response } from 'express';
import {
  CreateAnswerDto,
  CreateAskDto,
  CreatePatchNoteDto,
} from './dto/create-notice.dto';
import { NoticeService } from './notice.service';

const domain = 'notices';

@Controller(domain)
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Permission(['MEMBER'])
  @Post('asks/submit')
  async postAsk(
    @Body() dto: CreateAskDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const notice = dto.toEntity();

    await this.noticeService.create(notice);

    res.location(`${domain}/${notice.noticeId}`);
  }

  @Permission(['ADMIN'])
  @Post('answers/submit')
  async postAnswer(
    @Body() dto: CreateAnswerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const notice = dto.toEntity();

    await this.noticeService.create(notice);

    res.location(`${domain}/${notice.noticeId}`);
  }

  @Permission(['ADMIN'])
  @Post('patch-notes/submit')
  async postPatchNote(
    @Body() dto: CreatePatchNoteDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const notice = dto.toEntity();

    await this.noticeService.create(notice);

    res.location(`${domain}/${notice.noticeId}`);
  }

  @Public()
  @Get()
  async getNotices(@Query('notice-id') lastNoticeId: string) {
    const notices = await this.noticeService.getNotices(lastNoticeId);
    return plainToInstance(ResponseNoticeData, {
      notices,
      lastNoticeId: notices[notices.length - 1]?.noticeId || lastNoticeId,
      isNew: !!notices.length,
    });
  }

  @Permission(['ADMIN'])
  @Get('admin')
  async getNoticesForAdmin() {
    const notices = await this.noticeService.getNoticesForAdmin();
    return plainToInstance(ResponseNoticeDtoForAdmin, notices);
  }
}
