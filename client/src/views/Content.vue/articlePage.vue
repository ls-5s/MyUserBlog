<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleDetail } from '@/api/class'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import {formatDate} from '@/utils/format'
const route = useRoute()
const router = useRouter()
const id = ref(route.query.id)

const article = ref({
  title: '',
  createTime: '',
  type: '',
  content: '',
})

// 创建MarkdownIt实例并配置代码高亮
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
      } catch (error) {
        console.error('代码高亮失败:', error)
        return ''
      }
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (error) {
      console.error('自动检测语言失败:', error)
      return ''
    }
  }
})

// 处理后的Markdown内容
const renderedContent = computed(() => {
  if (article.value.content) {
    return md.render(article.value.content)
  }
  return ''
})

const Detail = async () => {
  try {
    const res = await getArticleDetail(id.value)
    article.value = res.data.article

    // 等待DOM更新后应用代码高亮
    await nextTick()
    applyCodeHighlight()
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}

// 应用代码高亮的函数
const applyCodeHighlight = () => {
  const codeBlocks = document.querySelectorAll('.markdown-content pre code')
  codeBlocks.forEach((block) => {
    hljs.highlightElement(block)
  })
}

// 返回首页函数
const goToHomePage = () => {
  router.push('/')
}

// 检测系统暗黑模式
const isDarkMode = computed(() => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
})

// 监听暗黑模式变化
onMounted(async () => {
  await Detail()

  // 添加暗黑模式监听器
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    document.body.classList.toggle('dark', isDarkMode.value)
    nextTick(() => applyCodeHighlight())
  })

  // 初始应用暗黑模式状态
  document.body.classList.toggle('dark', isDarkMode.value)
})
</script>
<template>
  <div class="article-container">
    <div class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span>创建时间: {{ formatDate(article.createTime) }}</span>
        <span class="meta-divider">|</span>
        <span>文章类型: {{ article.type }}</span>
      </div>
    </div>

    <!-- 使用处理后的Markdown内容 -->
    <div class="markdown-content" v-html="renderedContent"></div>

    <!-- 返回首页图标按钮 -->
    <button class="back-home-btn" @click="goToHomePage" aria-label="返回首页">
      <svg class="home-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </button>
  </div>
</template>
<style scoped>
/* 核心容器样式 */
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

/* 文章头部样式 */
.article-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.article-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.3;
  color: #1a202c;
}

.article-meta {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #718096;
}

.meta-divider {
  margin: 0 10px;
  color: #cbd5e0;
}

/* Markdown内容基础样式 */
.markdown-content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #2d3748;
}

/* Markdown标题样式 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  font-weight: 600;
  line-height: 1.3;
  color: #1a202c;
}

.markdown-content h1 {
  font-size: 1.8rem;
}

.markdown-content h2 {
  font-size: 1.5rem;
}

.markdown-content h3 {
  font-size: 1.3rem;
}

.markdown-content h4 {
  font-size: 1.15rem;
}

.markdown-content h5 {
  font-size: 1rem;
}

.markdown-content h6 {
  font-size: 0.9rem;
  color: #718096;
}

/* Markdown段落和列表样式 */
.markdown-content p {
  margin-bottom: 1.2em;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1.2em;
  padding-left: 1.5em;
}

.markdown-content ul {
  list-style-type: disc;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content li {
  margin-bottom: 0.5em;
}

/* Markdown代码块样式 */
.markdown-content pre {
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5em 0 !important;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  border: 1px solid #e2e8f0;
}

.markdown-content code {
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  border: 1px solid #e2e8f0;
}

.markdown-content pre code {
  padding: 0;
  border: none;
  display: block;
}

/* 移除代码块周围可能的额外元素的边距 */
.markdown-content pre+p,
.markdown-content p+pre {
  margin-top: 0.5em !important;
}

.markdown-content pre>code,
.markdown-content code>pre {
  margin: 0 !important;
  padding: 0 !important;
}

/* Markdown引用样式 */
.markdown-content blockquote {
  border-left: 4px solid #409eff;
  padding-left: 1rem;
  margin: 1.5em 0;
  color: #718096;
  font-style: italic;
}

/* Markdown表格样式 */
.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
  font-size: 0.95rem;
}

.markdown-content th,
.markdown-content td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.markdown-content th {
  background-color: #f7fafc;
  font-weight: 600;
  color: #4a5568;
}

.markdown-content tr:hover {
  background-color: #f7fafc;
}

/* Markdown链接样式 */
.markdown-content a {
  color: #409eff;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

/* Markdown图片样式 */
.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  margin: 1.5em 0;
  display: block;
}

/* 返回首页按钮样式 */
.back-home-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #409eff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(64, 158, 255, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1;
}

.back-home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.4);
}

.home-icon {
  width: 28px;
  height: 28px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-container {
    padding: 15px;
  }

  .article-header h1 {
    font-size: 2rem;
  }

  .markdown-content {
    font-size: 1rem;
    line-height: 1.7;
  }

  .back-home-btn {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }

  .home-icon {
    width: 24px;
    height: 24px;
  }
}

/* 暗黑模式适配 */
.dark .article-container {
  background-color: #1a202c;
  color: #e2e8f0;
}

.dark .article-header {
  border-bottom-color: #2d3748;
}

.dark .article-header h1 {
  color: #f7fafc;
}

.dark .article-meta {
  color: #a0aec0;
}

.dark .meta-divider {
  color: #2d3748;
}

/* 暗黑模式下Markdown内容样式 */
.dark .markdown-content {
  color: #e2e8f0;
}

.dark .markdown-content h1,
.dark .markdown-content h2,
.dark .markdown-content h3,
.dark .markdown-content h4,
.dark .markdown-content h5,
.dark .markdown-content h6 {
  color: #f7fafc;
}

.dark .markdown-content h6 {
  color: #a0aec0;
}

.dark .markdown-content blockquote {
  border-left-color: #66b1ff;
  color: #a0aec0;
}

.dark .markdown-content th {
  background-color: #2d3748;
  color: #cbd5e0;
}

.dark .markdown-content td {
  border-bottom-color: #4a5568;
}

.dark .markdown-content tr:hover {
  background-color: #2d3748;
}

.dark .markdown-content a {
  color: #66b1ff;
}

.dark .markdown-content a:hover {
  color: #90cdf4;
}

/* 暗黑模式下代码块样式 */
.dark .markdown-content pre {
  border-color: #4a5568;
}

.dark .markdown-content code {
  border-color: #4a5568;
  color: #e2e8f0;
}

/* 暗黑模式下返回首页按钮样式 */
.dark .back-home-btn {
  background-color: #4a5568;
  color: #e2e8f0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.dark .back-home-btn:hover {
  background-color: #718096;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}
</style>
