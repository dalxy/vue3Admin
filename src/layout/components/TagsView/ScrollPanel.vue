<template>
  <el-scrollbar wrap-class="scroll-wrapper">
    <slot />
  </el-scrollbar>
</template>
<style lang="scss" scoped>
.scroll-wrapper {
  position: relative;
  width: 100%;
  white-space: nowrap;
}
</style>
