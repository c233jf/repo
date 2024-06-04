import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
  server: {
    watch: {
      ignored: ['**/packages/create-package/__test__/test-package/**'],
    },
  },
})
