<template>
  <ElDropdown @command="handleCommand">
    <ElAvatar shape="square" :src="userStore.avatar" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem command="profile">Profile</ElDropdownItem>
        <ElDropdownItem command="logout" divided>Log Out</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const handleCommand = async (command: 'profile' | 'logout') => {
  switch (command) {
    case 'logout':
      await userStore.logout()
      router.push({ name: 'Login', query: { redirect: route.fullPath } })
      break
    case 'profile':
      router.push({ name: 'Profile' })
      break
  }
}
</script>

<style scoped>
.el-dropdown {
  @apply mr-20px;
  vertical-align: -12px;
}
</style>
