# Troubleshooting

## 在 watch mode 中测试 create-package 包时，无限重新运行测试套件

**解决方法**

在配置文件中配置 [`server.watch.ignored`](https://cn.vitejs.dev/config/server-options.html#server-watch)，把测试中生成的文件夹添加到监听文件的忽略列表。

```ts
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/packages/create-package/__test__/test-package/**'],
    },
  },
})
```

**原因**

vitest 默认会在以下文件发生改变时强制重新运行测试套件。

`['**/package.json/**', '**/vitest.config.*/**', '**/vite.config.*/**']`

而测试中生成文件包含了 `package.json`，由于测试完成后生成的文件会被删除，vitest 检测到了文件更改后便重新运行测试套件。

**参考**

- [forceRerunTriggers](https://cn.vitest.dev/config/#forcereruntriggers)
- [Watch dynamically imported files not detected automatically and cached](https://github.com/vitest-dev/vitest/issues/5429#issuecomment-2021055998)
