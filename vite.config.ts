import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          include: ['docs/__test__/**/*.spec.ts'],
          name: 'docs',
        },
      },
    ],
  },
  staged: {
    '{docs,packages}/**/*.{js,ts,tsx,vue}': 'vp check --fix',
  },
  fmt: {
    ignorePatterns: ['.agents/**'],
    singleQuote: true,
    semi: false,
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ['.agents/**', 'docs/repo/language/**'],
  },
})
