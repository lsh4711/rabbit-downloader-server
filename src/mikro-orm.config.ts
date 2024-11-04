import { customSqlHighlighter } from '@/utils/custom-sql-highlighter.util';
import { defineConfig } from '@mikro-orm/mysql';
import * as process from 'node:process';

export default defineConfig({
  forceUndefined: true,
  entities: ['dist/**/entities/*.entity.js'],
  entitiesTs: ['src/**/entities/*.entity.ts'],

  debug: process.env.MIKRO_ORM_DEGUG_ENABLED
    ? ['query', 'query-params']
    : undefined,
  highlighter: customSqlHighlighter,
  entityGenerator: {
    path: 'src',
    fileName: (className) => {
      return `${toKebabCase(className)}/entities/${toKebabCase(className)}.entity`;
    },
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

export const testMikroOrmConfig = defineConfig({
  forceUndefined: true,

  dbName: 'test-mikro-orm',
  entities: ['dist/**/entities/*.entity.js'],
  entitiesTs: ['src/**/entities/*.entity.ts'],

  debug: ['query', 'query-params'],
  highlighter: customSqlHighlighter,
});
