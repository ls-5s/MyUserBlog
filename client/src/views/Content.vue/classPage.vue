<script setup>
import { ref, onMounted } from 'vue'
import { getLatestArticles, getArticleCount } from '@/api/class'
import { formatDate } from '@/utils/format'
const classList = ref([
  { id: 1, name: "前端" },
  { id: 2, name: "HTML/CSS" },
  { id: 3, name: "JavaScript" },
  { id: 4, name: "前端框架" },
  { id: 5, name: "小程序开发" },
  { id: 6, name: "移动端H5" },
  { id: 7, name: "git" },
  { id: 8, name: "后端" },
  { id: 9, name: "Java" },
  { id: 10, name: "Python" },
  { id: 11, name: "Go" },
  { id: 12, name: "PHP" },
  { id: 13, name: "Node.js" },
  { id: 14, name: "Express" },
  { id: 15, name: "后端框架" },
  { id: 16, name: "数据库" },
  { id: 17, name: "MySQL" },
  { id: 18, name: "MongoDB" },
  { id: 19, name: "PostgreSQL" },
  { id: 20, name: "Redis" },
  { id: 21, name: "Android" },
  { id: 22, name: "iOS" },
  { id: 23, name: "人工智能" },
  { id: 24, name: "开发工具" },
  { id: 25, name: "代码人生" },
  { id: 26, name: "阅读" }
]
)
// 响应式引用，用于获取当前主题状态
const isDark = ref(false)

// 页面加载时检查主题状态
onMounted(() => {
  const savedTheme = localStorage.getItem('appTheme')
  isDark.value = savedTheme === 'dark'
})

// 根据分类ID返回对应的图标
function getClassIcon(id) {
  const icons = [
    '💻', '🎨', '📜', '🧱', '📱', '📱', '🌿',
    '⚙️', '☕', '🐍', '🚀', '🐘', '🔄', '⚡',
    '🏗️', '🗄️', '🔄', '🍃', '🐘', '🔴', '🤖',
    '🍎', '🤖', '🛠️', '📚', '📖'
  ]
  // 确保ID在有效范围内，如果超出则使用默认图标
  return id > 0 && id <= icons.length ? icons[id - 1] : '📁'
}
// 最新文章5篇
const latestArticles = ref([])
// 最新文章5篇
const getLatest = async () => {
  const res = await getLatestArticles()
  if (res.data.code === 201) {

    latestArticles.value = res.data.data
    // console.log(latestArticles.value)
  }
}
// 文章数量
const articleCount = ref(0)
const getCount = async () => {
  const res = await getArticleCount()
  if (res.data.code === 201) {
    articleCount.value = res.data.data
  }
}
onMounted(async () => {
  await getLatest()
  await getCount()
})
</script>
<template>
  <div class="box">
    <div class="box-left">
      <!-- 分类标题 -->
      <h2 class="class-section-title">文章分类</h2>

      <!-- 分类列表网格布局 -->
      <div class="class-grid">
        <div
          v-for="item in classList"
          :key="item.id"
          class="class-item"
        >
          <div class="class-item-content">
            <!-- 分类图标 -->
            <div class="class-icon">{{ getClassIcon(item.id) }}</div>
            <!-- 分类名称 -->
            <span class="class-name">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box-right">
      <!-- 个人信息总容器 -->
      <div class="profile-container">
        <!-- 头像区域 -->
        <div class="avatar-section">
          <img src="../../assets/1.jpg" alt="头像" class="avatar">
          <!-- 文章数量和浏览量 -->
          <div class="stats">
            <div class="stat">
              <span class="stat-number">{{ articleCount }}</span>
              <span class="stat-label">文章</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-number">1582</span>
              <span class="stat-label">浏览量</span>
            </div>
          </div>
        </div>
        <!-- 社交链接容器 -->
        <div class="social-links-container">
          <!-- 社交链接 - GitHub -->
          <a href="https://github.com/dashboard" target="_blank" class="social-link">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub"
              class="social-icon">
            <span>GitHub</span>
          </a>
          <!-- 社交链接 - 掘金 -->
          <a href="https://juejin.cn/user/2813031236510796/posts" target="_blank" class="social-link">
            <img src="../../assets/2.png" alt="掘金" class="social-icon juejin-icon">
            <span>掘金</span>
            <!-- 添加占位空格使文本长度与GitHub一致 -->
            <span class="text-placeholder">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </a>
        </div>
      </div>
      <!-- 公告部分 -->
      <div class="announcement-section">
        <div class="announcement-header">
          <span class="announcement-icon">📢</span>
          <h3 class="announcement-title">公告</h3>
        </div>
        <div class="announcement-content">
          <p class="announcement-text">欢迎访问我的博客！最新文章已更新，包含前端开发和AI技术的内容。如有任何问题或建议，欢迎通过社交链接联系我。</p>
        </div>
      </div>

      <!-- 最近更新部分 -->
      <div class="recent-updates">
        <div class="updates-header">
          <svg class="update-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <h3 class="updates-title">最近更新</h3>
        </div>
        <div class="updates-list">
          <!-- 修正后的文章列表结构 -->
          <div v-for="item in latestArticles" :key="item.id" class="update-item">
            <a href="#" class="article-title">{{ item.title }}</a>
            <span class="article-time">{{ formatDate(item.createTime) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 定义主题变量 */
:root {
  --bg-primary: rgb(242, 243, 245);
  --text-primary: #333;
  --border-light: #e5e7eb;
  --primary-color: #6366f1;
}

/* 基础容器样式 */
.box {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  padding: 20px;
}

/* 左侧区域 */
.box-left {
  flex: 6;
  background: white;
  color: var(--text-primary);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 右侧区域 */
.box-right {
  flex: 2;
  color: var(--text-primary);
  border-radius: 8px;
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 个人信息总容器 */
.profile-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* 头像区域 */
.avatar-section {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

/* 统计信息 */
.stats {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px 15px;
  border-radius: 8px;
  gap: 15px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  font-size: 14px;
  color: var(--text-primary);
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: var(--border-light);
}

/* 社交链接容器 */
.social-links-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 社交链接样式 */
.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 12px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  color: var(--text-primary);
  /* 设置最小宽度，确保两个链接视觉上一样长 */
  min-width: 120px;
  justify-content: center;
}

.social-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 社交图标基础样式 */
.social-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  object-fit: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 掘金图标特定样式 - 确保圆形显示 */
.juejin-icon {
  border-radius: 50% !important;
}

/* 文本占位符，确保掘金链接与GitHub链接长度一致 */
.text-placeholder {
  visibility: hidden;
  user-select: none;
}

/* 公告部分样式 */
.announcement-section {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.announcement-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.announcement-icon {
  font-size: 20px;
}

.announcement-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-color);
}

.announcement-content {
  font-size: 14px;
  line-height: 1.6;
}

.announcement-text {
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

/* 最近更新部分样式 */
.recent-updates {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.updates-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-light);
  height: 40px;
}

.update-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.updates-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  height: 100%;
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.update-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

/* 添加 update-item 的悬停效果 */
.update-item:hover {
  background-color: rgba(99, 102, 241, 0.08);
  transform: translateX(4px);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.1);
}

.article-title {
  font-size: 14px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1.5;
  display: block;
  font-weight: 500;
}

/* 增强文章标题的悬停效果 */
.article-title:hover {
  color: var(--primary-color);
  transform: translateX(2px);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

.article-time {
  font-size: 12px;
  color: #9ca3af;
  transition: all 0.2s ease;
  display: block;
  margin-top: 2px;
}

/* 分类部分标题 */
.class-section-title {
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--primary-color);
  font-size: 24px;
  color: var(--text-primary);
}

/* 分类网格布局 */
.class-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

/* 分类项样式 */
.class-item {
  /* 去掉背景色 */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
}

.class-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

/* 分类项内容 */
.class-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  text-align: center;
}

/* 分类图标 */
.class-icon {
  font-size: 32px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.class-item:hover .class-icon {
  transform: scale(1.2) rotate(5deg);
}

/* 分类名称 */
.class-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.class-item:hover .class-name {
  color: var(--primary-color);
}

/* 暗黑模式适配 */
.dark .box-left,
.dark .box-right,
.dark .profile-container,
.dark .social-link,
.dark .stats,
.dark .announcement-section,
.dark .recent-updates {
  background: #1f2937;
  color: #f9fafb;
}

.dark .social-icon {
  background: #1f2937;
}

.dark .stat-label,
.dark .announcement-text,
.dark .updates-title,
.dark .class-section-title,
.dark .class-name,
.dark .article-title {
  color: #f9fafb;
}

.dark .stat-divider,
.dark .updates-header {
  background: #374151;
  border-bottom-color: #374151;
}

.dark .update-item {
  background-color: rgba(31, 41, 55, 0.8);
}

.dark .update-item:hover {
  background-color: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 3px 10px rgba(99, 102, 241, 0.15);
}

.dark .article-time {
  color: #9ca3af;
}

.dark .article-title:hover {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .box {
    flex-direction: column;
    padding: 10px;
  }

  .box-right {
    margin-top: 10px;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .class-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }

  .class-item-content {
    padding: 15px 10px;
  }

  .class-icon {
    font-size: 28px;
  }

  .class-name {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .class-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
