import { BookmarkRepository } from '@/bookmark/bookmark.repository';
import { CommonBaseEntity } from '@/common/common-base.entity';
import { Member } from '@/member/entities/member.entity';
import {
  Embeddable,
  Embedded,
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
@Embeddable()
export class BookmarkProgress {
  @Expose()
  @IsNumber()
  @Property()
  progressIndex!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Property()
  progressPath!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @Property()
  progressTitle!: string;
}

@Entity({ repository: () => BookmarkRepository })
@Unique({
  name: 'UKprl23ytlcgtmpftc8tw32mvpf',
  properties: ['member', 'contentId'],
})
export class Bookmark extends CommonBaseEntity {
  [PrimaryKeyProp]?: 'bookmarkId';

  @PrimaryKey({ type: 'bigint', unsigned: false })
  bookmarkId!: string;

  @Property()
  contentId!: number;

  @Property()
  imagePath!: string;

  @Property()
  lastIndex!: number;

  @Property()
  path!: string;

  @Embedded({ nullable: true, prefix: false })
  progress?: BookmarkProgress;

  @Property()
  title!: string;

  @Enum({ items: () => BookmarkType })
  type!: BookmarkType;

  @ManyToOne({ entity: () => Member, fieldName: 'member_id' })
  member!: Member;
}

export enum BookmarkType {
  COMIC = 'COMIC',
  WEBTOON = 'WEBTOON',
  NOVEL = 'NOVEL',
}
