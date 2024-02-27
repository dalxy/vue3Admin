import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 初始化css，重置css默认样式
import "normalize.css/normalize.css";
// 全局css
import "@/styles/index.scss";
// 引入icon插件
import initSvgIcon from "@/icons/index";
// 注册脚本
import "virtual:svg-icons-register"; // 不能有空格
// 注册element-plus
import installElementPlus from "./plugins/element"; // qiankun
import { registerMicroApps, start } from "qiankun";
// pinia持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import Avatar from "@/components/Avatar/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hambuger from "@/components/Hambuger/index.vue";

const shareComponent = {
  Avatar,
  Breadcrumb,
  Hambuger
};

const apps = [
  {
    name: "vueApp",
    entry: "//localhost:10001",
    container: "#vue",
    activeRule: "/vue",
    props: {
      ...shareComponent
    }
  },
  {
    name: "reactApp",
    entry: "//localhost:20000",
    container: "#react",
    activeRule: "/react"
  }
];

registerMicroApps(apps);
start({
  prefetch: false,
  sandbox: {
    // experimentalStyleIsolation: true,
    // strictStyleIsolation: true,
  }
});
createApp(App)
  .use(ElementPlus)
  .use(Antd)
  // 安装element-plus插件
  .use(installElementPlus)
  .use(router)
  .use(initSvgIcon)
  .use(pinia)
  .mount("#app");
