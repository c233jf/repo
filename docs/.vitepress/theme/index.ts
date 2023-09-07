import { nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'

import './index.css'

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute()

    watch(
      () => route.path,
      async () => {
        await nextTick()
        mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
      },
      {
        immediate: true,
      }
    )
  },
}
