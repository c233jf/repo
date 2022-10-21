#!/usr/bin/env node

// @ts-check
import fse from 'fs-extra'
import { basename, join, relative, resolve } from 'path'
import chalk from 'chalk'
import minimist from 'minimist'
import prompts from 'prompts'
import { fileURLToPath } from 'url'

const {
  copySync,
  emptydirSync,
  existsSync,
  readdirSync,
  readJsonSync,
  renameSync,
  writeJsonSync,
} = fse
const argv = minimist(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const DIR = join(fileURLToPath(import.meta.url), '..')
const PREFIX = 'template-'
const TEMPLATES = readdirSync(DIR)
  .filter((e) => e.startsWith(PREFIX))
  .map((e) => e.substring(9))
const TEMPLATES_NAME = TEMPLATES.map((e) => PREFIX + e)
const PKG_CONFIG_FILE = 'package.json'

/**
 * @param {string} msg
 */
function error(msg) {
  console.error(chalk.red(msg))
}

/**
 * @param {string} msg
 */
function success(msg) {
  console.log(chalk.green(msg))
}

/**
 * @param {string} dir
 */
function isEmpty(dir) {
  return readdirSync(dir).length === 0
}

/**
 * @param {string} name
 */
function isValidPackageName(name) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name)
}

/**
 * @param {string} name
 */
function toValidPackageName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

/**
 * @param {string} targetDir
 */
function formatRoot(targetDir) {
  return resolve(targetDir.trim().replace(/^\//, ''))
}

async function init() {
  let targetDir = argv._[0] ? formatRoot(argv._[0]) : ''
  let template = argv.template || argv.t
  const defaultTargetDir = 'my-project'
  const getProjectName = () => basename(targetDir)

  try {
    const response = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'targetDir',
          message: 'Target Directory:',
          initial: defaultTargetDir,
          format: (val) => formatRoot(val),
        },
        {
          type: () =>
            !existsSync(targetDir) || isEmpty(targetDir) ? null : 'toggle',
          name: 'overwrite',
          message: () =>
            `Target directory "${getProjectName()}" is not empty. Remove existing files and continue?`,
          initial: true,
          active: 'yes',
          inactive: 'no',
        },
        {
          type: template && TEMPLATES.includes(template) ? null : 'select',
          name: 'template',
          message:
            typeof template === 'string' && !TEMPLATES.includes(template)
              ? `"${template}" isn't a valid template. Please choose from below: `
              : 'Select a template:',
          initial: 0,
          choices: TEMPLATES.map((e) => ({ title: e })),
        },
        {
          type: 'text',
          name: 'packageName',
          message: 'Package name:',
          initial: toValidPackageName(getProjectName()),
          validate: (val) =>
            isValidPackageName(val) || 'Invalid package.json name',
        },
      ],
      {
        onSubmit: (prompt, answer) => {
          if (prompt.name === 'targetDir') {
            targetDir = answer
          } else if (prompt.name === 'overwrite' && answer === false) {
            return true
          }
        },
        onCancel: () => {
          throw new Error('Operation cancelled!')
        },
      }
    )

    const { overwrite, packageName, template: _template } = response

    if (overwrite === false) throw new Error('Operation cancelled!')
    if (overwrite) {
      emptydirSync(targetDir)
    }

    console.log(`\nScaffolding project in ${targetDir}...`)

    template =
      typeof _template === 'number'
        ? TEMPLATES_NAME[_template]
        : PREFIX + template

    const templatePath = join(DIR, template)
    copySync(templatePath, targetDir)

    const gitignore = resolve(targetDir, '_gitignore')
    const npmrc = resolve(targetDir, '_npmrc')
    if (existsSync(gitignore)) {
      renameSync(gitignore, resolve(targetDir, '.gitignore'))
    }
    if (existsSync(npmrc)) {
      renameSync(npmrc, resolve(targetDir, '.npmrc'))
    }

    const pkg = readJsonSync(join(templatePath, PKG_CONFIG_FILE))
    pkg.name = packageName
    writeJsonSync(join(targetDir, PKG_CONFIG_FILE), pkg, { spaces: 2 })

    success(`\nDone. Now run: cd ${relative(cwd, targetDir)}\n`)
    success(' and install dependencies using your favorite package manager')
  } catch (e) {
    error(e.message)
  }
}

init()
