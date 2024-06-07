import { execa } from 'execa'

import { getPkgManager, isPnpmWorkspace } from './package.ts'

export const pkgManager = await getPkgManager()
const exe = execa({ stdio: 'inherit' })

export async function i(pkgs: string[]) {
  const cmd = pkgManager === 'npm' ? 'i' : 'add'
  const flag = ['-D']

  if (await isPnpmWorkspace()) flag.push('-w')

  return exe(pkgManager, [cmd, ...flag, ...pkgs])
}

export function up(pkgs: string[]) {
  return exe(pkgManager, [
    'up',
    pkgManager === 'npm' ? '--save' : '--latest',
    ...pkgs,
  ])
}

export function un(pkgs: string[]) {
  return exe(pkgManager, ['rm', '-D', ...pkgs])
}
