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
npm init @chenjf/package my-project --template element-admin

# npm 7+
npm init @chenjf/package -- my-project --template element-admin

# yarn
yarn create @chenjf/package my-project --template element-admin

# pnpm
pnpm create @chenjf/package my-project --template element-admin
```

## Options

| option     | alia | desc |
| ---------- | ---- | ---- |
| --template | -t   |      |

## Supported template presets:

- package
