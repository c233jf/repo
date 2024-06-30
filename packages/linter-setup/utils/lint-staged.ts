import { consola } from 'consola'
import { readJson, writeJson } from 'fs-extra/esm'
import { lt } from 'semver'
import { writeFile } from 'node:fs/promises'

import { i, up } from './command.ts'
import { getPkgManager, getPkgVer } from './package.ts'

const deps = ['lint-staged']

async function config() {
  await writeFile(
    '.husky/pre-commit',
    `${(await getPkgManager()) === 'npm' ? 'npx' : 'pnpm'} lint-staged`,
  )
  const packageJson = await readJson('package.json')
  packageJson['lint-staged'] = {
    '*.{js,ts,vue,tsx}': 'eslint --cache --fix',
    '*.{js,css,md,ts,vue,tsx}': 'prettier --write',
  }
  await writeJson('package.json', packageJson, { spaces: 2 })
}

async function install() {
  await i(deps)
}

async function update() {
  await up(deps)
}

export async function setup() {
  try {
    const version = await getPkgVer('lint-staged')
    if (lt(version, '15.0.0')) await update()
    else consola.success('lint-staged is up to date')
  } catch {
    await install()
  } finally {
    await config()
  }
}
