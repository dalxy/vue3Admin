<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <!-- 面包屑导航最后一个是不可点击的 因为最后一个正是当前所显示的路由 -->
      <span v-if="index == levelList.length - 1" class="no-redirect">
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import type { RouteLocationMatched, RouteLocationRaw } from "vue-router";
import { compile } from "path-to-regexp";
type PartialRouteLocationMatched = Partial<RouteLocationMatched>;
const route = useRoute(); // 相当于this.$route对象
const router = useRouter(); // 相当于this.$router对象

const levelList = ref<Array<PartialRouteLocationMatched>>([]); // 导航列表 存放matched里筛选的路由记录
// 判断是不是Dashboard路由
const isDashboard = (route?: PartialRouteLocationMatched) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return (
    (name as string).trim().toLocaleLowerCase() ===
    "Dashboard".toLocaleLowerCase()
  );
};
// 获取面包屑导航
const getBreadcrumb = () => {
  // 对匹配的路由进行过滤 过滤掉没有title属性的路由，没有title就无法作为面包屑导航
  let matched = route.matched.filter(
    (item) => item.meta.title
  ) as PartialRouteLocationMatched[];
  // 获取第一个匹配路由记录
  const first = matched[0];
  // 我们要把dashboard作为首页 始终固定在面包屑导航第一个 Dashboard/System/MenuManagement
  // 如果第一个匹配到的路由记录不是dashboard 我们自己就把它放在记录数组的第一项
  if (!isDashboard(first)) {
    matched = (
      [
        {
          path: "/dashboard",
          meta: {
            title: "首页"
          }
        }
      ] as PartialRouteLocationMatched[]
    ).concat(matched);
  }
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};
watch(
  () => route.path,
  () => {
    getBreadcrumb();
  },
  { immediate: true }
);
// 主要是针对 动态路由 /user/:id 进行动态参数填充
// path-to-regexp 文档说明 https://www.npmjs.com/package/path-to-regexp
const pathCompile = (path: string) => {
  // 根据路径变编译成正则函数 并接收具体参数 比如根据正则/user/:id 帮你将:id替换成具体路径
  const toPath = compile(path); // 比如 path /user/:id
  const params = route.params; // { id: 10 }
  return toPath(params); // toPath({ id: 10 }) => /user/10 返回填充后的路径
};
// 点击面包屑导航可跳转
const handleLink = (route: PartialRouteLocationMatched) => {
  const { path, redirect } = route;
  // 如果是重定向路由 就走重定向路径
  if (redirect) {
    router.push(redirect as RouteLocationRaw);
    return;
  }
  router.push(pathCompile(path!));
};
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  /* float: left; */
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}
.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>
<style lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-leave-active {
  position: absolute;
}
.breadcrumb-move {
  transition: all 0.5s;
}
</style>
