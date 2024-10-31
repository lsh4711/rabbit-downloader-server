import { BookmarkRepository } from '@/bookmark/bookmark.repository';
import { CustomBaseEntity } from '@/common/custom-base.entity';
import { Member } from '@/member/entities/member.entity';
import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity({ repository: () => BookmarkRepository })
@Unique({
  name: 'UKprl23ytlcgtmpftc8tw32mvpf',
  properties: ['member', 'contentId'],
})
export class Bookmark extends CustomBaseEntity {
  [PrimaryKeyProp]?: 'bookmarkId';

  @PrimaryKey({ type: 'bigint', unsigned: false })
  bookmarkId!: string;

  @Property()
  contentId!: bigint;

  @Property()
  imagePath!: string;

  @Property({ nullable: true })
  lastIndex?: bigint;

  @Property()
  path!: string;

  @Property({ nullable: true })
  progressIndex?: bigint;

  @Property({ nullable: true })
  progressPath?: string;

  @Property({ nullable: true })
  progressTitle?: string;

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
