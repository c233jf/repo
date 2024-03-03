<template>
  <div v-for="item in _data" :key="item.text">
    <div
      class="flex items-center text-sm text-gray-300 cursor-pointer hover:bg-gray-700"
      @click="handleClick(item)"
    >
      <div :class="[...getItemCls(item), getIcon(item)]"></div>
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

const props = defineProps<{
  data: TreeItem[]
}>()

const iconMap = {
  ico: { value: 'i-vscode-icons:file-type-favicon' },
  png: { value: 'i-vscode-icons:file-type-image' },
  jpg: { value: 'i-vscode-icons:file-type-image' },
  jpeg: { value: 'i-vscode-icons:file-type-image' },
  gif: { value: 'i-vscode-icons:file-type-image' },
  svg: { value: 'i-vscode-icons:file-type-image' },
  ts: {
    value: 'i-vscode-icons:file-type-typescript',
  },
  vue: { value: 'i-vscode-icons:file-type-vue' },
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

  if (hasChildren(item)) return 'i-vscode-icons:default-folder'

  const ext = getExt(item)
  if (ext) return iconMap[ext as keyof typeof iconMap].value

  return 'span'
}

const getItemCls = (item: TreeItem) => {
  const cls = ['mr-1', 'transform-gpu']

  if (item.icon?.color) {
    cls.push(item.icon.color)
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
