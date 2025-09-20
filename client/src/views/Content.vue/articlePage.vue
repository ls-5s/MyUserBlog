<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleDetail } from '@/api/class'
const route = useRoute()
const router = useRouter()
const id = ref(route.query.id)

const article = ref({
  title: '',
  createTime: '',
  type: '',
  content: '',
})

const Detail = async () => {
  const res = await getArticleDetail(id.value)
  console.log(res.data)
  article.value = res.data.article
  console.log(article.value)
}

// 返回首页函数
const goToHomePage = () => {
  router.push('/')
}

// 检测系统暗黑模式并监听变化
const isDarkMode = computed(() => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
})

// 监听暗黑模式变化
onMounted(async () => {
  await Detail()

  // 添加暗黑模式监听器
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    // 当暗黑模式切换时，重新应用样式
    document.body.classList.toggle('dark', isDarkMode.value)
  })

  // 初始应用暗黑模式状态
  document.body.classList.toggle('dark', isDarkMode.value)
})
</script>
<template>
  <div class="article-container">
    <h1>{{ article.title }}</h1>
    <p>创建时间: {{ article.createTime }}</p>
    <p>文章类型: {{ article.type }}</p>
    <div v-html="article.content">
    </div>
    <!-- 返回首页图标按钮 -->
    <button class="back-home-btn" @click="goToHomePage" aria-label="返回首页">
      <svg class="home-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </button>
  </div>
</template>
<style scoped>
.article-container {
  padding: 20px;
  position: relative;
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.back-home-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(64, 158, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow: hidden;
}

.back-home-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s ease;
}

.back-home-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 8px 30px rgba(64, 158, 255, 0.6);
}

.back-home-btn:hover::before {
  left: 100%;
}

.back-home-btn:active {
  transform: translateY(-2px) scale(0.98);
}

.home-icon {
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;
}

.back-home-btn:hover .home-icon {
  transform: rotate(15deg) scale(1.1);
}

/* 添加呼吸动画效果 */
@keyframes breathe {
  0%, 100% {
    box-shadow: 0 4px 20px rgba(64, 158, 255, 0.4);
  }
  50% {
    box-shadow: 0 8px 30px rgba(64, 158, 255, 0.7);
  }
}

.back-home-btn {
  animation: breathe 3s infinite ease-in-out;
}

/* 响应式设计 */
@media (max-width: 768px) {
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
.dark .back-home-btn {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  color: #e2e8f0;
}

.dark .back-home-btn::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.dark .back-home-btn:hover {
  background: linear-gradient(135deg, #718096 0%, #4a5568 100%);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}

/* 暗黑模式呼吸动画 */
.dark .back-home-btn {
  animation-name: breathe-dark;
}

@keyframes breathe-dark {
  0%, 100% {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
  }
}

/* 暗黑模式下文章容器样式 */
.dark .article-container {
  background-color: #1a202c;
  color: #e2e8f0;
}

/* 暗黑模式下文本样式 */
.dark .article-container h1 {
  color: #f7fafc;
}

.dark .article-container p {
  color: #cbd5e0;
}
</style>
