# Repo

包含个人代码片段、代码练习、代码实验

## 先决条件

- [Vite+](https://viteplus.dev/)

## 安装项目依赖

```sh
vp install
```

## 运行

### 使用命令行

```sh
vpr docs:dev
```

## Troubleshooting

### `git push` 失败，报 `Bad configuration option: usekeychain`

#### 原因

在 SSH 配置文件中使用了 `UseKeychain` 选项，但这个选项只在 macOS 系统上有效，在 Linux 系统上不被支持。

`UseKeychain` 是 macOS 特有的 SSH 配置选项，用于将 SSH 密钥存储在 macOS 的钥匙串（Keychain）中。

从 macOS 系统复制 SSH 配置到 Vagrant VM 时，没有注意该选项兼容性。

#### 解决

删除或注释该行。

### cursor debug js 文件时，不会打印 `consola` 的输出

#### 原因

参考 [Consola logs do not appear in VSCode Debugger](https://github.com/unjs/consola/issues/311)

#### 解决

参考上面链接
