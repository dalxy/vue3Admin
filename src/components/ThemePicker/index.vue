<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    :predefine="themeColor"
    popper-class="theme-picker-dropdown"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const theme = ref("");
const themeColor = [
  "#409EFF",
  "#1890ff",
  "#304156",
  "#212121",
  "#11a983",
  "#13c2c2",
  "#6959CD",
  "#f5222d"
];
</script>
