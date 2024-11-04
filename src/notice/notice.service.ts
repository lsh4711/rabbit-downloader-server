import { Time } from '@/decorators/time.decorator';
import { type Notice, NoticeType } from '@/notice/entities/notice.entity';
import { NoticeStatusRepository } from '@/notice/notice-status.repository';
import { NoticeRepository } from '@/notice/notice.repository';
import { AuthContext } from '@/utils/auth-context.util';
import {
  CreateRequestContext,
  EntityManager,
  Transactional,
} from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

@Injectable()
export class NoticeService {
  private readonly commonNoticeTypes = [NoticeType.INFO, NoticeType.PATCH_NOTE];
  private commonNotices: Notice[] = [];

  constructor(
    private readonly noticeRepository: NoticeRepository,
    private readonly noticeStatusRepository: NoticeStatusRepository,
    private readonly em: EntityManager,
  ) {}

  @Timeout(0)
  @Time('common notices initialized')
  private async initCommonNotices() {
    await this.refreshCommonNotices();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  @CreateRequestContext()
  private async refreshCommonNotices() {
    this.commonNotices = await this.noticeRepository.findAll({
      where: { type: { $in: this.commonNoticeTypes } },
      logging: { enabled: false },
    });
  }

  @Transactional()
  async create(notice: Notice) {
    const noticeStatus = await this.noticeStatusRepository.findOne({
      member: { memberId: notice.member.memberId },
    });

    if (noticeStatus) {
      noticeStatus.notice = notice;
    } else {
      this.noticeStatusRepository.create({ notice, member: notice.member });
    }

    return this.noticeRepository.create(notice);
  }

  private async findNoticeStatus(memberId?: string) {
    if (!memberId) {
      return undefined;
    }
    return this.noticeStatusRepository
      .findOne({ member: { memberId } })
      .then((noticeStatus) => noticeStatus || undefined);
  }

  private getCommonNotices(lastNoticeId: string) {
    const notices: Notice[] = [];

    for (let idx = this.commonNotices.length - 1; idx >= 0; idx--) {
      const notice = this.commonNotices[idx];
      if (BigInt(notice.noticeId) <= BigInt(lastNoticeId)) {
        break;
      }
      notices.push(notice);
    }

    return notices.reverse();
  }

  async findNotices(lastNoticeId: string) {
    const memberId = AuthContext.find('memberId', true);
    const noticeStatus = await this.findNoticeStatus(memberId);
    const notices = this.getCommonNotices(lastNoticeId);

    if (
      !noticeStatus ||
      BigInt(lastNoticeId) >= BigInt(noticeStatus.notice.noticeId)
    ) {
      return notices;
    }

    const memberNotices = await this.noticeRepository.findAll({
      where: {
        member: { memberId },
        type: NoticeType.ASK,
        noticeId: { $gt: lastNoticeId },
      },
      orderBy: { noticeId: 'asc' },
    });

    notices.push(...memberNotices);
    notices.sort((n1, n2) => n1.createdAt.getTime() - n2.createdAt.getTime());

    return notices;
  }

  async findNoticesForAdmin() {
    return this.noticeRepository.findAll({
      populate: ['member'],
      where: { type: NoticeType.ASK },
      orderBy: { noticeId: 'asc' },
    });
  }
}
