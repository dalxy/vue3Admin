import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import DefineOptions from "unplugin-vue-define-options/vite";

// 按需使用element-plus
// 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  // define: {
  //   // 启用生产环境构建下激活不匹配的详细警告
  //   __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true"
  // },
  plugins: [
    vue(),
    DefineOptions(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")], // icon存放目录
      symbolId: "icon-[name]", // symbol的id
      inject: "body-last", // 插入的位置
      customDomId: "__svg__icons__dom__" // svg的id
    }),
    // 自动导入element-plus
    AutoImport({
      imports: ["vue", "vue-router"], // 顺便自动导入 vue vue-router
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false }, //改成true生成一次后禁用即可
      dts: "src/auto-import.d.ts" // 生成的全局变量放到此目录下
    }),
    Components({
      // 默认只针对src/components目录实现自动导入
      dirs: ["src/components", "src/layout/components"],
      dts: "src/components.d.ts",
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  // 配置前端服务地址和端口
  server: {
    host: "0.0.0.0", //自定义主机名
    port: 8010, //自定义端口
    // 是否开启 https
    https: false
  }
});
