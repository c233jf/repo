import { markdownItPluginKatex } from '@chenjf/markdown-it-plugin-katex'
import { markdownItPluginMermaid } from '@chenjf/markdown-it-plugin-mermaid'
import mf from 'markdown-it-footnote'
// @ts-ignore
import mt from 'markdown-it-task-lists'
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HBee's Repo",
  description: '收集个人使用过的工具、库以及自己练习所编写的代码',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Collections', link: '/collections/' },
      { text: 'Blog', link: '/blog/markdown-examples' },
    ],

    sidebar: {
      '/collections/': [
        {
          text: 'Collections',
          link: '/collections/',
        },
        {
          text: 'Personal',
          items: [
            { text: 'Create Package', link: '/collections/create-package' },
          ],
        },
      ],
      '/blog': [
        {
          text: 'Blog',
          items: [
            {
              text: '构建工具',
              items: [
                {
                  text: 'Vite',
                  collapsed: true,
                  items: [
                    {
                      text: 'Troubleshooting',
                      link: '/blog/builder/vite/troubleshooting.md',
                    },
                  ],
                },
                {
                  text: 'CMake',
                  link: '/blog/builder/cmake/',
                },
              ],
              collapsed: true,
            },
            {
              text: '计算机网络',
              items: [
                {
                  text: '协议',
                  items: [
                    {
                      text: 'HTTPS',
                      link: '/blog/computer-network/protocol/https',
                    },
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            {
              text: '个人规范',
              link: '/blog/convention/',
              items: [
                {
                  text: '语言规范',
                  link: '/blog/convention/language/',
                },
                {
                  text: '框架',
                  link: '/blog/convention/framework/',
                },
                {
                  text: '网页规范',
                  link: '/blog/convention/page/',
                },
                {
                  text: '静态资源',
                  link: '/blog/convention/assets/',
                },
                {
                  text: '构建工具',
                  link: '/blog/convention/builder/',
                },
                {
                  text: '项目配置',
                  link: '/blog/convention/config/',
                },
              ],
              collapsed: true,
            },
            {
              text: '数据结构',
              link: '/blog/data-structure/',
              items: [
                {
                  text: '线性表',
                  link: '/blog/data-structure/linear-list/',
                  items: [
                    {
                      text: '示例',
                      link: '/blog/data-structure/linear-list/examples/',
                    },
                  ],
                },
                {
                  text: '栈和队列',
                  link: '/blog/data-structure/stack-and-queue/',
                  items: [
                    {
                      text: '示例',
                      link: '/blog/data-structure/stack-and-queue/examples/',
                    },
                  ],
                },
                {
                  text: '串、数组和广义表',
                  link: '/blog/data-structure/string-array-general-list/',
                },
                {
                  text: '树和二叉树',
                  link: '/blog/data-structure/tree/',
                },
                {
                  text: '查找',
                  link: '/blog/data-structure/searching/',
                },
              ],
              collapsed: true,
            },
            {
              text: 'DevOps',
              items: [
                {
                  text: 'CI/CD',
                  items: [
                    { text: 'Aliyun', link: '/blog/dev-ops/ci-cd/aliyun.md' },
                    { text: 'Lint', link: '/blog/dev-ops/ci-cd/lint.md' },
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            {
              text: '框架',
              items: [
                {
                  text: 'Electron',
                  items: [
                    {
                      text: 'Troubleshooting',
                      link: '/blog/framework/electron/troubleshooting',
                    },
                  ],
                  collapsed: true,
                },
                {
                  text: 'Nest',
                  items: [
                    {
                      text: 'Troubleshooting',
                      items: [
                        {
                          text: 'swc',
                          link: '/blog/framework/nestjs/troubleshooting/swc',
                        },
                      ],
                      collapsed: true,
                    },
                  ],
                  collapsed: true,
                },
                {
                  text: 'Taro',
                  items: [
                    {
                      text: 'Troubleshooting',
                      items: [
                        {
                          text: '原生组件',
                          link: '/blog/framework/taro/troubleshooting/native-component/',
                        },
                      ],
                      collapsed: true,
                    },
                  ],
                  collapsed: true,
                },
                {
                  text: 'VitePress',
                  items: [
                    {
                      text: 'Troubleshooting',
                      items: [
                        {
                          text: 'unplugin-vue-components',
                          link: '/blog/framework/vitepress/troubleshooting/unplugin-vue-components',
                        },
                      ],
                      collapsed: true,
                    },
                  ],
                  collapsed: true,
                },
                {
                  text: 'Vue',
                  link: '/blog/framework/vue/',
                  items: [
                    { text: 'Renderer', link: '/blog/framework/vue/renderer/' },
                    {
                      text: 'Reactivity',
                      link: '/blog/framework/vue/reactivity/',
                    },
                    { text: 'Mini Vue', link: '/blog/framework/vue/mini-vue/' },
                    {
                      text: 'Composition API',
                      link: '/blog/framework/vue/composition/',
                    },
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            {
              text: '编程语言',
              items: [
                {
                  text: 'C++',
                  items: [
                    {
                      text: 'Hello World',
                      link: '/blog/language/cpp/helloworld/',
                    },
                    {
                      text: '基本类型',
                      items: [
                        {
                          text: '字符和字符串',
                          link: '/blog/language/cpp/fundamental-types/string/',
                        },
                        {
                          text: 'nullptr',
                          link: '/blog/language/cpp/fundamental-types/nullptr/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '声明和定义',
                      items: [
                        {
                          text: 'auto',
                          link: '/blog/language/cpp/declarations-and-definitions/auto/',
                        },
                        {
                          text: 'decltype',
                          link: '/blog/language/cpp/declarations-and-definitions/decltype/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '表达式',
                      items: [
                        {
                          text: '强制转换',
                          link: '/blog/language/cpp/expressions/casting/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '运算符重载',
                      link: '/blog/language/cpp/operator-overloading/',
                    },
                    {
                      text: 'Lambda 表达式',
                      link: '/blog/language/cpp/Lambda/',
                    },
                    {
                      text: '指针',
                      items: [
                        {
                          text: '智能指针',
                          link: '/blog/language/cpp/pointers/smart-pointers/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '异常',
                      link: '/blog/language/cpp/exception/',
                    },
                    {
                      text: '模板',
                      link: '/blog/language/cpp/templates/',
                    },
                  ],
                  collapsed: true,
                },
                {
                  text: 'JavaScript',
                  items: [
                    {
                      text: '内存管理',
                      link: '/blog/language/javascript/memory-management',
                    },
                    {
                      text: '全局对象',
                      items: [
                        {
                          text: 'WeakMap',
                          link: '/blog/language/javascript/global-objects/weakmap',
                        },
                      ],
                      collapsed: true,
                    },
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            {
              text: '编程范式',
              items: [
                {
                  text: '依赖注入',
                  link: '/blog/programming-paradigm/dependency-injection/',
                },
              ],
              collapsed: true,
            },
            {
              text: '测试',
              link: '/blog/testing/vitest/',
            },
            {
              text: 'Web',
              items: [
                {
                  text: 'api',
                  items: [
                    {
                      text: '定时器',
                      link: '/blog/web/api/timer/',
                    },
                  ],
                  collapsed: true,
                },
                {
                  text: '优化',
                  link: '/blog/web/optimization/',
                },
                {
                  text: '安全',
                  link: '/blog/web/security/',
                  items: [
                    {
                      text: '防盗链',
                      link: '/blog/web/security/anti-stealing-link',
                    },
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
          ],
        },
      ],
    },

    footer: {
      copyright: 'Copyright © 2022-present HBee',
    },

    outline: 'deep',

    socialLinks: [{ icon: 'github', link: 'https://github.com/c233jf' }],
  },
  base: '/repo/',
  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(markdownItPluginKatex, { output: 'html' })
      md.use(markdownItPluginMermaid)
      md.use(mf)
      md.use(mt)
    },
  },
  vite: {
    plugins: [
      UnoCSS({
        shortcuts: {
          btn: 'p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        },
      }),
      AutoImport({ dts: 'auto-imports.d.ts', imports: ['vue'] }),
      Components({
        dirs: ['components'],
        dts: 'components.d.ts',
        resolvers: [IconsResolver({ prefix: false })],
      }),
      Icons(),
    ],
    resolve: {
      alias: {
        'vue/server-renderer': require.resolve('vue/server-renderer'),
      },
    },
  },
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
        integrity:
          'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn',
        crossorigin: 'anonymous',
      },
    ],
    [
      'script',
      { type: 'module' },
      `import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
      mermaid.initialize({ startOnLoad: false });
      mermaid.run();
      `,
    ],
  ],
})
