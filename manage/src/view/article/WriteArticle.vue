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
      <textarea ref="editorLeft" v-model="markdownContent" class="markdown-editor" placeholder="请输入Markdown内容..."
        @scroll="syncScroll('left')"></textarea>

      <!-- 右侧预览区域 -->
      <div ref="editorRight" class="markdown-body w-full p-4 border border-gray-300 rounded-md overflow-auto"
        v-html="renderedHtml" @scroll="syncScroll('right')"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { marked } from 'marked';
import router from '@/router/index'
import hljs from 'highlight.js';
import { publishArticle } from '@/api/article'
import { useUserStore } from '@/stores/index'
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
// 文章分类
const options = [
  // 前端细分
  { value: '前端', label: '前端' },
  { value: 'HTML/CSS', label: 'HTML/CSS' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: '前端框架', label: '前端框架' }, // Vue/React/Angular 等
  { value: '小程序开发', label: '小程序开发' },
  { value: '移动端H5', label: '移动端H5' },
  { value: 'git', label: 'git' },

  // 后端细分
  { value: '后端', label: '后端' },
  { value: 'Java', label: 'Java' },
  { value: 'Python', label: 'Python' },
  { value: 'Go', label: 'Go' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Express', label: 'Express' },
  { value: '后端框架', label: '后端框架' }, // Spring/Django/Gin 等

  // 数据库
  { value: '数据库', label: '数据库' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'Redis', label: 'Redis' },

  // 原有其他分类
  { value: 'Android', label: 'Android' },
  { value: 'iOS', label: 'iOS' },
  { value: '人工智能', label: '人工智能' },
  { value: '开发工具', label: '开发工具' },
  { value: '代码人生', label: '代码人生' },
  { value: '阅读', label: '阅读' },
];

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
const useStore = useUserStore()
// 发布文章
const ADD = async () => {
  const res = await publishArticle({
    username: useStore.username,
    title: input.value.title,
    type: input.value.type,
    content: renderedHtml.value,
    markdownContent: markdownContent.value
  })
  if (res.data.code === 201) {
    await router.push('/article/manage')
    console.log(res)
    ElMessage.success('发布成功')
    input.value.title = ''
    input.value.type = ''
    markdownContent.value = ''
    renderedHtml.value = ''
  }
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
html,
body {
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
