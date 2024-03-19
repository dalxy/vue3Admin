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

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "http://80311d60ff42a3474a44a04c03caaf1a@100.116.239.52:9000/5",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false
    })
  ],
  release: "pro@1.0.1",
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
