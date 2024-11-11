import type { Options } from '@mikro-orm/core';

export class EnvUtil {
  private static baseDir = 'env';
  private static envFileName = `.env`;
  private static mikroOrmConfigFileName = `mikro-orm.config`;

  static getNodeEnv() {
    return process.env.NODE_ENV;
  }

  static isProd() {
    return this.getNodeEnv() === 'prod';
  }

  static isDev() {
    return this.getNodeEnv() === 'dev';
  }

  static isTest() {
    return this.getNodeEnv() === 'test';
  }

  static getDotEnvPath(prefix: string = '') {
    return `${prefix}${this.getCurrentEnvDir()}/${this.envFileName}`;
  }

  private static getMikroOrmConfigPath(prefix: string = '../../') {
    return `${prefix}${this.getCurrentEnvDir()}/${this.mikroOrmConfigFileName}`;
  }

  static importMikroOrmConfig(prefix?: string): Options {
    // use require to run test without node flag
    // and load both extension .js and .ts without any settings.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(EnvUtil.getMikroOrmConfigPath(prefix)).default;
  }

  private static getCurrentEnvDir() {
    return this.baseDir
      ? `${this.baseDir}/${this.getNodeEnv()}`
      : `${this.getNodeEnv()}`;
  }
}
