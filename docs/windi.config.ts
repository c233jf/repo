import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{md,vue,ts,tsx}'],
  },
})
