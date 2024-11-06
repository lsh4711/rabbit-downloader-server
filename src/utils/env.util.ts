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

  static getMikroOrmConfigPath(prefix: string = '') {
    return `${prefix}${this.getCurrentEnvDir()}/${this.mikroOrmConfigFileName}`;
  }

  private static getCurrentEnvDir() {
    return this.baseDir
      ? `${this.baseDir}/${this.getNodeEnv()}`
      : `${this.getNodeEnv()}`;
  }
}
