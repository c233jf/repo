<template>
  <ElConfigProvider :size="appStore.size">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
const appStore = useAppStore()
</script>
