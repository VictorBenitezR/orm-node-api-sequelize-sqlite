import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node, // Esto reemplaza a "env": {"node": true}
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['error', { args: 'none' }],
      // Eliminamos indent, quotes y semi porque de eso se encargará Prettier
    },
  },
];
