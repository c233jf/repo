import type { FunctionalComponent, SVGAttributes } from 'vue'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    activeMenu?: string
    hidden?: boolean
    alwaysShow?: boolean
    icon?: FunctionalComponent<SVGAttributes>
    title?: string
    roles?: string[]
    whiteList?: boolean
    breadcrumb?: boolean
    noRedirect?: boolean
    noCache?: boolean
    affix?: boolean
    containerPadding?: boolean
  }
}
