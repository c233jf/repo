import { consola } from 'consola'
import { lt } from 'semver'
import { rm, writeFile } from 'node:fs/promises'

import { i, up } from './command.ts'
import { getPkgManager, getPkgVer } from './package.ts'

const deps = [
  '@commitlint/cli',
  '@commitlint/config-conventional',
  '@commitlint/prompt-cli',
]

async function createConfigFiles() {
  const importContent = `import { type UserConfig } from '@commitlint/types'`

  const exportContent = `export default {
  extends: ['@commitlint/config-conventional'],
} as UserConfig
`

  await writeFile('commitlint.config.ts', importContent + '\n' + exportContent)
}

async function removeConfigFiles() {
  return rm('commitlint.config.js', { force: true })
}

async function configHook() {
  await writeFile(
    '.husky/commit-msg',
    `${(await getPkgManager()) === 'npm' ? 'npx --no --' : 'pnpm'} commitlint --edit $1`,
  )
}

async function install() {
  if ((await getPkgManager()) === 'pnpm') {
    await writeFile('.npmrc', 'public-hoist-pattern[]=@commitlint/types')
  }
  await i(deps)
}

async function update() {
  await up(deps)
  await removeConfigFiles()
}

export async function setup() {
  try {
    const version = await getPkgVer('@commitlint/cli')
    if (lt(version, '19.3.0')) await update()
    else consola.success('commitlint is up to date')
  } catch {
    await install()
  } finally {
    await createConfigFiles()
    await configHook()
  }
}
