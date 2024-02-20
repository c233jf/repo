<script setup>
import VueDirs from '../components/VueDirs.vue'
import VueRouteDemo from '../components/VueRouteDemo.vue'
import NestjsDirs from '../components/NestjsDirs.vue'
import ElectronDirs from '../components/ElectronDirs.vue'
</script>

# 框架

所有项目的入口文件和入口函数**必须**以 `main` 命名。

## Vue3

### 推荐

- **可以**使用 [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) 自动导入 api
- **可以**使用 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 自动导入组件

### 目录组织

<VueDirs />

我的项目的目录组织通常是按模块进行的。例如，我们有一个 user 模块。那么，我们对应的有以下目录 / 文件（其中有些目录 / 文件可能没有，视情况而定）：

- `api/user` —— user 模块的接口请求目录
- `composables/useUser.ts` —— user 模块的组合式函数
- `router/modules/user.ts` —— user 模块的路由
- `store/useUserStore.ts` —— user 模块的全局状态
- `views/user` —— user 模块的页面

### 接口

所有接口请求都**必须**放置在 `api` 下并且按模块划分。接口请求逻辑写在 `index.ts` 文件中，接口类型写在 `types.ts` 文件中。

### 组合式函数

组合式函数文件名称和函数名称**必须**以 `use` 开头。

#### 如何写好组合式函数

参考 [官方文档的组合式函数章节](https://cn.vuejs.org/guide/reusability/composables.html)

参考 [VueUse 最佳实践](https://vueuse.org/guide/best-practice.html)

参考 [VueUse 指南](https://vueuse.org/guidelines.html)

### 路由

所有路由文件**必须**放置在 `router/modules` 下并且按模块划分。每个路由对象结构**必须**对应页面文件的目录结构。

例如，我们有以下页面目录结构：

<VueRouteDemo />

对应的路由对象结构：

```ts
import { RouteRecordRaw } from 'vue-router'

import Layout from 'layout/Layout.vue'

export const userRoute: RouteRecordRaw = {
  path: '/user',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('views/user/User.vue'),
    },
    {
      path: 'detail',
      component: () => import('views/user/detail/UserDetail.vue'),
    },
  ],
}
```

### 全局状态

`store` 文件名称和函数名称 **必须**以 `use*Store` 方式命名。

### 页面

所有页面**必须**放置在 `views` 下并且按模块划分。页面目录结构对应路由 `path`，具体看[路由](#路由)。

## Nestjs

### 目录组织

<NestjsDirs />

### 数据库

#### 命名规范

- 实体类名**必须**为单数，如：`User`
- 数据库表名**必须**为复数，且使用 snake_case，如：`my_photos`
- 数据库迁移名字**必须**为时间戳+操作+表名+可选的（列操作+列名），如：`1666949227023-CreateUsersTable`、`1666949227023-AlterPostsTableAddColIsPublished`
- 数据库填充文件名**必须**使用时间戳+表名，如：`1666949227023-users`
- 数据库字段名**必须**使用 snake_case，如：`view_count`
- 数据库表主键**必须**是 `id`
- 数据库表外键**必须**是 `resource_id`，如：`user_id`、`post_id`

#### 迁移文件

**必须**使用 TypeORM 的 `migration:create` 命令生成迁移文件。生成的文件名自带时间戳，所以在命令行传参时无需写时间戳，直接写 `CreateUsersTable` 即可。

#### 填充文件

**必须**使用 TypeORM-extension 的 `seed:create` 命令生成填充文件。生成的文件名自带时间戳，所以在命令行传参时无需写时间戳，直接写 `users` 即可。

### Mock

**必须**按模块组织 mock 文件，每个模块单独一个 mock 文件，如：`user` 模块对应的 mock 文件为 `user.ts`

## Electron

### 目录组织

我的 Electron 项目的目录组织是基于 Electron Forge 的 [Vite + TypeScript](https://www.electronforge.io/templates/vite-+-typescript) 模板构建的。

而且我的 Electron 项目集成了 Vue3 作为前端框架，所以目录组织也有类似于 Vue3 项目的目录结构。

<ElectronDirs />
