export class ObjectUtil {
  static deleteUndefinedKeys<T = object>(obj: T) {
    for (const key in obj) {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
}
