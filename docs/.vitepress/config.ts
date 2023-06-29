import { markdownItPluginMermaid } from '@chenjf/markdown-it-plugin-mermaid'
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
      { text: 'Practices', link: '/practices/markdown-examples' },
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
        },
      ],
    },

    outline: 'deep',

    socialLinks: [{ icon: 'github', link: 'https://github.com/c233jf' }],
  },
  base: '/repo/',
  markdown: {
    config(md) {
      md.use(markdownItPluginMermaid)
    },
  },
  head: [
    [
      'script',
      { type: 'module', defer: '' },
      `import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
      mermaid.initialize({ startOnLoad: false });
      mermaid.run();`,
    ],
  ],
})
