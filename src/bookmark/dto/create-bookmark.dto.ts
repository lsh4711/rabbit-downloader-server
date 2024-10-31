import { Bookmark, BookmarkType } from '@/bookmark/entities/bookmark.entity';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsNumberString()
  contentId!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  type!: BookmarkType;

  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsString()
  @IsNotEmpty()
  imagePath!: string;

  @IsNumber()
  @IsNotEmpty()
  lastIndex!: number;

  toEntity() {
    return new Bookmark();
  }
}
