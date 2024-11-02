import {
  BookmarkProgress,
  BookmarkType,
} from '@/bookmark/entities/bookmark.entity';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
export class ResponseBookmarkDto {
  @Expose()
  bookmarkId!: string;

  @Expose()
  contentId!: number;

  @Expose()
  title!: string;

  @Expose()
  @Transform((params) => params.value.toLowerCase())
  type!: BookmarkType;

  @Expose()
  path!: string;

  @Expose()
  imagePath!: string;

  @Expose()
  lastIndex!: number;

  @Expose()
  @Type(() => BookmarkProgress)
  progress!: BookmarkProgress;
}
