import type { Item } from '@/components/NavContainer/NavContainer.vue'

export const monorepo: Item[] = [
  {
    title: 'Nx',
    description:
      '构建系统，针对 monorepos 进行了优化，具有流行框架和工具的插件，以及包括缓存和分发在内的高级 CI 功能。',
    url: 'https://nx.dev/',
  },
]

export const packageManager: Item[] = [
  {
    title: 'pnpm',
    description: '快速、节省磁盘空间的包管理器',
    url: 'https://pnpm.io/zh/',
  },
]

export const runtime: Item[] = [
  {
    title: 'Node.js',
    description:
      'Node.js® 是基于 Chrome 浏览器 V8 JavaScript 引擎的 JavaScript 运行时。',
    url: 'https://nodejs.org/zh-cn/',
  },
  {
    title: 'node-fs-extra',
    description: '一个用于文件操作的库',
    url: 'https://github.com/jprichardson/node-fs-extra',
  },
  {
    title: 'consola',
    description: '适用于 Node.js 和浏览器的优雅控制台日志记录器',
    url: 'https://github.com/unjs/consola',
  },
]

export const browser: Item[] = [
  {
    title: 'screenfull',
    description: '全屏',
    url: 'https://github.com/sindresorhus/screenfull',
  },
]

export const frameworks: Item[] = [
  {
    title: 'Vue',
    description:
      '渐进式 JavaScript 框架。易学易用，性能出色，适用场景丰富的 Web 前端框架。',
    url: 'https://vuejs.org/',
    children: [
      {
        title: 'Vue DevTools',
        description: 'Vue 的官方调试工具',
        url: 'https://devtools.vuejs.org/',
      },
      {
        title: 'Pinia',
        description: '状态管理库',
        url: 'https://pinia.vuejs.org/zh/',
      },
      {
        title: 'Vue I18n',
        description: '国际化插件',
        url: 'https://vue-i18n.intlify.dev/guide/',
      },
      {
        title: 'Vue Router',
        description: 'Vue 的官方路由',
        url: 'https://router.vuejs.org/zh/',
      },
      {
        title: 'VueUse',
        description: '基于 Composition API 的通用函数集',
        url: 'https://vueuse.org/',
      },
    ],
  },
  {
    title: 'Astro',
    description: '内容驱动 web 框架',
    url: 'https://astro.build/',
  },
  {
    title: 'VitePress',
    description: '由 Vite 和 Vue 驱动的静态站点生成器',
    url: 'https://vitepress.dev/zh/',
  },
  {
    title: 'Electron',
    description: '使用 JS, HTML, CSS 构建跨平台桌面应用',
    url: 'https://www.electronjs.org/zh/',
    children: [
      {
        title: 'Electron Forge',
        description: '打包和分发 Electron 应用',
        url: 'https://www.electronforge.io/',
      },
    ],
  },
]

export const build: Item[] = [
  {
    title: 'Vite',
    description: 'Vite 是一个超快的前端构建工具',
    url: 'https://cn.vite.dev/',
    children: [
      {
        title: 'unplugin-auto-import',
        description: '自动按需导入 API',
        url: 'https://github.com/antfu/unplugin-auto-import',
      },
      {
        title: 'unplugin-vue-components',
        description: '自动按需导入组件',
        url: 'https://github.com/antfu/unplugin-vue-components',
      },
    ],
  },
]

export const ui: Item[] = [
  {
    title: 'Element Plus',
    description: '基于 Vue 3，面向设计师和开发者的组件库',
    url: 'https://element-plus.org/zh-CN/',
  },
  {
    title: 'Vant4',
    description: '一个轻量级、可定制的 Vue UI 库，适用于移动网络应用程序。',
    url: 'https://vant.pro/vant/#/zh-CN',
  },
  {
    title: 'Storybook',
    description:
      'Storybook 是一个前端工作坊，用于单独构建用户界面组件和页面。成千上万的团队使用它进行用户界面开发、测试和文档编写。它是开源和免费的。',
    url: 'https://storybook.js.org/',
  },
]

export const string: Item[] = [
  {
    title: 'pluralize',
    description: '根据计数将任何单词复数化或单数化',
    url: 'https://github.com/plurals/pluralize',
  },
  {
    title: 'clipboard.js',
    description: '复制文本到粘贴板',
    url: 'https://clipboardjs.com/',
  },
  {
    title: 'pinyin-pro',
    description: '汉字转拼音',
    url: 'https://github.com/zh-lx/pinyin-pro',
  },
]

export const datetime: Item[] = [
  {
    title: 'Day.js',
    description: '2kB 大小的 JavaScript 时间日期库',
    url: 'https://day.js.org/zh-CN/',
  },
]

export const image: Item[] = [
  {
    title: 'Compressor.js',
    description: '图片压缩',
    url: 'https://github.com/fengyuanchen/compressorjs',
  },
  {
    title: 'medium-zoom',
    description: '图片预览',
    url: 'https://github.com/francoischalifour/medium-zoom',
  },
]

export const file: Item[] = [
  {
    title: 'FileSaver.js',
    description: '文件保存的 H5 实现',
    url: 'https://github.com/eligrey/FileSaver.js/',
  },
  {
    title: 'JSZip',
    description: '压缩文件为 ZIP',
    url: 'https://stuk.github.io/jszip/',
  },
  {
    title: 'PDF.js',
    description: '解析和渲染 PDFs',
    url: 'https://mozilla.github.io/pdf.js/',
  },
  {
    title: 'xlsx',
    description: '保存文件为 Excel 格式',
    url: 'https://www.npmjs.com/package/xlsx',
  },
]

export const request: Item[] = [
  {
    title: 'Axios',
    description: '基于 Promise 的网络请求库',
    url: 'https://axios-http.com/zh/docs/intro',
  },
]

export const search: Item[] = [
  {
    title: 'Fuse.js',
    description: '模糊搜索',
    url: 'https://fusejs.io/',
  },
]

export const utils: Item[] = [
  {
    title: 'Lodash',
    description: '一个实用的 JavaScript 工具库',
    url: 'https://lodash.com/',
  },
  {
    title: 'Ramda',
    description: '一款实用的 JavaScript 函数式编程库',
    url: 'https://ramda.cn/',
  },
]

export const animation: Item[] = [
  {
    title: 'GSAP',
    description: '专为专业人士打造的强大 JavaScript 动画库',
    url: 'https://gsap.com/',
  },
  {
    title: 'BetterScroll',
    description: '滚动库',
    url: 'https://better-scroll.github.io/docs/zh-CN/',
  },
  {
    title: 'Driver.js',
    description: '用户引导引擎',
    url: 'https://github.com/kamranahmedse/driver.js',
  },
  {
    title: 'NProgress',
    description: '导航进度条',
    url: 'https://github.com/rstacruz/nprogress',
  },
]

export const css: Item[] = [
  {
    title: 'UnoCSS',
    description: '即时按需原子 CSS 引擎',
    url: 'https://unocss.dev/',
  },
]

export const layout: Item[] = [
  {
    title: 'Floating UI',
    description: '浮动元素定位与交互',
    url: 'https://floating-ui.com/',
  },
  {
    title: 'Masonry',
    description: '瀑布流布局',
    url: 'https://github.com/desandro/masonry',
  },
  {
    title: 'SortableJS',
    description: '拖曳放置库',
    url: 'https://github.com/SortableJS/Sortable',
  },
]

export const test: Item[] = [
  {
    title: 'Faker',
    description: '生成伪数据',
    url: 'https://fakerjs.dev/',
  },
  {
    title: 'msw',
    description: '用于浏览器和 Node.js 的 REST/GraphQL API mocking',
    url: 'https://mswjs.io/',
  },
  {
    title: 'supertest',
    description: '测试 nodejs HTTP 服务器',
    url: 'https://github.com/ladjs/supertest',
  },
  {
    title: 'Vitest',
    description: '基于 Vite 的单元测试框架',
    url: 'https://cn.vitest.dev/',
  },
]

export const cli: Item[] = [
  {
    title: 'commander.js',
    description: '一个用于创建命令行界面的库',
    url: 'https://github.com/tj/commander.js',
  },
  {
    title: 'execa',
    description: '一个用于执行命令的库',
    url: 'https://github.com/sindresorhus/execa',
  },
  {
    title: 'tsx',
    description: '简化在 Node.js 中运行 TypeScript',
    url: 'https://tsx.is/',
  },
  {
    title: 'chalk',
    description: '美化终端字符串',
    url: 'https://github.com/chalk/chalk',
  },
  {
    title: 'prompts',
    description: '终端交互式提示符',
    url: 'https://github.com/terkelg/prompts',
  },
]

export const charts: Item[] = [
  {
    title: 'Mermaid',
    description: '使用文本和代码创建图表和可视化效果。',
    url: 'https://mermaid.js.org/',
  },
  {
    title: 'ECharts',
    description: '基于 JavaScript 的可视化图表库',
    url: 'https://echarts.apache.org/zh/index.html',
  },
]

export const richText: Item[] = [
  {
    title: 'CodeMirror',
    description: '代码编辑器',
    url: 'https://codemirror.net/',
  },
  {
    title: 'TinyMCE',
    description: '富文本编辑器',
    url: 'https://www.tiny.cloud/docs/tinymce/6/',
  },
  {
    title: 'Quill',
    description: '富文本编辑器',
    url: 'https://quilljs.com/',
  },
  {
    title: 'Milkdown',
    description: '所见即所得 markdown 编辑器',
    url: 'https://milkdown.dev/',
  },
  {
    title: 'markedjs',
    description: 'Markdown 解析器',
    url: 'https://github.com/markedjs/marked?tab=readme-ov-file',
  },
  {
    title: 'DOMPurify',
    description: '仅适用于 DOM 的 XSS 净化器',
    url: 'https://github.com/cure53/DOMPurify',
  },
]

export const git: Item[] = [
  {
    title: 'git-js',
    description: '在任何 node.js 应用程序中运行 git 命令的轻量级接口',
    url: 'https://github.com/steveukx/git-js',
  },
]

export const project: Item[] = [
  {
    title: 'linter-setup',
    description: '自动安装和配置项目规范所需工具',
    url: 'https://github.com/c233jf/repo/pkgs/npm/linter-setup',
  },
]
