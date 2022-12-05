<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
    <svg-icon icon-class="404" class-name="custom-class" @click="sayhi" />
    <el-button type="primary">按钮</el-button>
  </div>
</template>
<script lang="ts" setup>
// import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()!;
const sayhi = () => {
  // alert("sayhi");
  proxy?.$message.success("success");
};
</script>
<style lang="scss">
.custom-class {
  // 自定义404
  font-size: 200px;
  color: green;
}
</style>
