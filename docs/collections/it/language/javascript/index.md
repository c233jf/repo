<script setup>
import {
  monorepo,
  packageManager,
  runtime,
  browser,
  frameworks,
  build,
  ui,
  string,
  datetime,
  image,
  file,
  search,
  request,
  utils,
  animation,
  css,
  layout,
  test,
  cli,
  charts,
  richText,
  git,
  project,
} from './data.ts'

import NavContainer from '@/components/NavContainer/NavContainer.vue'
</script>

# JavaScript

## Monorepo

<NavContainer :items="monorepo" />

## 包管理工具

<NavContainer :items="packageManager" />

## Node.js

<NavContainer :items="runtime" />

## 浏览器

<NavContainer :items="browser" />

## 框架

<NavContainer :items="frameworks" />

### Vue 生态工具

<NavContainer :items="frameworks[0].children" />

### Electron 生态工具

<NavContainer :items="frameworks[3].children" />

## 构建工具

<NavContainer :items="build" />

### Vite 插件

<NavContainer :items="build[0].children" />

## UI

<NavContainer :items="ui" />

## 字符串

<NavContainer :items="string" />

## 日期时间

<NavContainer :items="datetime" />

## 图片

<NavContainer :items="image" />

## 文件

<NavContainer :items="file" />

## 请求库

<NavContainer :items="request" />

## 搜索

<NavContainer :items="search" />

## 通用库

<NavContainer :items="utils" />

## 动画

<NavContainer :items="animation" />

## CSS

<NavContainer :items="css" />

## 布局

<NavContainer :items="layout" />

## 测试

<NavContainer :items="test" />

::: tip
如果你的项目是使用 Vite 构建的话，推荐使用 Vitest，因为它可以利用同一套 Vite 配置和转换管道。集成更简单，性能更优异。

如果你已经有一套 Jest 的测试配置，并且需要迁移到基于 Vite 的项目时，你可以使用 [vite-jest](https://github.com/sodatea/vite-jest) 这个包在 Vite 中使用。
:::

## CLI

<NavContainer :items="cli" />

## 图表

<NavContainer :items="charts" />

## 富文本

<NavContainer :items="richText" />

## Git

<NavContainer :items="git" />

## 项目规范

<NavContainer :items="project" />
