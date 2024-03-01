import { type UserConfig, defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    btn: 'p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  },
}) as UserConfig
