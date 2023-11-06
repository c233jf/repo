import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import 'virtual:windi.css'

import './index.css'

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }

    onMounted(initZoom)

    watch(
      () => route.path,
      async () => {
        await nextTick()
        initZoom()
      }
    )
  },
}
