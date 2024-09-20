import { Entity, Enum, ManyToOne, PrimaryKey, PrimaryKeyProp, Property, Unique } from '@mikro-orm/core';
import { Member } from '@/member/entities/member.entity';

@Entity()
@Unique({ name: 'UKprl23ytlcgtmpftc8tw32mvpf', properties: ['member', 'contentId'] })
export class Bookmark {

  [PrimaryKeyProp]?: 'bookmarkId';

  @PrimaryKey({ unsigned: false })
  bookmarkId!: bigint;

  @Property({ length: 6 })
  createdAt!: Date;

  @Property({ length: 6 })
  modifiedAt!: Date;

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
