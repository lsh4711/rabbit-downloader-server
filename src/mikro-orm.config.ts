import { defineConfig } from '@mikro-orm/mysql';
import * as process from 'node:process';

export default defineConfig({
  user: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // debug: true,

  entities: ['dist/**/entities/*.entity.js'],
  entitiesTs: ['src/**/entities/*.entity.ts'],

  entityGenerator: {
    path: 'src',
    fileName: (className) =>
      `${toKebabCase(className)}/entities/${toKebabCase(className)}.entity`,
    onImport: (alias) => {
      return {
        name: alias,
        path: `@/${toKebabCase(alias)}/entities/${toKebabCase(alias)}.entity`,
      };
    },
  },
});

function toKebabCase(pascalCase: string): string {
  return pascalCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
