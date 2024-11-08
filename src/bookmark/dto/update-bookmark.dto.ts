import { BookmarkProgress } from '#@/bookmark/entities/bookmark.entity';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class UpdateBookmarkDto {
  @IsOptional()
  @IsNumber()
  lastIndex?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => BookmarkProgress)
  progress?: BookmarkProgress;
}
