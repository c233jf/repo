# create-package

此项目用于简单、快速地创建包或后台项目的雏形(**所有项目基于 ts**)

With npm:

`npm init @chenjf/package`

With yarn:

`yarn create @chenjf/package`

With pnpm:

`pnpm create @chenjf/package`

Or directly specify the project name and the template:

```
# npm 6.x
npm init @chenjf/package my-project --template vue-ts-git

# npm 7+
npm init @chenjf/package -- my-project --template vue-ts-git

# yarn
yarn create @chenjf/package my-project --template vue-ts-git

# pnpm
pnpm create @chenjf/package my-project --template vue-ts-git
```

## Options

| option     | alia | desc |
| ---------- | ---- | ---- |
| --template | -t   |      |

## Supported template presets

- package
- vue-ts-git
- vue-admin-ts-git

## Notice

After installing packages, executing script `enable:hooks` if hooks can not run
