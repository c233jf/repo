import { execa } from 'execa'

import { getPkgManager, isPnpmWorkspace } from './package.ts'

const exe = execa({ stdio: 'inherit' })

export async function i(pkgs: string[]) {
  const pkgManager = await getPkgManager()
  const cmd = pkgManager === 'npm' ? 'i' : 'add'
  const flag = ['-D']

  if (await isPnpmWorkspace()) flag.push('-w')

  return exe(pkgManager, [cmd, ...flag, ...pkgs])
}

export async function up(pkgs: string[]) {
  const pkgManager = await getPkgManager()
  return exe(pkgManager, [
    'up',
    pkgManager === 'npm' ? '--save' : '--latest',
    ...pkgs,
  ])
}

export async function un(pkgs: string[]) {
  return exe(await getPkgManager(), ['rm', '-D', ...pkgs])
}
