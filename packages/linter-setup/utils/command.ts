import { execa } from 'execa'

import { getPkgManager, isPnpmWorkspace } from './package.ts'

const exe = execa({ stdio: 'inherit' })

function toLatest(pkg: string) {
  return `${pkg}@latest`
}

export async function i(pkgs: string[]) {
  const pkgManager = await getPkgManager()
  const cmd = pkgManager === 'npm' ? 'i' : 'add'
  const flag = ['-D', '--ignore-scripts']

  // 修复依赖冲突
  if (pkgManager === 'npm') flag.push('--legacy-peer-deps')
  if (await isPnpmWorkspace()) flag.push('-w')

  return exe(pkgManager, [cmd, ...flag, ...pkgs])
}

export async function up(pkgs: string[]) {
  const pkgManager = await getPkgManager()
  if (pkgManager === 'npm') {
    return i(pkgs.map(toLatest))
  }
  return exe(pkgManager, ['up', ...pkgs.map(toLatest)])
}

export async function un(pkgs: string[]) {
  return exe(await getPkgManager(), ['rm', '-D', ...pkgs])
}
