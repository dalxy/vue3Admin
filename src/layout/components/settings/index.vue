<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>主题色</span>
      <theme-picker />
    </div>
    <div class="drawer-item">
      <span>Open Tags-View</span>
      <el-switch v-model="tagsView" class="drawer-switch" />
    </div>
    <div class="drawer-item">
      <span>Sidebar Logo</span>
      <el-switch v-model="showSidebarLogo" class="drawer-switch" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();
const tagsView = computed({
  get() {
    return settingsStore.settings.tagsView;
  },
  set: (value) =>
    settingsStore.changeSetting({
      key: "tagsView",
      value: value
    })
});
const showSidebarLogo = computed({
  get() {
    return settingsStore.settings.showSidebarLogo;
  },
  set: (value) =>
    settingsStore.changeSetting({
      key: "showSidebarLogo",
      value: value
    })
});
</script>
<style lang="scss" scoped>
.drawer-container {
  // padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
