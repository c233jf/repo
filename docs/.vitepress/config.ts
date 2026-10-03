import mf from 'markdown-it-footnote'
// @ts-expect-error markdown-it-task-lists is not typed
import mt from 'markdown-it-task-lists'
import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { resolve } from 'node:path'

// https://vitepress.dev/reference/site-config
const config = defineConfig({
  title: "HBee's Repo",
  description:
    '包含个人代码片段、代码练习、部分 demo 、个人仓库通用的 packages、个人作品展示',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Repo', link: '/repo/' },
      { text: 'Packages', link: '/packages/' },
    ],
    search: {
      provider: 'local',
    },

    sidebar: {
      '/packages/': [
        {
          text: 'Packages',
          link: '/packages/',
          items: [{ text: 'Create Package', link: '/packages/create-package' }],
        },
      ],
      '/repo': [
        {
          text: 'Repo',
          items: [
            {
              text: '语言',
              items: [
                {
                  text: 'C++',
                  items: [
                    {
                      text: 'Hello World',
                      link: '/repo/language/cpp/helloworld/',
                    },
                    {
                      text: '基本类型',
                      items: [
                        {
                          text: '字符和字符串',
                          link: '/repo/language/cpp/fundamental-types/string/',
                        },
                        {
                          text: 'nullptr',
                          link: '/repo/language/cpp/fundamental-types/nullptr/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '声明和定义',
                      items: [
                        {
                          text: 'auto',
                          link: '/repo/language/cpp/declarations-and-definitions/auto/',
                        },
                        {
                          text: 'decltype',
                          link: '/repo/language/cpp/declarations-and-definitions/decltype/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '表达式',
                      items: [
                        {
                          text: '强制转换',
                          link: '/repo/language/cpp/expressions/casting/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '运算符重载',
                      link: '/repo/language/cpp/operator-overloading/',
                    },
                    {
                      text: 'Lambda 表达式',
                      link: '/repo/language/cpp/Lambda/',
                    },
                    {
                      text: '指针',
                      items: [
                        {
                          text: '智能指针',
                          link: '/repo/language/cpp/pointers/smart-pointers/',
                        },
                      ],
                      collapsed: true,
                    },
                    {
                      text: '异常',
                      link: '/repo/language/cpp/exception/',
                    },
                    {
                      text: '模板',
                      link: '/repo/language/cpp/templates/',
                    },
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            {
              text: 'Web',
              items: [
                {
                  text: '虚拟化列表',
                  link: '/repo/web/technique/virtual-list/',
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

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/c233jf',
        ariaLabel: 'GitHub link',
      },
    ],
  },
  markdown: {
    lineNumbers: true,
    math: true,
    image: {
      lazyLoading: true,
    },
    config(md) {
      md.use(mf)
      md.use(mt)
    },
  },
  vite: {
    plugins: [
      UnoCSS(),
      AutoImport({
        dts: 'auto-imports.d.ts',
        imports: ['vue', '@vueuse/core'],
      }),
      Components({
        dirs: ['components'],
        dts: 'components.d.ts',
      }),
      visualizer({
        gzipSize: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../'),
      },
    },
    // https://github.com/mermaid-js/mermaid/issues/4320
    // https://github.com/nuxt/vite/issues/56
    optimizeDeps: {
      include: ['mermaid'],
    },
  },
})

export default withMermaid(config)
