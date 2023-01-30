<template>
  <!-- <h4 @click="isCollapse = !isCollapse">展收测试</h4> -->
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
    :collapse="sidebar.opened"
    :collapse-transition="true"
  >
    <sidebar-item
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
    <!-- {{ route.path }} -->
  </el-menu>
</template>
<script lang="ts" setup>
import scssVariables from "@/styles/variables.module.scss";
import sidebarItem from "@/layout/components/Sidebar/SidebarItem.vue";
// 导入路由表
import { routes } from "@/router";

import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
const store = useAppStore();
const { sidebar } = storeToRefs(store);

// 渲染路由
const menuRoutes = computed(() => routes);
// console.log(menuRoutes);
const route = useRoute();
const activeMenu = computed(() => {
  return route.path;
});
const isCollapse = ref(false);
</script>
<style></style>
