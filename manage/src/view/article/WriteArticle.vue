<template>
  <div>
    <div class="top">
      <el-input v-model="input.title" style="width: 1000px; height: 70px; border-left: none !important;"
        placeholder="输入文章标题..." />
      <el-select clearable v-model="input.type" placeholder="文章分类" style="width: 240px; height: 40px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" @click="ADD">发布</el-button>
    </div>
    <div class="content">
      <!-- 左侧Markdown编辑器 - 改为普通textarea -->
      <textarea
        ref="editorLeft"
        v-model="markdownContent"
        class="markdown-editor"
        placeholder="请输入Markdown内容..."
        @scroll="syncScroll('left')"
      ></textarea>

      <!-- 右侧预览区域 -->
      <div
        ref="editorRight"
        class="markdown-body w-full p-4 border border-gray-300 rounded-md overflow-auto"
        v-html="renderedHtml"
        @scroll="syncScroll('right')"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';

import 'github-markdown-css';
import 'highlight.js/styles/github-dark.css';

// 定义输入数据
const input = ref({
  title: '',
  type: '',
})

const markdownContent = ref('')
const renderedHtml = ref('');

// 文章分类
const options = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2' },
  { value: 'Option3', label: 'Option3' },
  { value: 'Option4', label: 'Option4' },
  { value: 'Option5', label: 'Option5' },
]

// 创建引用以访问DOM元素
const editorLeft = ref(null)
const editorRight = ref(null)
// 标记当前正在滚动的编辑器，避免循环触发滚动事件
let scrollingEditor = ''

// 滚动同步函数 - 适配textarea版本
const syncScroll = (source) => {
  // 如果已经有编辑器在滚动，则不执行操作，避免循环
  if (scrollingEditor && scrollingEditor !== source) {
    return
  }

  scrollingEditor = source

  nextTick(() => {
    // 获取源元素和目标元素
    const sourceElement = source === 'left' ? editorLeft.value : editorRight.value
    const targetElement = source === 'left' ? editorRight.value : editorLeft.value

    if (sourceElement && targetElement) {
      // 同步滚动位置
      targetElement.scrollTop = sourceElement.scrollTop
      targetElement.scrollLeft = sourceElement.scrollLeft
    }

    // 重置滚动标记
    setTimeout(() => {
      scrollingEditor = ''
    }, 10)
  })
}

const ADD = () => {
  console.log(input.value.title)
  console.log(markdownContent.value)
}

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
* {
  box-sizing: border-box;
}

/* 添加html和body的高度设置，确保页面占满整个视口 */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  /* 修改整个页面的背景颜色 */
  background-color: rgb(248, 249, 250);
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* 保持顶部栏为白色以突出显示 */
  background: rgb(255, 255, 255);
  height: 70px;
  border-bottom: 1px solid rgb(235, 237, 240);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.el-input {
  font-size: 25px;
  font-weight: bold;
}

.el-select {
  margin-left: 30px;
}

.el-button {
  margin-left: 270px;
}

.content {
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* 修改内容区域的背景颜色 */
  background: rgb(248, 249, 250);
  /* 修改高度为视口高度减去顶部栏高度和底部边距 */
  height: calc(100vh - 90px);
  gap: 10px;
  padding: 10px;
}

/* 普通textarea样式 */
.markdown-editor {
  width: 100%;
  height: 100%;
  resize: none;
  /* 修改左边编辑器的边框颜色 */
  border: 1px solid #409eff;
  border-radius: 4px;
  /* 调整左侧编辑器的内边距 */
  padding: 16px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  outline: none;
}

.markdown-editor:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 预览区域样式 */
.markdown-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  /* 为右侧预览区域添加上下边框 */
  border-top: 1px solid rgb(235, 237, 240);
  border-bottom: 1px solid rgb(235, 237, 240);
  /* 调整右侧预览区的内边距 */
  padding: 20px !important;
}
</style>
