<template>
  <div class="hamburger-container hover--black" @click="toggleSideBar">
    <EpFold :class="{ 'sidebar-hidden': !appStore.sidebar.opened }" />
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore()

const toggleSideBar = () => {
  appStore.sidebar.opened = !appStore.sidebar.opened
}
</script>

<style scoped>
.hamburger-container {
  @apply text-xl leading-50px h-full float-left cursor-pointer px-3;

  .sidebar-hidden {
    transform: rotate(180deg);
    transform-origin: center;
  }
}
</style>
