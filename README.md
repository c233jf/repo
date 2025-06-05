# Repo

个人博客以及收集个人的通用包集合。

## 安装项目依赖

```sh
pnpm i
```

## 运行

### 使用命令行

```sh
pnpm docs:dev
```

### 使用 Vagrant

#### 前提

- 根据[教程](https://developer.hashicorp.com/vagrant/tutorials/get-started/install)安装 Vagrant
- 安装 [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

#### 运行

```sh
# 启动虚拟机
vagrant up
# 进入虚拟机
vagrant ssh
```

在虚拟机中执行以下命令：

```sh
# cd 到 repo 目录下
cd repo
# 运行项目
pnpm i
pnpm docs:dev
```

#### 开发

##### 获取 Vagrant VM SSH config 信息

```sh
vagrant ssh-config
```

```sh
# 输出类似以下
Host default
  HostName 127.0.0.1
  User vagrant
  Port 2222
  UserKnownHostsFile /dev/null
  StrictHostKeyChecking no
  PasswordAuthentication no
  IdentityFile /path/to/private_key
  IdentitiesOnly yes
  LogLevel FATAL
  PubkeyAcceptedKeyTypes +ssh-rsa
  HostKeyAlgorithms +ssh-rsa
```

##### 配置 Remote-SSH

- 按 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（Mac）打开命令面板
- 搜索并选择 `Remote-SSH: Open SSH Configuration File`
- 添加以下内容（根据 `vagrant ssh-config` 的信息修改）

```ssh
Host vagrant-vm
  HostName 127.0.0.1
  User vagrant
  Port 2222
  StrictHostKeyChecking no
  IdentityFile /path/to/private_key
  UserKnownHostsFile /dev/null
```

##### 连接 VM

- 按 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（Mac）打开命令面板
- 搜索并选择 `Remote-SSH: Connect to Host` -> 选择配置的主机

连接成功后便可以使用 Cursor 在 VM 上进行开发。

## 包

- [create-package](./packages/create-package/README.md)
- [eslint-config](./packages/eslint-config/README.md)
- [tsconfig](./packages/tsconfig/README.md)

## Troubleshooting

### 运行 install-dependencies provision 报 `source: command not found`

#### 原因

vagrant provision 默认通过 `sudo` 提权到 `root` 用户执行脚本。

`sudo` 环境的特殊性：

- `sudo` 会启动一个新的 shell 环境
- 可能会使用更基础的 shell（如 `/bin/sh` 而不是 `/bin/bash`）
- 环境变量和 PATH 可能被重置
- 某些内置命令不可用

#### 解决

配置 provision 的 `privileged: false`，并且手动为 install-dependencies 脚本中需要提权的命令使用 `sudo`。

### 运行 install-dependencies provision 报 `pnpm: command not found`

#### 原因

在 Vagrant 的 Shell Provisioner 中，脚本默认会在 `/tmp/vagrant-shell` 目录执行，这可能导致命令找不到的问题。

- **环境变量不同**：`/tmp/vagrant-shell` 是临时目录，与用户登录环境（如 `~/.bashrc` 加载的环境变量）隔离
- **PATH 变量缺失**：关键路径（如 `/usr/local/bin`, `$HOME/.local/bin`）可能未加入 `PATH`

#### 解决

使用绝对路径调用命令。

### 运行 install-dependencies provision 报 `ERR_PNPM_CANNOT_MANAGE_NODE Unable to manage Node.js because pnpm was not installed using the standalone installation script`

#### 原因

未明，可能是 shell 环境的问题。

#### 解决

在 [pnpm-workspace.yaml](./pnpm-workspace.yaml) 中设置项目运行时的 Node.js 版本。

参考：[useNodeVersion](https://pnpm.io/zh/settings#usenodeversion)
