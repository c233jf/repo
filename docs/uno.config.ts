import { type UserConfig, defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    btn: 'p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  },
  presets: [
    presetIcons({
      collections: {
        mdi: () =>
          import('@iconify-json/vscode-icons/icons.json').then(
            (i) => i.default
          ),
      },
    }),
    presetUno(),
  ],
}) as UserConfig
