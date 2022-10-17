<template>
  <template v-if="!item.meta?.hidden">
    <AppLink v-if="menuItem" :to="basePath">
      <ElMenuItem :index="basePath">
        <component
          :is="menuItem.meta.icon"
          v-if="menuItem.meta?.icon"
        ></component>
        <template #title>
          <span v-if="menuItem.meta?.title">{{ menuItem.meta.title }}</span>
        </template>
      </ElMenuItem>
    </AppLink>

    <ElSubMenu v-else :index="resolvePath(item.path)">
      <template #title>
        <component :is="item.meta.icon" v-if="item.meta?.icon"></component>
        <span v-if="item.meta?.title">{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </ElSubMenu>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    item: RouteRecordRaw
    basePath?: string
  }>(),
  {
    basePath: '',
  }
)

const menuItem = computed(() => {
  let menuItem: RouteRecordRaw | undefined
  const { item } = props
  if (item.meta?.alwaysShow) return menuItem

  const children = item.children?.filter((e) => !e.meta?.hidden) ?? []
  if (children.length === 0) {
    menuItem = item
  }
  if (children.length === 1 && !children[0].children) {
    menuItem = children[0]
  }
  return menuItem
})

const resolvePath = (path: string) => {
  if (isExternal(path)) {
    return path
  }
  const { basePath } = props
  if (isExternal(basePath)) {
    return basePath
  }
  return resolve(basePath, path)
}
</script>
