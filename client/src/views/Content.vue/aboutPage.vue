<template>
  <div class="about-page">
    <!-- 主内容区 - 网格布局 -->
    <div class="profile-container">
      <!-- 左侧区域 -->
      <div class="left-column">
        <!-- 个人信息卡片 -->
        <div class="card profile-card">
          <div class="avatar-container">
            <img src="@/assets/1.jpg" alt="个人头像" class="avatar">
            <span class="online-status"></span>
          </div>
          <div class="profile-info">
            <h2 class="profile-name">开发者自我介绍</h2>
            <p class="profile-title">全栈开发工程师</p>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="card contact-card">
          <div class="card-header">
            <svg class="card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l11.9 11.5a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <h3 class="card-title">联系方式</h3>
          </div>
          <div class="card-body">
            <div class="contact-grid" v-if="contactInfo && contactInfo.length > 0">
              <div class="contact-item" v-for="(item, index) in contactInfo" :key="item">
                <div class="contact-icon-container">
                  <span class="contact-icon">
                    {{ getContactIcon(index) }}
                  </span>
                </div>
                <span class="contact-text">{{ item }}</span>
              </div>
            </div>
            <div class="empty-state" v-else>
              <p class="empty-text">暂无联系方式</p>
              <p class="empty-subtext">联系方式信息正在完善中</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="right-column">
        <!-- 关于我 -->
        <div class="card about-card">
          <div class="card-header">
            <svg class="card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h3 class="card-title">关于我</h3>
          </div>
          <div class="card-body">
            <div v-if="aboutInfo && Object.keys(aboutInfo).length > 0">
              {{ aboutInfo }}
            </div>
            <div class="empty-state" v-else>
              <p class="empty-text">暂无个人介绍</p>
              <p class="empty-subtext">个人介绍正在完善中</p>
            </div>
          </div>
        </div>

        <!-- 已掌握的技术 -->
        <div class="card skills-card">
          <div class="card-header">
            <svg class="card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <h3 class="card-title">技术栈</h3>
          </div>
          <div class="card-body">
            <div class="tech-tags" v-if="techStack && techStack.length > 0">
              <span class="tag" v-for="item in techStack" :key="item">{{ item }}</span>
            </div>
            <div class="empty-state" v-else>
              <p class="empty-text">暂无技术栈信息</p>
              <p class="empty-subtext">技术栈信息正在完善中</p>
            </div>
          </div>
        </div>

        <!-- 兴趣爱好 -->
        <div class="card hobbies-card">
          <div class="card-header">
            <svg class="card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <h3 class="card-title">兴趣爱好</h3>
          </div>
          <div class="card-body">
            <ul class="hobby-list" v-if="hobbiesInfo && hobbiesInfo.length > 0">
              <li v-for="item in hobbiesInfo" :key="item">{{ item }}</li>
            </ul>
            <div class="empty-state" v-else>
              <p class="empty-text">暂无兴趣爱好信息</p>
              <p class="empty-subtext">兴趣爱好信息正在完善中</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAboutInfo } from '@/api/class'

const isDark = ref(false)
const aboutInfo = ref({})
const hobbiesInfo = ref({})

// 获取关于我信息
const getAbout = async () => {
  const res = await getAboutInfo(2)
  if (res.data.code === 201) {
    aboutInfo.value = res.data.data.about
  }
}
// 兴趣爱好
const getHobbies = async () => {
  const res = await getAboutInfo(3)
  if (res.data.code === 201) {
    hobbiesInfo.value = res.data.data.about.split(',')
  }
}
// 技术栈
const techStack = ref([])
const getTechStack = async () => {
  const res = await getAboutInfo(4)
  if (res.data.code === 201) {
    techStack.value = res.data.data.about.split(',')
  }
}
// 联系方式
const contactInfo = ref({})
const getContactInfo = async () => {
  const res = await getAboutInfo(5)
  if (res.data.code === 201) {
    contactInfo.value = res.data.data.about.split(',')
  }
}

// 获取联系方式图标
const getContactIcon = (index) => {
  const icons = ['✉️', '📞', '🌐', '📱', '💬', '🔗']
  return icons[index % icons.length]
}

onMounted(async () => {
  await getAbout()
  await getHobbies()
  await getTechStack()
  await getContactInfo()

  // 应用保存的主题
  const savedTheme = localStorage.getItem('appTheme')
  isDark.value = savedTheme === 'dark'
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 其他现有样式保持不变 */

/* 暂无数据状态样式 - 调整为更小巧的版本并移除图标相关样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  text-align: center;
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px dashed var(--border);
}

.empty-text {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--text);
}

.empty-subtext {
  font-size: 12px;
  opacity: 0.8;
}

/* 暗黑模式下的暂无数据样式 */
.dark .empty-state {
  background-color: rgba(114, 9, 183, 0.1);
  border-color: rgba(114, 9, 183, 0.3);
}

.dark .empty-text {
  color: var(--text);
}

/* 其他现有样式保持不变 */
</style>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  min-height: 100vh;
  overflow-x: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
  background-color: var(--bg-secondary, #f5f7fa);
  display: flex;
  justify-content: center;
  padding: 20px;
  color: var(--text, #1a202c);
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  width: 100%;
  max-width: 1200px;
}

/* 全局主题变量 */
:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #f72585;
  --text: #1a202c;
  --text-secondary: #4a5568;
  --bg: #ffffff;
  --bg-secondary: #f5f7fa;
  --border: #e2e8f0;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.12);
  --column-shadow-left: 2px 0 15px rgba(0, 0, 0, 0.05);
  --column-shadow-right: -2px 0 15px rgba(0, 0, 0, 0.05);
  --content-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 暗黑模式全局样式 */
.dark {
  --primary: #7209b7;
  --primary-light: #560bad;
  --secondary: #f72585;
  --text: #f8fafc;
  --text-secondary: #cbd5e0;
  --bg: #1a202c;
  --bg-secondary: #2d3748;
  --border: #4a5568;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  --card-shadow-hover: 0 8px 16px rgba(0, 0, 0, 0.3);
  --column-shadow-left: 2px 0 15px rgba(0, 0, 0, 0.2);
  --column-shadow-right: -2px 0 15px rgba(0, 0, 0, 0.2);
  --content-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* 暗黑模式下的滚动条样式 */
.dark ::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.dark ::-webkit-scrollbar-thumb {
  background: var(--border);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: var(--primary-light);
}
</style>

<style scoped>
/* 主容器 */
.about-page {
  width: 100%;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--content-shadow);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* 主内容区 - 网格布局 */
.profile-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  width: 100%;
  position: relative;
}

/* 左侧区域 */
.left-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;
  box-shadow: var(--column-shadow-left);
  border-radius: 12px;
  background-color: var(--bg);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* 右侧区域 */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px;
  box-shadow: var(--column-shadow-right);
  border-radius: 12px;
  background-color: var(--bg);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* 通用卡片样式 */
.card {
  background-color: var(--bg);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}
/* 卡片装饰效果 - 为左侧卡片添加左侧装饰条 */
.left-column .card {
  border-left: 4px solid var(--primary);
}

/* 卡片装饰效果 - 为右侧卡片添加左侧装饰条 */
.right-column .card {
  border-left: 4px solid var(--secondary);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.card-icon {
  color: var(--primary);
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
}

/* 右侧卡片头部颜色区分 */
.right-column .card-title {
  color: var(--secondary);
}

.right-column .card-icon {
  color: var(--secondary);
}

/* 个人信息卡片 */
.profile-card {
  text-align: center;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(67, 97, 238, 0.1);
}

/* 联系方式卡片特殊样式 */
.contact-card {
  box-shadow: 0 6px 18px rgba(67, 97, 238, 0.08);
}

/* 联系方式网格布局 */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 联系方式项样式 */
.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 联系方式图标容器 */
.contact-icon-container {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: rgba(67, 97, 238, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

/* 联系方式图标 */
.contact-icon {
  font-size: 20px;
  color: var(--primary);
}

/* 联系方式文本 */
.contact-text {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 联系方式悬停效果 */
.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.1);
  border-color: var(--primary-light);
}

.contact-item:hover .contact-icon-container {
  background-color: rgba(67, 97, 238, 0.2);
  transform: scale(1.05);
}

/* 暗黑模式下的联系方式 */
.dark .contact-item {
  background-color: rgba(114, 9, 183, 0.1);
  border: 1px solid rgba(114, 9, 183, 0.2);
}

.dark .contact-icon {
  color: #ffffff;
}

.dark .contact-icon-container {
  background-color: rgba(114, 9, 183, 0.2);
}

.dark .contact-item:hover {
  background-color: rgba(114, 9, 183, 0.2);
  box-shadow: 0 4px 12px rgba(114, 9, 183, 0.15);
  border-color: var(--primary);
}

.dark .contact-item:hover .contact-icon-container {
  background-color: rgba(114, 9, 183, 0.3);
}

/* 响应式调整 - 联系方式 */
@media (max-width: 768px) {
  .contact-grid {
    gap: 12px;
  }

  .contact-item {
    padding: 14px;
    gap: 12px;
  }

  .contact-icon-container {
    width: 36px;
    height: 36px;
  }

  .contact-icon {
    font-size: 16px;
  }

  .contact-text {
    font-size: 13px;
  }
}
/* 右侧内容卡片特殊样式 */
.about-card,
.skills-card,
.hobbies-card {
  box-shadow: 0 6px 18px rgba(247, 37, 133, 0.08);
}

/* 个人信息样式 */
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-light);
}

/* 关于我部分内容样式 */
.about-card .card-body {
  padding: 20px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.about-card .card-body p {
  margin: 0 0 16px 0;
}

.about-card .card-body p:last-child {
  margin-bottom: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .about-card .card-body {
    padding: 16px;
    font-size: 14px;
    line-height: 1.6;
  }
}

/* 技术标签 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  background-color: rgba(67, 97, 238, 0.1);
  color: var(--primary);
  border: 1px solid rgba(67, 97, 238, 0.2);
  display: inline-block;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tag::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: var(--primary);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.tag:hover {
  background-color: rgba(67, 97, 238, 0.2);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.1);
  border-color: var(--primary-light);
}

.tag:hover::before {
  transform: scaleY(1);
}

/* 暗黑模式下的技术标签 */
.dark .tag {
  background-color: rgba(114, 9, 183, 0.2);
  border: 1px solid rgba(114, 9, 183, 0.3);
  color: #ffffff;
}

.dark .tag:hover {
  background-color: rgba(114, 9, 183, 0.3);
  box-shadow: 0 4px 12px rgba(114, 9, 183, 0.2);
  border-color: var(--primary);
}

.dark .tag::before {
  background-color: var(--primary-light);
}

/* 兴趣爱好列表 - 新布局 */
.hobbies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.hobby-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.hobby-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--secondary);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s ease;
}

.hobby-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(247, 37, 133, 0.12);
  border-color: var(--secondary);
}

.hobby-item:hover::before {
  transform: scaleY(1);
}

.hobby-icon {
  color: var(--secondary);
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hobby-text {
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
}

/* 暗黑模式下的兴趣爱好项 */
.dark .hobby-item:hover {
  box-shadow: 0 8px 24px rgba(114, 9, 183, 0.2);
  border-color: var(--primary-light);
}

.dark .hobby-item::before {
  background-color: var(--primary-light);
}

.dark .hobby-icon {
  color: var(--primary-light);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hobbies-container {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .hobby-item {
    padding: 12px;
  }
}

/* 兴趣爱好列表 - 一行显示2个内容 */
.hobby-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.hobby-list li {
  position: relative;
  font-size: 14px;
  padding: 12px 16px 12px 36px;
  border-radius: 8px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  overflow: hidden;
}

.hobby-list li::before {
  content: '⭐';
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  z-index: 1;
}

.hobby-list li::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: var(--secondary);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.hobby-list li:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(247, 37, 133, 0.1);
  border-color: var(--secondary);
}

.hobby-list li:hover::after {
  transform: scaleY(1);
}

/* 暗黑模式下的兴趣爱好列表项 */
.dark .hobby-list li:hover {
  box-shadow: 0 4px 12px rgba(114, 9, 183, 0.2);
  border-color: var(--primary-light);
}

.dark .hobby-list li::after {
  background-color: var(--primary-light);
}

/* 确保响应式布局下小屏幕仍显示单列 */
@media (max-width: 768px) {
  .hobby-list {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  body {
    padding: 16px;
  }

  .about-page {
    padding: 16px;
  }

  .profile-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .left-column, .right-column {
    box-shadow: var(--card-shadow);
    padding: 12px;
  }

  .hobby-list {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .card {
    padding: 20px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-light);
}
</style>
