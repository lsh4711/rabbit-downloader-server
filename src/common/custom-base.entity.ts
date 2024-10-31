import { OptionalProps, Property } from '@mikro-orm/core';

export abstract class CustomBaseEntity<Optional = never> {
  [OptionalProps]?: 'createdAt' | 'modifiedAt' | Optional;

  @Property({ length: 6, onCreate: () => new Date() })
  createdAt!: Date;

  @Property({
    length: 6,
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  modifiedAt!: Date;
}
