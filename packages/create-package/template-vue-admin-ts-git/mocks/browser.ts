import { setupWorker } from 'msw'

import { userHandlers } from './user'

export const worker = setupWorker(...userHandlers)
