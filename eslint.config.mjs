import path from 'node:path'
import { fileURLToPath } from 'node:url'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

// Shared rules for all files
const sharedRules = {
  // Performance & Bundle Size
  'unused-imports/no-unused-imports': 'error', // Unused imports increase bundle size
  'no-unused-vars': 'off', // Turn off base rule to avoid conflicts
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],

  // Code Quality & Bug Prevention
  'no-console': ['error', { allow: ['warn', 'dir'] }], // Prevent console.log in production, allow debugging tools
  'no-restricted-syntax': ['error', 'TSEnumDeclaration', 'WithStatement'], // Prevent problematic syntax patterns
  'no-unused-expressions': 'error', // Catch typos like `foo.bar` instead of `foo.bar()`
  'no-debugger': 'error', // Prevent debugger statements in production
  'no-alert': 'error', // Prevent alert() usage in production
  'no-var': 'error', // Enforce let/const over var
  'prefer-const': 'error', // Use const when variables aren't reassigned

  // TypeScript rules (turned off for compatibility)
  '@typescript-eslint/interface-name-prefix': 'off', // Allow flexible interface naming
  '@typescript-eslint/member-delimiter-style': 'off', // Don't enforce semicolons in interfaces
  '@typescript-eslint/no-empty-interface': 'off', // Sometimes empty interfaces are useful as placeholders

  // React Best Practices
  'react/self-closing-comp': ['error', { component: true, html: true }], // <Component /> instead of <Component></Component>

  // Import Organization - Clean imports = easier navigation
  'import/order': [
    'error',
    {
      groups: [
        'builtin', // node:fs, node:path
        'external', // react, next, lodash
        'type', // import type { ... }
        'internal', // @/components, ~/utils
        'sibling', // ./component
        'parent', // ../component
        'index', // ./
        'object', // import log = console.log
      ],
      'newlines-between': 'always',
      pathGroupsExcludedImportTypes: ['react'],
      alphabetize: { order: 'asc', caseInsensitive: true },
      pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }], // React always goes first
    },
  ],
}

const config = [
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'unused-imports': unusedImports,
      '@typescript-eslint': typescriptEslint,
    },
    rules: sharedRules,
  },
]

export default config
