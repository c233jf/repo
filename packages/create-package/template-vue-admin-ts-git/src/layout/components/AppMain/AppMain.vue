<template>
  <RouterView v-slot="{ Component, route }">
    <section
      v-if="Component"
      class="app-main"
      :class="{
        'px-20px': !route.meta.containerPadding,
        'pt-20px': !route.meta.containerPadding,
      }"
    >
      <Transition name="fade-transform" mode="out-in">
        <KeepAlive :include="tagsViewStore.cachedViewsName">
          <Suspense>
            <component :is="Component" :key="route.fullPath" />
            <template #fallback>Loading...</template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </section>
  </RouterView>
</template>

<script setup lang="ts">
const tagsViewStore = useTagsViewStore()
</script>

<style scoped>
.app-main {
  @apply overflow-hidden;
  min-height: calc(100vh - 50px);
}

.tags-view--visible {
  .app-main {
    min-height: calc(100vh - 84px);
  }
}
</style>
