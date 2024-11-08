import { customSqlHighlighter } from '#@/utils/custom-sql-highlighter.util';
import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  forceUndefined: true,
  entities: ['dist/src/*/entities/*.entity.js'],

  debug: ['query', 'query-params'],
  highlighter: customSqlHighlighter,
});
