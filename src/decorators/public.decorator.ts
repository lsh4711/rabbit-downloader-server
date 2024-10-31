import { Reflector } from '@nestjs/core';

type Metadata = {
  // always works as `true`
  isPublic?: true;
  skipAuth?: boolean;
};

export const Public = Reflector.createDecorator<Metadata | undefined>({
  transform: ({ skipAuth } = {}) => {
    return { isPublic: true, skipAuth };
  },
});
