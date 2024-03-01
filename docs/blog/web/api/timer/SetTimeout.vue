<template>
  <button class="btn" @click="handleClick">在两秒后显示一条消息</button>
</template>

<script setup lang="ts">
const handleClick = () => {
  setTimeout(() => {
    alert('Hello, world!')
  }, 2000)
}
</script>
