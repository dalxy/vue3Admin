<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="includes">
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { useTagsView } from "@/stores/tagsView";
import { storeToRefs } from "pinia";
const route = useRoute();

const store = useTagsView();

const { cachedViews } = storeToRefs(store);
const includes = computed(() => cachedViews.value as string[]);
</script>
<style scoped>
/* .app-main {
  min-height: calc(100vh-50px);
} */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transform: all 0.5s;
}
.fade-transform-enter-form {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
