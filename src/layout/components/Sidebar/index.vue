<template>
  <div class="sidebar-wrapper">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <scroll-panel>
      <el-menu
        class="sidebar-container-menu"
        mode="vertical"
        :default-active="activeMenu"
        :background-color="scssVariables.menuBg"
        :text-color="scssVariables.menuText"
        :active-text-color="themeColor"
        :collapse="sidebar.opened"
        :collapse-transition="true"
      >
        <sidebar-item
          v-for="route in menuRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </scroll-panel>
  </div>
</template>
<script lang="ts" setup>
import scssVariables from "@/styles/variables.module.scss";
import sidebarItem from "@/layout/components/Sidebar/SidebarItem.vue";
// 导入路由表
import { routes } from "@/router";

import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/stores/settings";
const store = useAppStore();
const { sidebar } = storeToRefs(store);

// 渲染路由
const menuRoutes = computed(() => routes);
// console.log(menuRoutes);
const route = useRoute();
// 获取主题色
const settingStore = useSettingsStore();
const themeColor = computed(() => settingStore.settings.theme);
const activeMenu = computed(() => {
  const { path, meta } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
const showLogo = computed(() => settingStore.settings.showSidebarLogo);
const isCollapse = computed(() => store.sidebar.opened);
const logoHeight = computed(() => (showLogo.value ? 50 : 0) + "px");
</script>
<style lang="scss" scoped>
.sidebar-wrapper {
  .sidebar-container-menu {
    height: calc(100vh - v-bind(logoHeight));
  }
}
</style>
