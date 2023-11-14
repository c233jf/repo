# electron-vue

本模板基于 [Electron Forge Vite + TypeScript template](https://www.electronforge.io/templates/vite-+-typescript), 集成了 [Vue 3](https://cn.vuejs.org/guide/introduction.html).

## 使用技术

- 路由 - [Vue-Router](https://router.vuejs.org/zh/introduction.html)
- 状态管理 - [Pinia](https://pinia.vuejs.org/)
- css 框架 - [Windi CSS](https://cn.windicss.org/), 本模板没有使用 [css 预处理器](https://cn.vitejs.dev/guide/features.html#css-pre-processors)
- 自动导入 - [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import), [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- Icon - [unplugin-icons](https://github.com/antfu/unplugin-icons)

**在 vscode 中可以安装 [windicss 扩展](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) 来获得语法提示以及屏蔽 nesting 和 @apply 等指令的错误**

**注意: 由于自动导入作为 vite 的插件的一部分, 需要启动服务器才能让插件检测到要导入的内容. 模板中组件的自动导入则需要保存文件的修改才能让插件检测到导入的组件. 配合 Volar 能够让模板中的组件获得 intellisense.**

## Auto Import

**注意: 把组件当成变量使用时仍然需要手动导入**

**注意: 要小心自动导入的变量或函数命名的冲突**

**注意: 对于类型的导入仍然需要手动导入**

## Import Alias

本模板设置如下导入别名, 以方便进行导入.

- views

具体设置请查看 [vite.renderer.config.ts](./vite.renderer.config.ts) 里的 `resolve.alias` 以及 tsconfig 里的 `compilerOptions.paths`.

## Style

### Global Style

全局样式的设置请参考 [windi.config.ts](./windi.config.ts) 文件
