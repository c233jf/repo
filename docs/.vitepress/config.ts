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
      { text: 'Practices', link: '/practices/vue/renderer/' },
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
      '/practices': [
        {
          text: 'Practices',
          items: [
            {
              text: 'Framework',
              items: [
                {
                  text: 'Vue',
                  link: '/practices/vue/',
                  items: [
                    { text: 'Renderer', link: '/practices/vue/renderer/' },
                    { text: 'Reactivity', link: '/practices/vue/reactivity/' },
                    { text: 'Mini Vue', link: '/practices/vue/mini-vue/' },
                    {
                      text: 'Composition API',
                      link: '/practices/vue/composition/',
                    },
                  ],
                },
              ],
              collapsed: true,
            },
            {
              text: 'Data Structure',
              link: '/practices/data-structure/',
              items: [
                {
                  text: 'Linear List',
                  link: '/practices/data-structure/linear-list/',
                  items: [
                    {
                      text: 'examples',
                      link: '/practices/data-structure/linear-list/examples/',
                    },
                  ],
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
      { type: 'module', defer: '' },
      `import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
      mermaid.initialize({ startOnLoad: false });
      mermaid.run();`,
    ],
  ],
})
