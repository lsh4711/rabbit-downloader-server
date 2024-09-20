import { Entity, type Opt, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: '_prisma_migrations' })
export class PrismaMigrations {

  @PrimaryKey({ length: 36 })
  id!: string;

  @Property({ length: 64 })
  checksum!: string;

  @Property({ length: 3, nullable: true })
  finishedAt?: Date;

  @Property()
  migrationName!: string;

  @Property({ type: 'text', length: 65535, nullable: true })
  logs?: string;

  @Property({ length: 3, nullable: true })
  rolledBackAt?: Date;

  @Property({ type: 'datetime', length: 3, defaultRaw: `current_timestamp(3)` })
  startedAt!: Date & Opt;

  @Property({ type: 'integer', unsigned: true })
  appliedStepsCount: number & Opt = 0;

}
