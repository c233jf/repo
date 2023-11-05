<template>
  <div v-for="item in _data" :key="item.text">
    <div
      class="flex items-center text-sm text-gray-300 cursor-pointer hover:bg-gray-700"
      @click="handleClick(item)"
    >
      <component :is="getIcon(item)" :class="getItemCls(item)" />
      <span class="mr-2">{{ item.text }}</span>
      <span v-if="item.annotation" class="text-lime-600"
        >// {{ item.annotation }}</span
      >
    </div>
    <div v-if="hasChildren(item) && !item.collapsed" class="ml-2">
      <Tree :data="item.items!" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TreeItem } from './types'

import MdiChevronRight from '~icons/mdi/chevron-right'
import MdiStar from '~icons/mdi/star'
import MdiImage from '~icons/mdi/image'
import MdiLangTS from '~icons/mdi/language-typescript'
import MdiVue from '~icons/mdi/vuejs'

const props = defineProps<{
  data: TreeItem[]
}>()

const iconMap = {
  ico: { value: MdiStar, color: 'text-yellow-400' },
  png: { value: MdiImage, color: 'text-purple-400' },
  jpg: { value: MdiImage, color: 'text-purple-400' },
  jpeg: { value: MdiImage, color: 'text-purple-400' },
  gif: { value: MdiImage, color: 'text-purple-400' },
  svg: { value: MdiImage, color: 'text-purple-400' },
  ts: { value: MdiLangTS, color: 'text-blue-400' },
  vue: { value: MdiVue, color: 'text-green-400' },
}
const _data = ref<TreeItem[]>(props.data)

const handleClick = (item: TreeItem) => {
  if (!hasChildren(item)) return

  item.collapsed = !item.collapsed
}

const hasChildren = (item: TreeItem) => item.items?.length

const getExt = (item: TreeItem) => {
  if (!item.text.includes('.')) return ''

  return item.text.split('.').pop()!
}

const getIcon = (item: TreeItem) => {
  if (item.icon) return item.icon.value

  if (hasChildren(item)) return MdiChevronRight

  const ext = getExt(item)
  if (ext) return iconMap[ext as keyof typeof iconMap].value

  return 'span'
}

const getItemCls = (item: TreeItem) => {
  const cls = ['w-4', 'h-4', 'mr-1', 'transform-gpu']

  if (!item.collapsed && hasChildren(item)) cls.push('rotate-90')
  if (item.icon?.color) {
    cls.push(item.icon.color)
  } else {
    const ext = getExt(item)

    if (ext) cls.push(iconMap[ext as keyof typeof iconMap].color)
  }

  return cls
}

const collapse = (items: TreeItem[] = _data.value) => {
  items.forEach((item) => {
    item.collapsed = true
    if (item.items) {
      collapse(item.items)
    }
  })
}

defineExpose({ collapse })
</script>
