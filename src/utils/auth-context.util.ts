import type { MemberPayload } from '@/types/common';
import { UnauthorizedException } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

type Payload = MemberPayload;

export class AuthContext {
  private static storage = new AsyncLocalStorage<{ payload?: Payload }>();

  static init() {
    this.storage.enterWith({});
  }

  static update(payload: Payload) {
    const context = this.storage.getStore();

    if (!context) {
      throw new Error('use `AuthContext.init()`');
    }

    context.payload = payload;
  }

  static disable() {
    this.storage.disable();
  }

  static find(key: 'payload', optional: true): Payload | undefined;

  static find(key: 'payload', optional?: boolean): Payload;

  static find<T extends keyof Payload>(
    key: T,
    optional: true,
  ): Payload[T] | undefined;

  static find<T extends keyof Payload>(key: T, optional?: boolean): Payload[T];

  static find(key: keyof Payload | 'payload', optional?: boolean) {
    const payload = this.storage.getStore()?.payload;
    const result = key === 'payload' ? payload : payload?.[key];

    if (!result && !optional) {
      throw new UnauthorizedException();
    }

    return result;
  }
}
