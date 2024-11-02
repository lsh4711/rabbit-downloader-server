import { ObjectUtil } from '@/utils/object.util';
import { EntityRepository } from '@mikro-orm/mysql';

export class CommonRepository<T extends object> extends EntityRepository<T> {
  async nativeUpdateIgnoreUndefined(
    ...params: Parameters<typeof this.nativeUpdate>
  ) {
    const [where, data, options] = params;
    ObjectUtil.deleteUndefinedKeys(data);
    return this.nativeUpdate(where, data, options);
  }
}
