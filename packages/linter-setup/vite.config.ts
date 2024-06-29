import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { isBuiltin } from 'node:module'

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => isBuiltin(id),
    },
  },
})
