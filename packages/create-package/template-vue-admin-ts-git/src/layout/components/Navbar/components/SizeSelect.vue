<template>
  <ElDropdown @command="handleCommand">
    <EpRank class="!text-xl" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem disabled> Size Select </ElDropdownItem>
        <ElDropdownItem v-for="item in options" :key="item" :command="item">{{
          item
        }}</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
const appStore = useAppStore()

const options = ['large', 'default', 'small']

const handleCommand = (command: string) => {
  appStore.size = command
}
</script>

<style scoped>
.el-dropdown {
  @apply align-text-top mr-3;
}
</style>
