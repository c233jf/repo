import { consola } from 'consola'
import { execa } from 'execa'
import { lt } from 'semver'
import { rm, writeFile } from 'node:fs/promises'

import { i, pkgManager, un, up } from './command.ts'
import { getPkgVer } from './package.ts'

async function install() {
  await execa(
    pkgManager,
    [pkgManager === 'npm' ? 'init' : 'create', '@eslint/config'],
    { stdio: 'inherit' },
  )
}

async function createConfigFiles() {
  const importContent = `import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
`

  const exportContent = `/** @type {import('@types/eslint').Linter.FlatConfig} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
]
`

  await writeFile('eslint.config.mjs', importContent + '\n' + exportContent)
}

async function removeConfigFiles() {
  await Promise.all(
    [
      '.eslintcache',
      '.eslintignore',
      '.eslintrc.js',
      '.eslintrc.cjs',
      '.eslintrc.mjs',
    ].map((e) => rm(e, { force: true })),
  )
}

async function updateDeps() {
  // Remove old packages.
  await un([
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'vue-eslint-parser',
  ])
  // Install new packages.
  await i(['@eslint/js', '@types/eslint', 'typescript-eslint', 'globals'])
  // Update ESLint.
  await up(['eslint', 'eslint-config-prettier', 'eslint-plugin-vue'])
}

async function update() {
  await removeConfigFiles()
  await updateDeps()
  await createConfigFiles()
}

export async function setup() {
  try {
    const version = await getPkgVer('eslint')
    if (lt(version, '9.0.0')) await update()
    else consola.success('ESLint is up to date')
  } catch {
    await install()
  }
}
