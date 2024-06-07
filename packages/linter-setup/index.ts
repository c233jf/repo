import { setup as setupESLint } from './utils/eslint.ts'
import { setup as setupPrettier } from './utils/prettier.ts'
import { setup as setupHusky } from './utils/husky.ts'
import { setup as setupLintStaged } from './utils/lint-staged.ts'
import { setup as setupCommitlint } from './utils/commitlint.ts'

async function main() {
  await setupESLint()
  await setupPrettier()
  await setupHusky()
  await setupLintStaged()
  await setupCommitlint()
}

main()
