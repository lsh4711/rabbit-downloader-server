import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  // host: 'localhost',
  // user: 'lsh',
  // port: 3307,
  // dbName: 'rabbit',
  user: 'root',
  dbName: 'test',
  password: 'Lsh4711!',
  debug: true,

  // loadStrategy: LoadStrategy.SELECT_IN,

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
