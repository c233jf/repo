# 使用 Electron 遇到的坑

## Vite and TypeORM

该问题是使用 [Electron Forge](https://www.electronforge.io/) 中的 `Vite + TypeScript` 模板时遇到的。

首先我们根据 [这篇文章](../../builder/vite/troubleshooting.md#typeorm-and-sqlite3) 调整一下 `vite.main.config.ts` 内容：

```ts
import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['typeorm'],
    },
  },
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    conditions: ['import', 'module', 'node', 'default'],
  },
})
```

::: tip
[VitePlugin](https://github.com/electron/forge/blob/8a44cfd9a84325d0fadba7822eabd8620f68d99b/packages/plugin/vite/src/ViteConfig.ts#L65) 内部有一个插件外部化了 `node` 的内置模块，所以这里只需外部化 `typeorm`。
:::

在运行 `npm start` 命令后，会报错：`[4192:0907/184556.203:ERROR:crashpad_client_win.cc(844)] not connected`。目前的解决办法是把 `electron` 版本降级到 v25。

## References

- [Crashing when running v8.5.2 on Electron 26.1.0 on first function call to db](https://github.com/WiseLibs/better-sqlite3/issues/1053)
