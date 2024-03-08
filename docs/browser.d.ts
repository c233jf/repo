export {}

declare global {
  interface Window {
    opera?: {
      version: () => string
    }
  }

  interface HTMLStyleElement {
    styleSheet?: {
      cssText: string
    }
  }
}
