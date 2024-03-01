<template>
  <p>Current time: {{ dateStr }}</p>
</template>

<script setup lang="ts">
const dateStr = ref('')

setInterval(() => {
  dateStr.value = new Date().toLocaleTimeString()
}, 1000)
</script>
