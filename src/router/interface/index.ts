import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

export const interfaceRoutes: Array<RouteRecordRaw> = [
  {
    path: "/interface",
    component: Layout,
    redirect: "/interface/index",
    children: [
      {
        path: "index",
        name: "Interface",
        component: () =>
          import(
            /* webpackChunkName: "interface" */ "@/views/interface/index.vue"
          ),
        meta: {
          title: "接口",
          icon: "guide"
          // 默认加载Guide时，/documentation/index高亮显示
          // activeMenu: "/documentation/index"
        }
      }
    ]
  }
];
