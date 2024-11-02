export function Time(label: string): MethodDecorator {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const isSync = originalMethod.constructor.name === 'Function';

    if (isSync) {
      descriptor.value = function (...args: any[]) {
        console.time(label);
        const result = originalMethod.apply(this, args);
        console.timeEnd(label);
        return result;
      };
    } else {
      descriptor.value = async function (...args: any[]) {
        console.time(label);
        const result = await originalMethod.apply(this, args);
        console.timeEnd(label);
        return result;
      };
    }

    return descriptor;
  };
}
