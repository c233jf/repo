import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'node:path'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store', 'src/utils'],
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        IconsResolver({
          prefix: false,
          enabledCollections: ['ep'],
        }),
      ],
    }),
    WindiCSS({
      // https://cn.windicss.org/integrations/vite.html#scoped-style
      transformCSS: 'pre',
    }),
    Icons({
      compiler: 'vue3',
      defaultClass: 'el-icon',
    }),
  ],
  resolve: {
    alias: {
      views: resolve('src/views'),
    },
  },
})
