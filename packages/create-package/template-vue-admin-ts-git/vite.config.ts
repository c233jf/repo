import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS({
      // https://cn.windicss.org/integrations/vite.html#scoped-style
      transformCSS: 'pre',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'pinia',
        '@vueuse/core',
        {
          'path-browserify': ['resolve'],
        },
      ],
      dirs: ['src/api/**', 'src/composables', 'src/store', 'src/utils'],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      extensions: ['vue', 'ts', 'tsx'],
      dts: 'src/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: false,
          enabledCollections: ['ep'],
        }),
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx?$/],
    }),
    Icons({
      compiler: 'vue3',
      defaultClass: 'el-icon',
    }),
  ],
  resolve: {
    alias: {
      api: resolve('src/api'),
      layout: resolve('src/layout'),
      views: resolve('src/views'),
      router: resolve('src/router'),
      store: resolve('src/store'),
    },
  },
})
