import { consola } from 'consola'
import { outputJson } from 'fs-extra/esm'
import { lt } from 'semver'

import { i, up } from './command.ts'
import { getPkgVer } from './package.ts'

const deps = ['prettier']

async function createConfigFiles() {
  const config = {
    singleQuote: true,
    semi: false,
  }
  await outputJson('.prettierrc.json', config, { spaces: 2 })
}

async function install() {
  await i(deps)
  await createConfigFiles()
}

async function update() {
  await up(deps)
}

export async function setup() {
  try {
    const version = await getPkgVer('prettier')
    if (lt(version, '3.0.0')) await update()
    else consola.success('Prettier is up to date')
  } catch {
    await install()
  }
}
