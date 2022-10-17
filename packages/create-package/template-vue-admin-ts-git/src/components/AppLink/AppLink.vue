<template>
  <component
    :is="isExternalLink ? 'a' : 'router-link'"
    v-bind="{ ...attr, ...$attrs }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string
}>()

const isExternalLink = computed(() => isExternal(props.to))

const attr = computed(() =>
  isExternalLink.value
    ? { href: props.to, target: '_blank', rel: 'noopener' }
    : { to: props.to }
)
</script>
