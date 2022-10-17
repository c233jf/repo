<template>
  <div class="navbar">
    <Hamburger />

    <Breadcrumb class="navbar-breadcrumb" />

    <div class="navbar-right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <Search />
        <ScreenFull />
        <SizeSelect />
      </template>
      <Avatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Search from './components/Search.vue'
import ScreenFull from './components/ScreenFull.vue'
import SizeSelect from './components/SizeSelect.vue'
import Avatar from './components/Avatar.vue'

const appStore = useAppStore()
</script>

<style scoped>
.navbar {
  @apply h-50px overflow-hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &-breadcrumb {
    @apply leading-50px float-left;
  }

  &-right-menu {
    @apply float-right h-50px leading-50px text-xl;
  }
}
</style>
