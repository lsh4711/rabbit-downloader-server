import { NoticeStatus } from '@/notice/entities/notice-status.entity';
import { EntityRepository } from '@mikro-orm/mysql';

export class NoticeStatusRepository extends EntityRepository<NoticeStatus> {}
