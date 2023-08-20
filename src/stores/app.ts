import { defineStore } from "pinia";
import { Size } from "@/plugins/element";

export const useAppStore = defineStore(
  "app",
  () => {
    // 状态
    const state = reactive({
      siderbar: {
        // sidebar 展开状态
        opened: false
      },
      size: "default" as Size
    });
    const sidebar = computed(() => state.siderbar);
    const size = computed(() => state.size);
    const setSize = (size: Size) => {
      state.size = size;
    };
    // actions
    const toggleSidebar = () => {
      state.siderbar.opened = !state.siderbar.opened;
      // console.log(sidebar.opened);
    };
    // 需要导出响应式数据，persist 插件才会存储
    // console.log(sidebar);

    return { state, sidebar, toggleSidebar, setSize, size };
  },
  {
    persist: {
      storage: window.sessionStorage,
      paths: ["state.siderbar.opened", "state.size"]
    }
  }
);
