<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <SiderBar />
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting" />
        <div class="tags-view">
          <TagsView />
        </div>
      </div>
      <!-- <div class="app-main">
        <h2>app main</h2>
        <router-view></router-view>
      </div> -->
      <app-main />
    </div>
    <right-panel
      v-model="showSetting"
      :size="settingsPanelWidth"
      title="样式风格设置"
    >
      <!-- settings 面板设置组件,稍后实现 -->
      <setting />
    </right-panel>
  </div>
</template>
<script lang="ts" setup>
import SiderBar from "@/layout/components/Sidebar/index.vue";
import TagsView from "@/layout/components/TagsView/index.vue";
import variables from "@/styles/variables.module.scss";

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
      min-height: calc(100vh - 85px); //运算符号两边必须有空格
      background: red;
    }
  }
}
</style>
