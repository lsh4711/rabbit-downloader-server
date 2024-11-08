import type { Bookmark } from '#@/bookmark/entities/bookmark.entity';
import { CommonRepository } from '#@/common/common.repository';

export class BookmarkRepository extends CommonRepository<Bookmark> {}
