import type { FunctionalComponent, SVGAttributes } from 'vue'

export interface TreeItem {
  text: string
  items?: TreeItem[]
  collapsed?: boolean
  icon?: { value: FunctionalComponent<SVGAttributes>; color?: string }
  annotation?: string
}
