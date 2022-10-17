<template>
  <ElScrollbar class="tags-view-container" view-class="h-full">
    <ElDropdown
      v-for="item in tagsViewStore.visitedViews"
      :key="item.fullPath"
      trigger="contextmenu"
      @command="handleCommand($event, item)"
    >
      <ElTag
        type="success"
        :effect="getClass(item)"
        :closable="!item.meta?.affix"
        @click="goToActiveView(item)"
        @close="close(item)"
      >
        {{ item.meta?.title }}
      </ElTag>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="refresh">刷新</ElDropdownItem>
          <ElDropdownItem v-if="!item.meta.affix" command="close"
            >关闭</ElDropdownItem
          >
          <ElDropdownItem command="closeOther">关闭其他</ElDropdownItem>
          <ElDropdownItem command="closeAll">关闭所有</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ElScrollbar>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

import type { TagsRouteRecordRaw } from 'store/useTagsViewStore'

const route = useRoute()
const router = useRouter()
const permissionStore = usePermissionStore()
const tagsViewStore = useTagsViewStore()

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: TagsRouteRecordRaw[] = []
  routes.forEach((e) => {
    if (e.meta?.affix) {
      const tagPath = resolve(basePath, e.path)
      tags.push({
        fullPath: tagPath,
        meta: e.meta,
        name: e.name,
      })
    }
    if (e.children) {
      const tempTags = filterAffixTags(e.children, e.path)
      if (tempTags.length) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const affixTags = filterAffixTags(permissionStore.routes)
affixTags.forEach((e) => {
  // Must have tag name
  if (e.name) {
    tagsViewStore.addVisitedView(e)
  }
})

watchEffect(() => {
  if (route.name) {
    tagsViewStore.addView({
      fullPath: route.fullPath,
      meta: route.meta,
      name: route.name,
    })
  }
})

const isActive = (tag: TagsRouteRecordRaw) => {
  return tag.fullPath === route.fullPath
}

const getClass = (tag: TagsRouteRecordRaw) => {
  return isActive(tag) ? 'dark' : 'plain'
}

const goToActiveView = (tag: TagsRouteRecordRaw) => {
  if (isActive(tag)) return
  router.push(tag.fullPath)
}

const goToLastView = () => {
  const len = tagsViewStore.visitedViews.length
  if (len) {
    router.push(tagsViewStore.visitedViews[len - 1].fullPath)
  } else {
    if (route.path === '/') {
      router.replace('/')
    } else {
      router.push('/')
    }
  }
}

const close = (tag: TagsRouteRecordRaw) => {
  tagsViewStore.delView(tag)
  if (isActive(tag)) {
    goToLastView()
  }
}

const refresh = (tag: TagsRouteRecordRaw) => {
  tagsViewStore.delCachedView(tag)
  router.replace(tag.fullPath)
}

const closeOther = (tag: TagsRouteRecordRaw) => {
  tagsViewStore.delOtherViews(tag)
  router.push(tag.fullPath)
}

const closeAll = () => {
  tagsViewStore.delAllViews()
  if (route.meta.affix) return
  goToLastView()
}

const commandMethod = {
  refresh,
  close,
  closeOther,
  closeAll,
}

const handleCommand = (
  command: 'refresh' | 'close' | 'closeAll' | 'closeOther',
  tag: TagsRouteRecordRaw
) => {
  commandMethod[command](tag)
}
</script>

<style scoped>
.tags-view-container {
  @apply h-34px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  :deep(.el-dropdown) {
    @apply inline-block leading-34px ml-2 cursor-pointer;
  }
}
</style>
