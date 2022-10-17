/// <reference types="vite/client" />

// https://typescript-eslint.io/rules/ban-types/
type AnyObject = Record<string, unknown>

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<AnyObject, AnyObject, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
