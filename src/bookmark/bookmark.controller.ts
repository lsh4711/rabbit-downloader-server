import { ResponseBookmarkDto } from '@/bookmark/dto/response-bookmark.dto';
import { UpdateBookmarkDto } from '@/bookmark/dto/update-bookmark.dto';
import { Permission } from '@/decorators/permission.decorator';
import { UriCreator } from '@/utils/uri-creator.util';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { Response } from 'express';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

const domain = 'bookmarks';

@Permission(['MEMBER'])
@Controller(domain)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post('submit')
  async postBookmark(
    @Body() dto: CreateBookmarkDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const bookmark = dto.toEntity();

    await this.bookmarkService.create(bookmark);

    res.location(UriCreator.create(domain, bookmark.bookmarkId));
    return plainToInstance(ResponseBookmarkDto, bookmark);
  }

  @Delete(':id/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBookmark(@Param('id') bookmarkId: string) {
    await this.bookmarkService.delete(bookmarkId);
  }

  @Get()
  async getBookmarks() {
    const bookmarks = await this.bookmarkService.findBookmarks();
    return plainToInstance(ResponseBookmarkDto, bookmarks);
  }

  @Patch(':id')
  async patchBookmark(
    @Param('id') bookmarkId: string,
    @Body() { lastIndex, progress }: UpdateBookmarkDto,
  ) {
    if (!lastIndex && !progress) {
      return;
    }

    await this.bookmarkService.updateProgress(bookmarkId, lastIndex, progress);
  }
}
