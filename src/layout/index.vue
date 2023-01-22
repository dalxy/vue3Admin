<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <siderbar />
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">navbar</div>
        <div class="tags-view">tagsview</div>
      </div>
      <div class="app-main">
        <h2>app main</h2>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import SiderBar from "@/layout/components/Sidebar/index.vue";
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
      background: cyan;
      .navbar {
        height: 50px;
        background: #1890ff;
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* main = 100% - nabvar + tagsview */
      min-height: calc(100vh - 84px); //运算符号两边必须有空格
      background: red;
    }
  }
}
</style>
