<template>
  <div>
    <div @click="handleOpen">
      <slot name="openImgCutter"></slot>
      <slot name="open"></slot>
    </div>
    <button type="button" v-if="!$slots.openImgCutter && !$slots.open"></button>
  </div>
  <transition> </transition>
</template>
<script lang="ts" setup>
const handleOpen = () => {
  console.log("handleOpen");
};
</script>
<style lang="less" scoped></style>
