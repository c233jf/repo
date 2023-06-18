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
            { text: 'Markdown Example', link: '/practices/markdown-examples' },
            { text: 'Api Example', link: '/practices/api-examples' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/c233jf' }],
  },
  base: '/repo/',
})
