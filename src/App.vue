<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAppStore } from "./stores/app";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const store = useAppStore();
const { size } = storeToRefs(store);
console.log(size);
// const size:any = "small";
// console.log(zhCn);
</script>
<style scoped></style>
