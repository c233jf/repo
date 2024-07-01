import { pathExists, readJson } from 'fs-extra/esm'
import { join } from 'node:path'
import { cwd } from 'node:process'

type PKGS = 'eslint' | 'prettier' | 'husky' | 'lint-staged' | '@commitlint/cli'
type PKG_MANAGER = 'npm' | 'yarn' | 'pnpm'

interface PKG {
  version: string
}

const PKG_DIR = join(cwd(), 'node_modules/')
let pkgManager: PKG_MANAGER = 'npm'
let hasLockFile: boolean = false

export let getPkgManager = async () => {
  // 设置 ESLint 时会要求选择包管理器，所以这里可以简单地通过
  // 锁文件来判断包管理器。
  if (await pathExists(join(cwd(), 'yarn.lock'))) {
    pkgManager = 'yarn'
    hasLockFile = true
  } else if (await pathExists(join(cwd(), 'pnpm-lock.yaml'))) {
    pkgManager = 'pnpm'
    hasLockFile = true
  } else if (await pathExists(join(cwd(), 'package-lock.json'))) {
    pkgManager = 'npm'
    hasLockFile = true
  }

  if (hasLockFile) {
    getPkgManager = async () => pkgManager
  }

  return pkgManager
}

let isMonoRepo: boolean

export let isPnpmWorkspace = async () => {
  isMonoRepo = await pathExists(join(cwd(), 'pnpm-workspace.yaml'))
  isPnpmWorkspace = async () => isMonoRepo
  return isMonoRepo
}

export async function getPkgVer(pkg: PKGS) {
  const pkgPath = join(PKG_DIR, pkg, 'package.json')
  const { version } = (await readJson(pkgPath)) as PKG
  return version
}
