<template>
  <div class="logo-container" :class="{ collapse }">
    <RouterLink class="logo-link" to="/">
      <img v-if="logo" :src="logo" class="logo" />
      <h1 class="title">{{ title }}</h1>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  collapse: boolean
}>()

const title = 'Vue Element Admin'
const logo =
  'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
</script>

<style scoped>
.logo-container {
  @apply relative w-full h-50px text-center leading-50px overflow-hidden;
  background-color: #2b2f3a;

  &.collapse {
    .logo {
      @apply mr-0;
    }
  }

  .logo-link {
    @apply h-full w-full;

    .logo {
      @apply inline-block w-32px h-32px align-middle mr-12px;
    }

    .title {
      @apply inline-block text-white font-semibold leading-50px align-middle m-0;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }
}
</style>
