<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <Card v-for="item in items" :key="item.title" :title="item.title">
      <div>{{ item.description }}</div>
      <template #actions>
        <Link :href="item.url" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '../Card/Card.vue'
import Link from '../Link/Link.vue'

export interface Item {
  title: string
  description: string
  url: string
  children?: Item[]
}

defineProps<{
  items: Item[]
}>()
</script>
