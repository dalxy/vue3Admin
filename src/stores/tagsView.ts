import { defineStore } from "pinia";
import { RouteLocationNormalizedLoaded, RouteRecordName } from "vue-router";

export const useTagsView = defineStore("tag", () => {
  const visitedViews = ref<RouteLocationNormalizedLoaded[]>([]);
  const addView = (view: RouteLocationNormalizedLoaded) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return;
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta.title || "tag-name"
      })
    );
    addCachedView(view);
  };
  const delView = (view: RouteLocationNormalizedLoaded) => {
    const i = visitedViews.value.indexOf(view);
    if (i > -1) {
      visitedViews.value.splice(i, 1);
    }
    delCachedView(view);
  };
  const cachedViews = ref<RouteRecordName[]>([]);
  const addCachedView = (view: RouteLocationNormalizedLoaded) => {
    if (cachedViews.value.includes(view.name!)) return;
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name!);
    }
  };
  const delCachedView = (view: RouteLocationNormalizedLoaded) => {
    // 删除缓存
    const index = cachedViews.value.indexOf(view.name!);
    index > -1 && cachedViews.value.splice(index, 1);
  };
  const delAllView = () => {
    visitedViews.value = visitedViews.value.filter((tag) => tag.meta.affix);
    cachedViews.value = [];
  };
  const delOtherViews = (view: RouteLocationNormalizedLoaded) => {
    visitedViews.value = visitedViews.value.filter(
      (tag) => tag.meta.affix || tag.path === view.path
    );
    cachedViews.value = cachedViews.value.filter((name) => name !== view.name);
  };
  return {
    visitedViews,
    addView,
    delView,
    cachedViews,
    delAllView,
    delOtherViews,
    addCachedView,
    delCachedView
  };
});
