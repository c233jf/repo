import { ensureDirSync, readdirSync, remove, writeFileSync } from 'fs-extra'
import { join } from 'path'
import { execaCommandSync } from 'execa'
import type { SyncOptions } from 'execa'
import { afterAll, beforeAll, expect, test } from 'vitest'

const CLI_PATH = join(__dirname, '..', 'index.mjs')
const projectName = 'test-package'
const projectPath = join(__dirname, projectName)

function run(args: string[], options: SyncOptions = {}) {
  return execaCommandSync(`node ${CLI_PATH} ${args.join(' ')}`, options)
}

function createNonEmptyDir() {
  ensureDirSync(projectPath)

  const pkgPath = join(projectPath, 'package.json')
  writeFileSync(pkgPath, '{ "foo": "bar" }')
}

function rmTestProject() {
  return remove(projectPath)
}

beforeAll(rmTestProject)
afterAll(rmTestProject)

test('prompts for the target directory if none supplied', () => {
  const { stdout } = run([])
  expect(stdout).toContain('Target Directory:')
})

test('prompts for the template if none supplied when target dir is current directory', () => {
  ensureDirSync(projectPath)
  const { stdout } = run(['.'], { cwd: projectPath })
  expect(stdout).toContain('Select a template:')
})

test('prompts for the template if none supplied', () => {
  const { stdout } = run([projectName])
  expect(stdout).toContain('Select a template:')
})

test('prompts for the template on not supplying a value for --template', () => {
  const { stdout } = run([projectName, '--template'])
  expect(stdout).toContain('Select a template:')
})

test('prompts for the template on supplying an invalid template', () => {
  const { stdout } = run([projectName, '--template', 'unknown'])
  expect(stdout).toContain(
    `"unknown" isn't a valid template. Please choose from below:`
  )
})

test('asks to overwrite non-empty target directory', () => {
  createNonEmptyDir()
  const { stdout } = run([projectName], { cwd: __dirname })
  expect(stdout).toContain(`Target directory "${projectName}" is not empty.`)
})

test('asks to overwrite non-empty current directory', () => {
  createNonEmptyDir()
  const { stdout } = run(['.'], { cwd: projectPath })
  expect(stdout).toContain(`Target directory "${projectName}" is not empty.`)
})
