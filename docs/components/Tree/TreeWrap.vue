<template>
  <div class="relative p-2 bg-black rounded group">
    <Tree :data="data" />
  </div>
</template>

<script setup lang="ts">
import Tree from './Tree.vue'
import type { TreeItem } from './types'

defineProps<{
  data: TreeItem[]
}>()
</script>
