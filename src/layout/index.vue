<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <SiderBar />
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting" />
        <tags-view v-if="showTagsView" />
      </div>
      <app-main />
    </div>
    <right-panel
      v-model="showSetting"
      :size="settingsPanelWidth"
      title="样式风格设置"
    >
      <!-- settings 面板设置组件,稍后实现 -->
      <settings />
    </right-panel>
  </div>
</template>
<script lang="ts" setup>
import SiderBar from "@/layout/components/Sidebar/index.vue";
import TagsView from "@/layout/components/TagsView/index.vue";
import variables from "@/styles/variables.module.scss";
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();
const showTagsView = computed(() => settingsStore.settings.tagsView);
const otherHeight = computed(
  () => (showSetting.value ? 48 + 35 : 50 + 35) + "px"
);
const showSetting = ref(false);
const openSetting = () => {
  // 控制right-panel弹出
  showSetting.value = true;
};
const settingsPanelWidth = computed(() => variables.settingPanelWidth);
</script>
<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      // background: cyan;
      .navbar {
        height: 50px;
        // background: #1890ff;
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* main = 100% - nabvar + tagsview */
      // min-height: calc(100vh - 85px); //运算符号两边必须有空格
      min-height: calc(100vh - v-bind(otherHeight));
      // background: red;
    }
  }
  .right-panel {
    .el-overlay {
      :deep(.el-drawer__header) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
