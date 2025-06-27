<template>
  <div
    class="bg-white rounded-lg shadow-md border border-solid border-gray-200"
  >
    <div
      class="flex items-center justify-between border-b border-b-solid border-gray-200 px-4 py-2"
    >
      <div class="text-lg font-bold">{{ title }}</div>
      <slot name="actions" />
    </div>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
