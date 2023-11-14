import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

// 设置全局样式
const basePlugin = plugin(({ addBase }) => {
  addBase({
    '#app': { height: '100vh' },
  })
})

export default defineConfig({
  plugins: [basePlugin],
  shortcuts: {
    'hover--black': {
      '@apply': 'transition-colors',
      '&:hover': {
        'background-color': 'rgba(0, 0, 0, 0.025)',
      },
    },
  },
})
