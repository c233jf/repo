<template>
  <a :href="href" target="_blank" class="i-mdi:link-variant"></a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>
