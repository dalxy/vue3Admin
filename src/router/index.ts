import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import { interfaceRoutes } from "./interface";

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
          title: "文档", // 需要配置声明文件否则无提示
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
          title: "导航",
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
      title: "系统",
      icon: "lock",
      alwaysShow: true
    },
    children: [
      {
        path: "menu",
        name: "Menu Management",
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
        name: "Rule Management",
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
        name: "User Management",
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
    path: "/test", //此组件作为一级路由
    redirect: "test/index.vue",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Test",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/test/index.vue"
          ),
        meta: {
          title: "测试", // 需要配置声明文件否则无提示
          icon: "documentation",
          hidden: false
        }
      }
    ]
  },
  {
    path: "/treeSelect",
    component: Layout,
    redirect: "/treeSelect/index",
    children: [
      {
        path: "index",
        name: "TreeSelect",
        component: () =>
          import(
            /* webpackChunkName: "treeSelect" */ "@/views/treeSelect/index.vue"
          ),
        meta: {
          title: "树选择",
          icon: "guide"
          // treeSelect/documentation/index高亮显示
          // activeMenu: "/documentation/index"
        }
      }
    ]
  },
  {
    path: "/tiptapEditor",
    component: Layout,
    redirect: "/tiptapEditor/index",
    children: [
      {
        path: "index",
        name: "TiptapEditor",
        component: () =>
          import(
            /* webpackChunkName: "tiptapEditor" */ "@/views/tiptapEditor/index.vue"
          ),
        meta: {
          title: "富文本编辑器",
          icon: "guide"
          // tiptapEditor/documentation/index高亮显示
          // activeMenu: "/documentation/index"
        }
      }
    ]
  },
  {
    path: "/echarts",
    component: Layout,
    redirect: "/echarts/index",
    children: [
      {
        path: "index",
        name: "Echarts",
        component: () =>
          import(
            /* webpackChunkName: "tiptapEditor" */ "@/views/echarts/index.vue"
          ),
        meta: {
          title: "国际手机号注册",
          icon: "guide"
          // tiptapEditor/documentation/index高亮显示
          // activeMenu: "/documentation/index"
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
          title: "外链",
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
          title: "首页", // 需要配置声明文件否则无提示
          icon: "dashboard",
          affix: true, // 固定标签
          noCache: true // 不缓存
        }
      }
    ]
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        // 带参数的动态路由正则匹配 文档说明
        // https://next.router.vuejs.org/zh/guide/essentials/routematchingsyntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E
        path: "/redirect/:path(.*)", // 要匹配多级路由 应该加*号
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ "@/views/redirect/index.vue"
          )
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    }
  }
];

export const routes = [...constantRoutes, ...interfaceRoutes, ...asyncRoutes];

export default createRouter({
  history: createWebHistory(),
  routes
});
