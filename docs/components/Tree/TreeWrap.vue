<template>
  <div class="relative p-2 bg-black rounded group">
    <Tree ref="treeRef" :data="data" />
    <MdiCollapseAllOutline
      class="hidden absolute top-2 right-2 text-white cursor-pointer rounded hover:bg-gray-700 group-hover:block"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
import Tree from './Tree.vue'
import type { TreeItem } from './types'

defineProps<{
  data: TreeItem[]
}>()

const treeRef = ref<InstanceType<typeof Tree>>()

const handleClick = () => {
  treeRef.value?.collapse()
}
</script>
