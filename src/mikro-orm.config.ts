import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
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
