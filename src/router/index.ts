import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

// 看做是异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation", //此组件作为一级路由
    redirect: "Documentation/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Documentation",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index.vue"
          ),
        meta: {
          title: "Documentation", // 需要配置声明文件否则无提示
          icon: "documentation",
          hidden: false
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        meta: {
          title: "Guide",
          icon: "guide"
          // 默认加载Guide时，/documentation/index高亮显示
          // activeMenu: "/documentation/index"
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System",
      icon: "lock",
      alwaysShow: true
    },
    children: [
      {
        path: "menu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/menu.vue"),
        meta: {
          title: "Menu Management",
          icon: "lock",
          hidden: false
        }
      },
      {
        path: "rule",
        component: () =>
          import(/* webpackChunkName: "rule" */ "@/views/system/rule.vue"),
        meta: {
          title: "Rule Management",
          icon: "list",
          hidden: false
        }
      },
      {
        path: "user",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/system/user.vue"),
        meta: {
          title: "User Management",
          icon: "lock",
          hidden: false
        }
      }
    ]
  },
  {
    // 外链路由
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "http://www.baidu.com/",
        redirect: "/",
        meta: {
          title: "external Link",
          icon: "link"
        }
      }
    ]
  }
];
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          //不能有大括号
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "Dashboard", // 需要配置声明文件否则无提示
          icon: "dashboard"
        }
      }
    ]
  }
];

export const routes = [...constantRoutes, ...asyncRoutes];

export default createRouter({
  history: createWebHistory(),
  routes
});
