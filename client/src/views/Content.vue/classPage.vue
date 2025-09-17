<script setup>
import { ref, onMounted } from 'vue'

// 响应式引用，用于获取当前主题状态
const isDark = ref(false)

// 页面加载时检查主题状态
onMounted(() => {
  const savedTheme = localStorage.getItem('appTheme')
  isDark.value = savedTheme === 'dark'
})
</script>
<template>
  <div class="box">
    <div class="box-left">
      classPage
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
              <span class="stat-number">24</span>
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
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" class="social-icon">
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
          <svg class="update-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <h3 class="updates-title">最近更新</h3>
        </div>
        <div class="updates-list">
          <!-- 文章1 -->
          <div class="update-item">
            <a href="#" class="article-title">Vue 3 组合式API实战指南：从入门到精通</a>
            <span class="article-time">2023-10-15</span>
          </div>
          <!-- 文章2 -->
          <div class="update-item">
            <a href="#" class="article-title">React Server Components：未来前端架构的新方向</a>
            <span class="article-time">2023-10-10</span>
          </div>
          <!-- 文章3 -->
          <div class="update-item">
            <a href="#" class="article-title">TypeScript高级类型系统：提升代码质量的秘诀</a>
            <span class="article-time">2023-10-05</span>
          </div>
          <!-- 文章4 -->
          <div class="update-item">
            <a href="#" class="article-title">Node.js微服务架构设计与实践</a>
            <span class="article-time">2023-09-28</span>
          </div>
          <!-- 文章5 -->
          <div class="update-item">
            <a href="#" class="article-title">AI辅助编程：提升开发效率的新工具</a>
            <span class="article-time">2023-09-20</span>
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

/* 暗黑模式下个人信息容器样式 */
.dark .profile-container {
  background: #1f2937;
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
}

/* 暗黑模式适配 */
.dark .box-left,
.dark .box-right {
  background: #1f2937;
  color: #f9fafb;
}

.dark .social-link {
  background: rgba(31, 41, 55, 0.7);
  color: #f9fafb;
}

.dark .stats {
  background: rgba(31, 41, 55, 0.7);
}

.dark .stat-label {
  color: #f9fafb;
}

.dark .stat-divider {
  background: #374151;
}

.dark .social-icon {
  background: #1f2937;
}

.dark .profile-container {
  color: #f9fafb;
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

.announcement-text:last-child {
  margin-bottom: 0;
}

/* 暗黑模式下公告样式 */
.dark .announcement-section {
  background: rgba(31, 41, 55, 0.7);
}

.dark .announcement-text {
  color: #f9fafb;
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
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.update-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.update-item:last-child {
  border-bottom: none;
}

.article-title {
  font-size: 14px;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
  line-height: 1.4;
}

.article-title:hover {
  color: var(--primary-color);
}

.article-time {
  font-size: 12px;
  color: #9ca3af;
}

/* 暗黑模式下最近更新样式 */
.dark .recent-updates {
  background: rgba(31, 41, 55, 0.7);
}

.dark .updates-header {
  border-bottom-color: #374151;
}

.dark .updates-title {
  color: #f9fafb;
}

.dark .update-item {
  border-bottom-color: rgba(255, 255, 255, 0.05);
}

.dark .article-title {
  color: #f9fafb;
}

.dark .article-time {
  color: #9ca3af;
}

.dark .article-title:hover {
  color: var(--primary-color);
}
</style>
