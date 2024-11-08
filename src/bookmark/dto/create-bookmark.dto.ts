import {
  Bookmark,
  BookmarkProgress,
  BookmarkType,
} from '#@/bookmark/entities/bookmark.entity';
import { Member } from '#@/member/entities/member.entity';
import { AuthContext } from '#@/utils/auth-context.util';
import { rel } from '@mikro-orm/core';
import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsNumber()
  contentId!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsEnum(BookmarkType)
  @Transform((params) => params.value.toUpperCase())
  type!: BookmarkType;

  @IsString()
  @IsNotEmpty()
  path!: string;

  @IsString()
  imagePath!: string;

  @IsNumber()
  lastIndex!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => BookmarkProgress)
  progress?: BookmarkProgress;

  toEntity() {
    const bookmark = plainToInstance(Bookmark, this);
    bookmark.member = rel(Member, AuthContext.find('memberId'));
    return bookmark;
  }
}
