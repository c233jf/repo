# Linter setup

Setup for linting TypeScript projects.

This package will install the following dependencies and create config files:

- [ESLint](https://eslint.org/) —— Checking code quality;
- [Prettier](https://prettier.io/) —— Checking code style;
- [Husky](https://typicode.github.io/husky/) —— Setup git hooks;
- [lint-staged](https://github.com/lint-staged/lint-staged#readme) —— Run linters against staged git files;
- [commitlint](https://commitlint.js.org/) —— Lint commit messages.

## Usage

pnpm:

```sh [pnpm]
pnpm dlx @c233jf/linter-setup
```

npm:

```sh [npm]
npm exec -- @c233jf/linter-setup
```
