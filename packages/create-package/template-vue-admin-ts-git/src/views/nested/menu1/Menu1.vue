<template>
  <div>
    <!-- ElAlert 内部使用了 transition 包裹, 这里需要用 div 包裹一下 -->
    <!-- 否则顶层的 transition 会失效 -->
    <ElAlert title="menu 1" :closable="false">
      <!-- bug: https://github.com/vuejs/router/issues/1306 -->
      <RouterView />
    </ElAlert>
  </div>
</template>
