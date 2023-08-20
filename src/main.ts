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

registerMicroApps([
  {
    name: "vue app", // app name registered
    entry: "//localhost:7100",
    container: "#yourContainer",
    activeRule: "/yourActiveRule"
  },
  {
    name: "vue app",
    entry: { scripts: ["//localhost:7100/main.js"] },
    container: "#yourContainer2",
    activeRule: "/yourActiveRule2"
  }
]);
start();
createApp(App)
  .use(ElementPlus)
  // 安装element-plus插件
  .use(installElementPlus)
  .use(router)
  // .use(createPinia())
  .use(initSvgIcon)
  .use(pinia)
  .mount("#app");
