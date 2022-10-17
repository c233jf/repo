import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'
import type { Properties } from 'csstype'

type TransitionPeriod =
  | 'enter-from'
  | 'enter-active'
  | 'enter-to'
  | 'leave-from'
  | 'leave-active'
  | 'leave-to'

const transitionConstructor = (
  name: string,
  options: Partial<Record<TransitionPeriod, Properties>>
) => {
  const formatedName = name.startsWith('.') ? name : '.' + name
  return Object.fromEntries(
    Object.entries(options).map((e) => [`${formatedName}-${e[0]}`, e[1]])
  )
}

// 设置全局样式
const basePlugin = plugin(({ addBase }) => {
  addBase({
    '#app': { height: '100vh' },
    // transition
    ...transitionConstructor('fade-transform', {
      'enter-active': { transition: 'all .5s' },
      'leave-active': { transition: 'all .5s' },
      'enter-from': {
        opacity: '0',
        transform: 'translateX(-30px)',
      },
      'leave-to': {
        opacity: '0',
        transform: 'translateX(30px)',
      },
    }),
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
