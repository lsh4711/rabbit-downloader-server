import { customSqlHighlighter } from '@/utils/custom-sql-highlighter.util';
import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  forceUndefined: true,
  entities: ['dist/**/entities/*.entity.js'],
  entitiesTs: ['src/**/entities/*.entity.ts'],

  debug: ['query', 'query-params'],
  highlighter: customSqlHighlighter,
});
