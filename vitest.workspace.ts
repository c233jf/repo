import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vitest.config.ts',
    test: {
      include: ['docs/__test__/**/*.spec.ts'],
      name: 'docs',
    },
  },
  {
    extends: 'vitest.config.ts',
    test: {
      include: ['packages/create-package/__test__/*.spec.ts'],
      name: 'create-package',
    },
  },
])
