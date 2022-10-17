<template>
  <EpSearch class="cursor-pointer mr-2" @click="handleClick" />
  <ElSelect
    ref="selectRef"
    v-model="search"
    class="search-select"
    :class="{ 'search-select--visible': show }"
    placeholder="Search"
    filterable
    remote
    :remote-method="querySearch"
    default-first-option
    @change="handleChange"
  >
    <ElOption v-for="item in options" :key="item.path" :value="item.path">
      {{ item.title.join(' > ') }}
    </ElOption>
  </ElSelect>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type { ElSelect } from 'element-plus'

const router = useRouter()
const permissionStore = usePermissionStore()
const settingStore = useSettingStore()

// Filter out the routes that can be displayed in the sidebar
// And generate the internationalized title
const generateRoutes = (
  routes: RouteRecordRaw[],
  basePath = '/',
  prefixTitle: string[] = []
) => {
  let res: { path: string; title: string[] }[] = []

  for (const route of routes) {
    if (route.meta?.hidden) continue

    const data = {
      path: resolve(basePath, route.path),
      title: [...prefixTitle],
    }

    if (route.meta?.title && !route.meta.noRedirect) {
      data.title = [...data.title, route.meta.title]
      res.push(data)
    }

    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length) res = [...res, ...tempRoutes]
    }
  }
  return res
}

const addPinyinField = async (list: ReturnType<typeof generateRoutes>) => {
  const { pinyin } = await import('pinyin')
  return list.map((e) => {
    const item = { ...e, pinyinTitle: '' }
    e.title.forEach((t) => {
      t = pinyin(t, { style: 'normal' }).join('')
      item.pinyinTitle = t
    })
    return item
  })
}

const searchPool = generateRoutes(permissionStore.routes)

const show = ref(false)
const selectRef = ref<InstanceType<typeof ElSelect>>()
const search = ref('')
const options = ref<ReturnType<typeof generateRoutes>>([])

// prettier-ignore
const createFuseWithKeys = (createFuse<ReturnType<typeof generateRoutes>>).bind(null, {
  keys: [
    {
      name: 'title',
      weight: 0.7,
    },
    {
      name: 'pinyinTitle',
      weight: 0.3,
    },
    {
      name: 'path',
      weight: 0.3,
    },
  ],
})

let fuse = createFuseWithKeys(searchPool)

watchEffect(async () => {
  if (settingStore.enablePinyinSearch) {
    const pool = await addPinyinField(searchPool)
    fuse = createFuseWithKeys(pool)
  } else {
    fuse = createFuseWithKeys(searchPool)
  }
})

const handleClick = async () => {
  show.value = !show.value
  if (!show.value) return
  await nextTick()
  selectRef.value?.focus()
}

const querySearch = (query: string) => {
  if (query) {
    options.value = fuse.search(query).map((e) => e.item)
  } else {
    options.value = []
  }
}

const handleChange = (path: string) => {
  search.value = ''
  options.value = []
  show.value = false
  router.push(path)
}
</script>

<style scoped>
.search {
  &-select {
    @apply w-0;
    transition: width 0.25s;

    &--visible {
      @apply w-210px mr-2;
    }

    :deep(.el-input) {
      .el-input__wrapper {
        @apply !shadow-none border-b px-0;
      }
    }
  }
}
</style>
