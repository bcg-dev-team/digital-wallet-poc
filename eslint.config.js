// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config({
  ignores: [
    // Dependencies
    'node_modules/',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',

    // Build outputs
    'dist/',
    'build/',
    '.next/',
    '.nuxt/',

    // Logs
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',

    // Runtime data
    'pids',
    '*.pid',
    '*.seed',
    '*.pid.lock',

    // Coverage directory
    'coverage/',
    '*.lcov',
    '.nyc_output',

    // Dependency directories
    'jspm_packages/',

    // Cache directories
    '.npm',
    '.eslintcache',
    '.rpt2_cache/',
    '.rts2_cache_cjs/',
    '.rts2_cache_es/',
    '.rts2_cache_umd/',
    '.cache',
    '.parcel-cache',
    '.fusebox/',

    // Environment files
    '.env',
    '.env.test',
    '.env.local',
    '.env.production',

    // Serverless
    '.serverless/',

    // DynamoDB Local
    '.dynamodb/',

    // TernJS
    '.tern-port',

    // VSCode test
    '.vscode-test',

    // Yarn v2
    '.yarn/cache',
    '.yarn/unplugged',
    '.yarn/build-state.yml',
    '.yarn/install-state.gz',
    '.pnp.*',

    // Cursor AI
    '.cursor/',

    // Generated files
    '*.d.ts',

    // Config files
    '*.config.js',
    '*.config.ts',
  ],
}, {
  extends: [
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
  ],
  files: ['**/*.{ts,vue,js}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      parser: typescriptEslint.parser,
    },
  },
  rules: {
    'no-debugger': 'error',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // 순환참조 방지 규칙
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-relative-parent-imports': 'off', // 모노레포에서는 상대 경로 허용
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/no-parsing-error': [
      'error',
      {
        'invalid-first-character-of-tag-name': false,
      },
    ],
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}, eslintConfigPrettier, storybook.configs["flat/recommended"]);
