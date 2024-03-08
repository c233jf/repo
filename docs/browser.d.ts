export {}

declare global {
  interface Window {
    opera?: {
      version: () => string
    }
  }
}
