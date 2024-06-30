import { consola } from 'consola'
import { execa } from 'execa'
import { lt } from 'semver'

import { i, up } from './command.ts'
import { getPkgManager, getPkgVer } from './package.ts'

const deps = ['husky']

async function install() {
  await i(deps)
}

async function update() {
  await up(deps)
}

export async function setup() {
  try {
    const version = await getPkgVer('husky')
    if (lt(version, '9.0.0')) await update()
    else consola.success('Husky is up to date')
  } catch {
    await install()
  } finally {
    await execa(
      (await getPkgManager()) === 'npm' ? 'npx' : 'pnpm',
      ['husky', 'init'],
      {
        stdio: 'inherit',
      },
    )
  }
}
