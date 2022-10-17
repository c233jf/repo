<template>
  <div class="setting-btn" :style="styleObj" @click="handleClick">
    <EpSetting v-if="!show" />
    <EpClose v-else />
  </div>
  <ElDrawer :model-value="show" title="系统布局配置" @close="show = false">
    <ElForm label-width="130px">
      <ElFormItem label="主题色">
        <ElColorPicker
          v-model="theme"
          :predefine="[
            '#409EFF',
            '#1890ff',
            '#304156',
            '#212121',
            '#11a983',
            '#13c2c2',
            '#6959CD',
            '#f5222d',
          ]"
          popper-class="!z-9999"
        />
      </ElFormItem>
      <ElFormItem label="开启 Tags-View">
        <ElSwitch v-model="tagsViewVisible" />
      </ElFormItem>
      <ElFormItem label="固定 Header">
        <ElSwitch v-model="isFixedHeader" />
      </ElFormItem>
      <ElFormItem label="侧边栏 Logo">
        <ElSwitch v-model="logoVisible" />
      </ElFormItem>
      <ElFormItem label="菜单支持拼音搜索">
        <ElSwitch v-model="enablePinyinSearch" />
      </ElFormItem>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
const { isFixedHeader, tagsViewVisible, logoVisible, enablePinyinSearch } =
  storeToRefs(useSettingStore())
const theme = useCssVar('--el-color-primary')
const show = ref(false)

const handleClick = () => {
  show.value = !show.value
}

const styleObj = computed(() => ({
  right: show.value ? '30%' : 0,
  backgroundColor: '#409EFF',
}))
</script>

<style scoped>
.setting-btn {
  @apply fixed flex justify-center items-center text-white text-2xl cursor-pointer z-9999;
  top: 250px;
  width: 48px;
  height: 48px;
  border-radius: 6px 0 0 6px;
  transition: all var(--el-transition-duration);
}
</style>
