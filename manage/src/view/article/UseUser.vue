<template>
  <div class="markdown-editor">
    <h1 class="text-2xl font-bold mb-4">Vue3 Markdown 编辑器</h1>

    <div class="editor-container flex flex-col md:flex-row gap-4">
      <!-- 输入区域 -->
      <div class="input-section flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          输入 Markdown
        </label>
        <textarea v-model="markdownContent"
          class="w-full h-[500px] p-3 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入 Markdown 内容..."></textarea>
      </div>

      <!-- 预览区域 -->
      <div class="preview-section flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          预览效果
        </label>
        <div class="markdown-body w-full h-[500px] p-4 border border-gray-300 rounded-md overflow-auto"
          v-html="renderedHtml"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'github-markdown-css';
import 'highlight.js/styles/github-dark.css'; // 可以更换为其他高亮主题

// 初始 Markdown 内容
const markdownContent = ref(`# 这是一个标题

## 这是二级标题

这是一段普通的文本，**这是加粗文本**，*这是斜体文本*。

### 代码示例:
\`\`\`javascript
function greeting(name) {
    return \`Hello, \${name}!\`;
}

console.log(greeting('Vue3'));
\`\`\`

\`\`\`python
def greeting(name):
    return f"Hello, {name}!"

print(greeting("Vue3"))
\`\`\`

- 列表项 1
- 列表项 2
- 列表项 3

> 这是一段引用文本

![示例图片](https://picsum.photos/800/400 "示例图片描述")
`);

// 渲染后的 HTML
const renderedHtml = ref('');

// 配置 marked
function setupMarked() {
  marked.setOptions({
    highlight: function (code, lang) {
      // 如果指定了语言且该语言被支持，则进行高亮
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      // 否则尝试自动检测语言
      return hljs.highlightAuto(code).value;
    },
    breaks: true, // 支持换行
    gfm: true     // 支持 GitHub Flavored Markdown
  });
}

// 渲染 Markdown
function renderMarkdown() {
  renderedHtml.value = marked.parse(markdownContent.value);
}

// 组件挂载时初始化
onMounted(() => {
  setupMarked();
  renderMarkdown();
});

// 监听内容变化，实时更新渲染
watch(markdownContent, renderMarkdown);
</script>

<style scoped>
.markdown-editor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.editor-container {
  width: 100%;
}

/* 滚动条美化 */
.preview-section ::-webkit-scrollbar,
.input-section ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.preview-section ::-webkit-scrollbar-thumb,
.input-section ::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
</style>
