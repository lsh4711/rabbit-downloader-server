import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  entities: ['src/*/entities/*.entity.ts'],
  entityGenerator: {
    path: 'src',
    fileName: (className) => {
      return `${toKebabCase(className)}/entities/${toKebabCase(className)}.entity`;
    },
    onImport: (alias) => {
      return {
        name: alias,
        path: `#@/${toKebabCase(alias)}/entities/${toKebabCase(alias)}.entity`,
      };
    },
  },
});

const toKebabCase = (pascalCase: string): string => {
  return pascalCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
