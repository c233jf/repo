import { worker } from './browser'

// mock
if (import.meta.env.DEV) {
  worker.start({ onUnhandledRequest: 'bypass' })
}
