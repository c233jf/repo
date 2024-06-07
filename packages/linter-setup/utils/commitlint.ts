import { consola } from 'consola'
import { lt } from 'semver'
import { writeFile } from 'node:fs/promises'

import { i, pkgManager, up } from './command.ts'
import { getPkgVer } from './package.ts'

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

async function configHook() {
  await writeFile(
    '.husky/commit-msg',
    `${pkgManager === 'npm' ? 'npx --no --' : 'pnpm'} commitlint --edit $1`,
  )
}

async function install() {
  await writeFile('.npmrc', 'public-hoist-pattern[]=@commitlint/types')
  await i(deps)
  await createConfigFiles()
}

async function update() {
  await up(deps)
}

export async function setup() {
  try {
    const version = await getPkgVer('@commitlint/cli')
    if (lt(version, '19.3.0')) await update()
    else consola.success('commitlint is up to date')
  } catch {
    await install()
  } finally {
    await configHook()
  }
}
