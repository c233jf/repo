<script setup>
import VueDirs from './components/VueDirs.vue'
import VueRouteDemo from './components/VueRouteDemo.vue'
import NestjsDirs from './components/NestjsDirs.vue'
import ElectronDirs from './components/ElectronDirs.vue'
</script>

# 个人编码规范

规范是以实践经验为基础，总结出兼备开发效率、程序执行效率、扩展性和安全性等最佳实践。当然，项目规范并不是一成不变，随着实践经验的丰富、视野的拓宽、优秀理念的吸收，我们的编程观念也会改变，项目规范也会更新。

这里收集了我个人所有项目的规范以供参考。

## 规范的优势

- 高效编码 —— 避免做过多的 “决策选择” 而导致时间的浪费
- 风格统一 —— 统一代码风格，阅读别人写的代码就像阅读自己写的代码一样
- 减少错误 —— 遵循规范的实践，能有效避免一些坑，也能减少初级错误

## 开发哲学

- DRY —— “Don’t Repeat Yourself” 不写重复代码
- 约定俗成 —— “Convention Over Configuration”，优先选择官方、框架以及社区提倡的做法
- KISS —— “Keep it Simple，Stupid”，提倡简单易读的代码，不写高深、晦涩难懂的代码
- 最少配置 —— 对所有构建工具、项目等配置应尽可能使用默认选项，尽可能复用重复配置
- 最少权限 —— 只分配完成工作所需的权限

## 编程语言

### TypeScript

**必须**使用 [ESLint](https://eslint.org/) 作为代码质量的检查工具。**必须**使用 [Prettier](https://prettier.io/) 作为代码风格的检查工具。

示例配置如下：

::: code-group

```js [.eslintrc.js]
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
```

```json
{
  "singleQuote": true,
  "semi": false
}
```

:::

#### 命名规范

- 变量和函数命名**应该**尽量表明意图
- 变量**应该**尽量使用名词结尾
- 函数**应该**尽量使用动词开头
- 变量和函数命名**必须**使用 camelCase，如：`highLevel, getMoney()`
- 类名**必须**使用 PascalCase，如：`class Person {}`
- 环境变量和共享的常量必须使用 全字母大写 + snake_case，如：`MAX_SIZE`

#### 函数

##### 泛型函数

参考 [编写好的泛型函数指南](https://www.typescriptlang.org/docs/handbook/2/functions.html#guidelines-for-writing-good-generic-functions)

##### 函数重载

参考 [编写好的函数重载](https://www.typescriptlang.org/docs/handbook/2/functions.html#writing-good-overloads)

#### 类

- 如果类的创建需要参数，请**尽量**使用 [参数属性](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)

#### 模块

- 所有导入**必须**放置在文件开头
- 导入**必须**以下面几个区域顺序放置，以一个空行分隔：

```ts
// 第三方库
import something from 'thirdty-part'

// 自己编码的通用函数
import helper from '../helper'

// 自己编码的组件
import cpn from 'component'

// 静态资源
import 'assets'
```

- 所有的导出在变量和函数定义时同时给出，这样能够直观看出那些数据是暴露出去的，那些是模块内部使用的，而不是仅使用一个 `export` 语句，如：

```ts
// Good
export let one
export let two
export let three
export let four

// Bad
let one
let two
let three
let four

export { one, two, three, four }
```

### Python

请参考 [PEP8](https://peps.python.org/pep-0008/)

### C++

请参考 [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html#C++_Version)

## 框架

### Vue3

#### 推荐

- **可以**使用 [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) 自动导入 api
- **可以**使用 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 自动导入组件

#### 目录组织

<VueDirs />

我的项目的目录组织通常是按模块进行的。例如，我们有一个 user 模块。那么，我们对应的有以下目录 / 文件（其中有些目录 / 文件可能没有，视情况而定）：

- `api/user` —— user 模块的接口请求目录
- `composables/useUser.ts` —— user 模块的组合式函数
- `router/modules/user.ts` —— user 模块的路由
- `store/useUserStore.ts` —— user 模块的全局状态
- `views/user` —— user 模块的页面

#### 接口

所有接口请求都**必须**放置在 `api` 下并且按模块划分。接口请求逻辑写在 `index.ts` 文件中，接口类型写在 `types.ts` 文件中。

#### 组合式函数

组合式函数文件名称和函数名称**必须**以 `use` 开头。

##### 如何写好组合式函数

参考 [官方文档的组合式函数章节](https://cn.vuejs.org/guide/reusability/composables.html)

参考 [VueUse 最佳实践](https://vueuse.org/guide/best-practice.html)

参考 [VueUse 指南](https://vueuse.org/guidelines.html)

#### 路由

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

#### 全局状态

`store` 文件名称和函数名称 **必须**以 `use*Store` 方式命名。

#### 页面

所有页面**必须**放置在 `views` 下并且按模块划分。页面目录结构对应路由 `path`，具体看[路由](#路由)。

### Nestjs

#### 目录组织

<NestjsDirs />

#### 数据库

##### 命名规范

- 实体类名**必须**为单数，如：`User`
- 数据库表名**必须**为复数，且使用 snake_case，如：`my_photos`
- 数据库迁移名字**必须**为时间戳+操作+表名+可选的（列操作+列名），如：`1666949227023-CreateUsersTable`、`1666949227023-AlterPostsTableAddColIsPublished`
- 数据库填充文件名**必须**使用时间戳+表名，如：`1666949227023-users`
- 数据库字段名**必须**使用 snake_case，如：`view_count`
- 数据库表主键**必须**是 `id`
- 数据库表外键**必须**是 `resource_id`，如：`user_id`、`post_id`

##### 迁移文件

**必须**使用 TypeORM 的 `migration:create` 命令生成迁移文件。生成的文件名自带时间戳，所以在命令行传参时无需写时间戳，直接写 `CreateUsersTable` 即可。

##### 填充文件

**必须**使用 TypeORM-extension 的 `seed:create` 命令生成填充文件。生成的文件名自带时间戳，所以在命令行传参时无需写时间戳，直接写 `users` 即可。

#### Mock

**必须**按模块组织 mock 文件，每个模块单独一个 mock 文件，如：`user` 模块对应的 mock 文件为 `user.ts`

### Electron

#### 目录组织

我的 Electron 项目的目录组织是基于 Electron Forge 的 [Vite + TypeScript](https://www.electronforge.io/templates/vite-+-typescript) 模板构建的。

而且我的 Electron 项目集成了 Vue3 作为前端框架，所以目录组织也有类似于 Vue3 项目的目录结构。

<ElectronDirs />

## 环境变量

**必须**使用环境变量管理项目的配置。

JS 项目**必须**使用 [dotenv](https://github.com/motdotla/dotenv) 管理项目的环境变量。

## References

- [Laravel 项目开发规范](https://learnku.com/docs/laravel-specification/9.x/whats-the-use-of-standards/12720)
