<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="showDrawer" class="drawer-bg" @click="handleClickOutside"></div>
    <Sidebar />
    <div
      class="flex-1 overflow-auto"
      :class="{ 'tags-view--visible': tagsViewVisible }"
    >
      <div class="bg-white" :class="{ 'header--fixed': isFixedHeader }">
        <Navbar />
        <TagsView v-if="tagsViewVisible" />
      </div>
      <AppMain />
      <Setting v-if="settingsVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/Sidebar.vue'
import Navbar from './components/Navbar/Navbar.vue'
import TagsView from './components/TagsView/TagsView.vue'
import AppMain from './components/AppMain/AppMain.vue'
import Setting from './components/Setting/Setting.vue'

const store = useAppStore()
const { isFixedHeader, settingsVisible, tagsViewVisible } = storeToRefs(
  useSettingStore()
)

const classObj = computed(() => ({
  'sidebar--opened': store.sidebar.opened,
  'sidebar--hidden': !store.sidebar.opened,
  mobile: store.device === 'mobile',
  'without-animation': store.sidebar.withoutAnimation,
}))
const showDrawer = computed(
  () => classObj.value['sidebar--opened'] && classObj.value.mobile
)

const handleClickOutside = () => {
  store.sidebar.opened = false
  store.sidebar.withoutAnimation = false
}
</script>

<style scoped>
.app-wrapper {
  @apply flex relative h-full w-full overflow-hidden;

  &.mobile.sidebar--opened {
    @apply fixed top-0;
  }
}

.sidebar--hidden {
  .header--fixed {
    width: calc(100% - 54px);
  }
}

.mobile {
  .header--fixed {
    @apply w-full;
  }
}

.drawer-bg {
  @apply absolute top-0  bg-black opacity-30 w-full h-full z-999;
}

.header--fixed {
  @apply sticky w-full top-0;
  transition: width 0.28s;
}
</style>
