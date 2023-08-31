import { markdownItPluginKatex } from '@chenjf/markdown-it-plugin-katex'
import { markdownItPluginMermaid } from '@chenjf/markdown-it-plugin-mermaid'
import mf from 'markdown-it-footnote'
import { defineConfig } from 'vitepress'

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
              text: 'Computer Network',
              items: [
                {
                  text: 'Protocol',
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
              text: 'Data Structure',
              link: '/blog/data-structure/',
              items: [
                {
                  text: 'Linear List',
                  link: '/blog/data-structure/linear-list/',
                  items: [
                    {
                      text: 'examples',
                      link: '/blog/data-structure/linear-list/examples/',
                    },
                  ],
                },
                {
                  text: 'Stack and Queue',
                  link: '/blog/data-structure/stack-and-queue/',
                  items: [
                    {
                      text: 'examples',
                      link: '/blog/data-structure/stack-and-queue/examples/',
                    },
                  ],
                },
                {
                  text: 'String, Array and General List',
                  link: '/blog/data-structure/string-array-general-list/',
                },
                {
                  text: 'Tree',
                  link: '/blog/data-structure/tree/',
                },
                {
                  text: 'Searching',
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
              text: 'Framework',
              items: [
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
                {
                  text: 'Nest',
                  link: '/blog/framework/nestjs/',
                  items: [
                    {
                      text: 'Troubleshooting',
                      link: '/blog/framework/nestjs/troubleshooting/',
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
              ],
              collapsed: true,
            },
            {
              text: 'Language',
              items: [
                {
                  text: 'JavaScript',
                  items: [
                    {
                      text: 'Memory Management',
                      link: '/blog/language/javascript/memory-management',
                    },
                    {
                      text: 'Global Objects',
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
              text: 'Programming Paradigm',
              items: [
                {
                  text: 'Dependency Injection',
                  link: '/blog/programming-paradigm/dependency-injection/',
                },
              ],
              collapsed: true,
            },
            {
              text: 'Testing',
              link: '/blog/testing/vitest/',
            },
            {
              text: 'Web',
              items: [
                {
                  text: 'Security',
                  items: [
                    {
                      text: 'Anti Stealing Link',
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

    outline: 'deep',

    socialLinks: [{ icon: 'github', link: 'https://github.com/c233jf' }],
  },
  base: '/repo/',
  markdown: {
    config(md) {
      md.use(markdownItPluginKatex, { output: 'html' })
      md.use(markdownItPluginMermaid)
      md.use(mf)
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
