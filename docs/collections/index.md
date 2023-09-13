# Collections

此页面列出我目前所使用的工具、库

## :hammer_and_pick: 通用库

- [Axios](https://axios-http.com/zh/docs/intro) —— 基于 Promise 的网络请求库
- [clipboard.js](https://clipboardjs.com/) —— 复制文本到粘贴板
- [Day.js](https://dayjs.gitee.io/zh-CN/) —— 处理时间和日期
- [Fuse.js](https://fusejs.io/) —— 模糊搜索
- [Ramda](https://ramdajs.com/) —— 实用函数库
- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) —— 汉字转拼音
- [screenfull](https://github.com/sindresorhus/screenfull) —— 全屏

## :rocket: 性能

- [Compressor.js](https://github.com/fengyuanchen/compressorjs) —— 图片压缩

## :file_folder: 文件操作

- [FileSaver.js](https://github.com/eligrey/FileSaver.js) —— 文件保存的 H5 实现
- [JSZip](https://stuk.github.io/jszip/) —— 压缩文件为 ZIP
- [PDF.js](https://mozilla.github.io/pdf.js/) —— 解析和渲染 PDFs
- [xlsx](https://www.npmjs.com/package/xlsx) —— 保存文件为 Excel 格式

## :black_nib: 富文本

- [CodeMirror](https://codemirror.net/) —— 代码编辑器
- [TinyMCE](https://www.tiny.cloud/docs/tinymce/6/)
- [Milkdown](https://milkdown.dev/) —— 所见即所得 markdown 编辑器

## :chart: 图表

- [ECharts](https://echarts.apache.org/zh/index.html) —— 基于 JavaScript 的可视化图表库
- [Mermaid](https://mermaid.js.org/) —— 根据受 Markdown 启发的文本定义动态渲染图表

## :package: 包管理工具

- [pnpm](https://pnpm.io/zh/) —— 快速的，节省磁盘空间的包管理工具
- [ncu](https://github.com/raineorshine/npm-check-updates) —— 检查依赖的最新版本
- [Renovate](https://docs.renovatebot.com/) —— 自动化更新依赖，支持多平台、多语言

## :wrench: 测试工具

- [Faker](https://fakerjs.dev/guide/) —— 生成伪数据
- [msw](https://mswjs.io/) —— 用于浏览器和 Node.js 的 REST/GraphQL API mocking
- [Jest](https://jestjs.io/zh-Hans/) —— 优雅、简洁的 JavaScript 测试框架
- [Sentry](https://sentry.io/welcome/) —— 错误跟踪服务
- [supertest](https://github.com/ladjs/supertest) —— 测试 nodejs HTTP 服务器
- [Vitest](https://cn.vitest.dev/) —— 基于 [Vite](https://cn.vitejs.dev/) 的单元测试框架

::: tip
如果你的项目是使用 Vite 构建的话，推荐使用 Vitest，因为它可以利用同一套 Vite 配置和转换管道。集成更简单，性能更优异。

如果你已经有一套 Jest 的测试配置，并且需要迁移到基于 Vite 的项目时，你可以使用 [vite-jest](https://github.com/sodatea/vite-jest) 这个包在 Vite 中使用。
:::

## :gear: 构建工具

- [Vite](https://cn.vitejs.dev/)
  - [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) —— 自动按需导入 API
  - [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) —— 自动按需导入组件

## :movie_camera: 动画

- [BetterScroll](https://better-scroll.github.io/docs/zh-CN/) —— 滚动库
- [Driver.js](https://github.com/kamranahmedse/driver.js) —— 用户引导引擎
- [NProgress](https://github.com/rstacruz/nprogress) —— 导航进度条

## :paintbrush: CSS

- [Windi CSS](https://cn.windicss.org/guide/) —— CSS 框架

## :love_hotel: 布局

- [Floating UI](https://floating-ui.com/) —— 浮动元素定位与交互
- [Masonry](https://github.com/desandro/masonry) —— 瀑布流布局
- [SortableJS](https://github.com/SortableJS/Sortable) —— 拖曳放置库
- [medium-zoom](https://github.com/francoischalifour/medium-zoom) —— 图片预览

## :art: UI

- [Element-Plus](https://element-plus.org/zh-CN/guide/design.html)

## :jigsaw: 框架及其生态工具

- [Vue](https://cn.vuejs.org/guide/introduction.html) —— 用于构建用户界面的 JS 框架
  - [Pinia](https://pinia.vuejs.org/zh/) —— 状态管理库
  - [Vue I18n](https://vue-i18n.intlify.dev/guide/) —— 国际化插件
  - [Vue Router](https://router.vuejs.org/zh/) —— Vue 的官方路由
  - [VueUse](https://vueuse.org/) —— 基于 Composition API 的通用函数集
- [Nuxt](https://nuxt.com/) —— 直观的 Web 框架
- [VitePress](https://vitepress.dev/)
- [Nest](https://docs.nestjs.cn/9/introduction) —— 服务器端框架
- [Electron](https://www.electronjs.org/zh/) —— 使用 JS、HTML、CSS 构建跨平台桌面应用
  - [Electron Forge](https://www.electronforge.io/) —— 打包和分发 Electron 应用
  - [Electron Extension Installer](https://www.npmjs.com/package/electron-extension-installer) —— 简化在 Electron 中安装 DevTools 扩展

## :desktop_computer: CLI

- [chalk](https://github.com/chalk/chalk) —— 美化终端字符串
- [execa](https://github.com/sindresorhus/execa) —— 人性化的进程执行
- [minimist](https://github.com/minimistjs/minimist) —— 以人性化的方式解析传入的参数
- [prompts](https://github.com/terkelg/prompts) —— 终端交互式提示符
- [ts-node](https://github.com/TypeStrong/ts-node) —— 用于 nodejs 的 TS 执行器和 REPL
- [tsx](https://github.com/esbuild-kit/tsx) —— 使用 esbuild 增强 nodejs 以运行 TS 和 ESM
- [swc](https://github.com/swc-project/swc) —— 使用 Rust 编码的 TS/JS 高性能编译器

## :pushpin: 项目规范

- [commitlint](https://commitlint.js.org/#/) —— 检查提交消息
- [ESLint](https://eslint.org/) —— 代码检查
- [husky](https://typicode.github.io/husky/) —— 支持 Git Hooks
- [lint-staged](https://github.com/okonet/lint-staged) —— 对暂存的文件进行检查
- [Prettier](https://prettier.io/) —— 代码格式化
