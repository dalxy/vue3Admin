<template>
  <div class="container">
    <!-- 左侧编辑器 -->
    <div class="editor-wrapper">
      <div class="toolbar">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ active: editor?.isActive('bold') }"
        >
          𝗕
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ active: editor?.isActive('italic') }"
        >
          𝘐
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ active: editor?.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button @click="editor.chain().focus().undo().run()">↩</button>
        <button @click="editor.chain().focus().redo().run()">↪</button>
      </div>
      <editor-content class="editor" :editor="editor" />
    </div>

    <!-- 右侧操作面板 -->
    <div class="side-panel">
      <textarea
        v-model="polishedText"
        placeholder="润色结果将显示在此处"
        class="polish-area"
      ></textarea>
      <div class="action-buttons">
        <button
          class="polish-btn"
          @click="handlePolish"
          :disabled="!hasSelection"
        >
          ✨ 一键润色
        </button>
        <div class="modify-btns">
          <button
            @click="replaceText"
            :disabled="!canReplace"
            class="replace-btn"
          >
            🔄 替换
          </button>
          <button @click="insertText" :disabled="!canInsert" class="insert-btn">
            ➕ 插入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";

// 编辑器实例
const editor = ref(null);
// 润色后的文本
const polishedText = ref("");
// 选区范围存储
const currentSelection = ref({ from: 0, to: 0 });

// 初始化编辑器
onMounted(() => {
  editor.value = new Editor({
    content: `<h2>智能润色编辑器</h2><p>选中需要优化的文字，点击右侧润色按钮</p>`,
    extensions: [StarterKit, Heading.configure({ levels: [1, 2, 3] })],
    onUpdate({ editor }) {
      const { from, to } = editor.state.selection;
      currentSelection.value = { from, to };
    },
    onSelectionUpdate({ editor }) {
      const { from, to } = editor.state.selection;
      currentSelection.value = { from, to };
    }
  });
});

// 清理编辑器
onBeforeUnmount(() => {
  editor.value?.destroy();
});

// 计算属性
const hasSelection = computed(() => {
  return currentSelection.value.to - currentSelection.value.from > 0;
});

const canReplace = computed(() => {
  return polishedText.value.length > 0 && hasSelection.value;
});

const canInsert = computed(() => {
  return polishedText.value.length > 0;
});

// 处理润色请求
const handlePolish = async () => {
  const selectedText = editor.value
    .getText()
    .slice(currentSelection.value.from, currentSelection.value.to);

  // 模拟API调用，实际替换为真实接口
  polishedText.value = await mockPolishAPI(selectedText);
};

// 替换文本（核心逻辑）
const replaceText = () => {
  if (!editor.value || !polishedText.value) return;

  const transaction = editor.value
    .chain()
    .focus()
    .deleteRange(currentSelection.value) // 删除选中内容
    .insertContent(polishedText.value) // 插入新内容
    .run();

  // 计算新选区范围
  const newFrom = currentSelection.value.from;
  const newTo = newFrom + polishedText.value.length;

  // 在下一个tick设置选区
  setTimeout(() => {
    editor.value
      .chain()
      .focus()
      .setTextSelection({ from: newFrom, to: newTo })
      .run();
  }, 0);
};

// 插入文本
const insertText = () => {
  if (!editor.value || !polishedText.value) return;

  const transaction = editor.value
    .chain()
    .focus()
    .insertContent(polishedText.value)
    .run();

  // 计算新选区范围
  const newFrom = currentSelection.value.to;
  const newTo = newFrom + polishedText.value.length;

  setTimeout(() => {
    editor.value
      .chain()
      .focus()
      .setTextSelection({ from: newFrom, to: newTo })
      .run();
  }, 0);
};

// 模拟润色API
const mockPolishAPI = (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const improvements = [
        "优化后的精彩内容：",
        "经过专业润色的版本：",
        "智能优化建议："
      ];
      const randomIndex = Math.floor(Math.random() * improvements.length);
      resolve(
        `${improvements[randomIndex]} ${text}（已优化${text.length}字符）`
      );
    }, 500);
  });
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  padding: 30px;
  height: 100vh;
  background: #f5f7fa;
}

.editor-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.toolbar {
  padding: 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 8px;
}

.toolbar button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar button:hover {
  background: #409eff;
  color: white;
  border-color: #409eff;
}

.toolbar button.active {
  background: #409eff;
  color: white;
  border-color: #409eff;
}

.editor {
  padding: 20px;
  min-height: 500px;
  line-height: 1.6;
}

.editor:deep(.ProseMirror) {
  min-height: 500px;
}

.editor:deep(.ProseMirror:focus) {
  outline: none;
}

.side-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.polish-area {
  flex: 1;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: none;
  line-height: 1.6;
  font-family: inherit;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.polish-btn {
  padding: 12px;
  background: linear-gradient(135deg, #409eff, #3375b9);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.polish-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.modify-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.modify-btns button {
  padding: 10px;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: transform 0.1s;
}

.modify-btns button:active {
  transform: scale(0.95);
}

.replace-btn {
  background: #67c23a;
}

.insert-btn {
  background: #e6a23c;
}

.modify-btns button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
