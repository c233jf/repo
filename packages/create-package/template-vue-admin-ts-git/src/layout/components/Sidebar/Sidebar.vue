<template>
  <div :class="{ 'logo--visible': logoVisible }">
    <Logo v-if="logoVisible" :collapse="isCollapse" />
    <ElScrollbar wrap-class="scrollbar-wrapper">
      <ElMenu
        :default-active="activeMenu"
        :collapse="isCollapse"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
      >
        <SidebarItem
          v-for="item in permissionStore.routes"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './components/Logo.vue'
import SidebarItem from './components/SidebarItem.vue'

const appStore = useAppStore()
const isCollapse = computed(() => !appStore.sidebar.opened)

const settingStore = useSettingStore()
const logoVisible = computed(() => settingStore.logoVisible)

const permissionStore = usePermissionStore()

const route = useRoute()
const activeMenu = computed(() => route.meta.activeMenu || route.path)
</script>

<style scoped>
.logo--visible {
  .el-scrollbar {
    height: calc(100% - 50px);
  }

  .el-menu {
    min-height: calc(100vh - 50px);
  }
}

.scrollbar-wrapper {
  @apply overflow-x-hidden;
}

.el-menu {
  @apply min-h-screen;
  width: 210px;
}
</style>
