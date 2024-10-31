import { Notice } from '@/notice/entities/notice.entity';
import { EntityRepository } from '@mikro-orm/mysql';

export class NoticeRepository extends EntityRepository<Notice> {}
