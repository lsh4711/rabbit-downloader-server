import type { Bookmark } from '@/bookmark/entities/bookmark.entity';
import { EntityRepository } from '@mikro-orm/mysql';

export class BookmarkRepository extends EntityRepository<Bookmark> {}
