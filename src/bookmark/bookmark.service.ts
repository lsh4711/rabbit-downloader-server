import { BookmarkRepository } from '#@/bookmark/bookmark.repository';
import {
  Bookmark,
  BookmarkProgress,
} from '#@/bookmark/entities/bookmark.entity';
import { AuthContext } from '#@/utils/auth-context.util';
import { Transactional } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  @Transactional()
  async create(bookmark: Bookmark) {
    return this.bookmarkRepository.create(bookmark);
  }

  @Transactional()
  async delete(bookmarkId: string) {
    const memberId = AuthContext.find('memberId');
    await this.bookmarkRepository.nativeDelete({
      bookmarkId,
      member: { memberId },
    });
  }

  async findBookmarks() {
    const memberId = AuthContext.find('memberId');
    return this.bookmarkRepository.findAll({
      where: { member: { memberId } },
      orderBy: { bookmarkId: 'asc' },
    });
  }

  async updateProgress(
    bookmarkId: string,
    lastIndex?: number,
    progress?: BookmarkProgress,
  ) {
    const memberId = AuthContext.find('memberId');
    await this.bookmarkRepository.nativeUpdateIgnoreUndefined(
      { bookmarkId, member: { memberId } },
      { lastIndex, progress },
    );
  }
}
