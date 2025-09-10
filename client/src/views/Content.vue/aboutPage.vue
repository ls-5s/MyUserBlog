<template>
  <div class="personal-intro">
    <!-- 页面背景 -->
    <div class="intro-bg"></div>

    <!-- 主容器 -->
    <div class="intro-container">
      <!-- 左侧内容区 -->
      <div class="intro-left">
        <!-- 个人信息卡片 -->
        <div class="info-card">
          <div class="avatar-wrapper">
            <img
              src="@/assets/1.jpg"
              alt="个人头像"
              class="personal-avatar"
            >
            <div class="avatar-border"></div>
          </div>

          <div class="basic-info">
            <h1 class="my-name">开发者自我介绍</h1>
            <p class="my-title">全栈开发工程师</p>
          </div>
        </div>

        <!-- 联系信息卡片 -->
        <div class="contact-card">
          <h3 class="section-title">联系方式</h3>
          <div class="contact-item">
            <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span class="contact-text">QQ: 2408224899</span>
          </div>
        </div>
      </div>

      <!-- 右侧内容区 -->
      <div class="intro-right">
        <!-- 个人介绍 -->
        <section class="intro-section">
          <div class="section-header">
            <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <h2 class="section-title">关于我</h2>
          </div>
          <div class="section-content">
            <p class="intro-paragraph">
              你好，我是一名对技术充满热情的开发者。我热衷于通过代码解决实际问题，并不断探索新的技术领域来提升自己的能力。
            </p>
            <p class="intro-paragraph">
              在我的开发历程中，我积累了丰富的前后端开发经验，尤其在Vue.js生态系统方面有着深入的了解。我善于将复杂的业务需求转化为清晰、可维护的代码结构，并且始终关注用户体验的提升。
            </p>
            <p class="intro-paragraph">
              我相信技术的价值在于解决实际问题，因此我始终保持着学习的态度，关注行业的最新动态，并乐于分享我的知识和经验。
            </p>
          </div>
        </section>

        <!-- 技术栈 -->
        <section class="intro-section">
          <div class="section-header">
            <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <h2 class="section-title">技术栈</h2>
          </div>
          <div class="section-content">
            <!-- 已掌握技术 -->
            <div class="tech-category">
              <h3 class="tech-title">已掌握的技术</h3>
              <div class="tech-tags">
                <span class="tech-tag">HTML</span>
                <span class="tech-tag">CSS</span>
                <span class="tech-tag">JavaScript</span>
                <span class="tech-tag">Vue 2</span>
                <span class="tech-tag">Vue 3</span>
                <span class="tech-tag">Git</span>
                <span class="tech-tag">Axios</span>
                <span class="tech-tag">Uniapp</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">Express</span>
                <span class="tech-tag">TypeORM</span>
                <span class="tech-tag">C/C++</span>
              </div>
            </div>

            <!-- 学习中的技术 -->
            <div class="tech-category">
              <h3 class="tech-title">学习中的技术</h3>
              <div class="tech-tags">
                <span class="tech-tag learning">TypeScript</span>
                <span class="tech-tag learning">TailwindCSS</span>
                <span class="tech-tag learning">Nest.js</span>
                <span class="tech-tag learning">React</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 兴趣爱好 -->
        <section class="intro-section">
          <div class="section-header">
            <svg class="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <h2 class="section-title">兴趣爱好</h2>
          </div>
          <div class="section-content">
            <ul class="hobbies-list">
              <li class="hobby-item">阅读技术书籍和博客文章</li>
              <li class="hobby-item">关注前端和后端技术的最新发展趋势</li>
              <li class="hobby-item">参与开源项目开发和贡献</li>
              <li class="hobby-item">解决编程挑战和算法问题</li>
              <li class="hobby-item">分享技术知识和开发经验</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础变量 */
:root {
  --primary-color: #4f46e5;
  --primary-light: #818cf8;
  --primary-dark: #4338ca;
  --secondary-color: #ec4899;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --text-tertiary: #9ca3af;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --border-color: #e5e7eb;
  --transition: all 0.3s ease;
}

/* 暗黑模式适配 */
:deep(.dark) {
  --primary-color: #818cf8;
  --primary-light: #a5b4fc;
  --primary-dark: #6366f1;
  --secondary-color: #f472b6;
  --text-primary: #f3f4f6;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --bg-tertiary: #374151;
  --border-color: #374151;
}

/* 全局样式 */
.personal-intro {
  margin-top: 60px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

/* 背景效果 */
.intro-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.05) 0%, rgba(236, 72, 153, 0.05) 90%);
  z-index: 0;
}

/* 主容器 */
.intro-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  align-items: start;
}

/* 左侧内容 */
.intro-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 信息卡片 */
.info-card {
  background-color: var(--bg-primary);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: var(--transition);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.avatar-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
}

.personal-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

.avatar-border {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) border-box;

  mask-composite: exclude;
  z-index: 1;
}

.basic-info .my-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.basic-info .my-title {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 联系卡片 */
.contact-card {
  background-color: var(--bg-primary);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
}

/* 右侧内容 */
.intro-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 通用区块样式 */
.intro-section {
  background-color: var(--bg-primary);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.intro-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* 区块头部 */
.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color);
}

.section-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* 区块内容 */
.section-content {
  color: var(--text-secondary);
  line-height: 1.7;
}

/* 介绍段落 */
.intro-paragraph {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.intro-paragraph:last-child {
  margin-bottom: 0;
}

/* 技术分类 */
.tech-category {
  margin-bottom: 1.5rem;
}

.tech-category:last-child {
  margin-bottom: 0;
}

.tech-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: rgba(79, 70, 229, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(79, 70, 229, 0.2);
  transition: var(--transition);
}

.tech-tag:hover {
  background-color: var(--primary-color);
  color: #1f2937;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
}

/* 针对暗黑模式单独设置 */
:deep(.dark) .tech-tag:hover {
  background-color: rgba(79, 70, 229, 0.1);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}
.tech-tag.learning {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-style: dashed;
}

.tech-tag.learning:hover {
  background-color: rgba(239, 68, 68, 0.2);
  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
}

/* 兴趣爱好列表 */
.hobbies-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hobby-item {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: 1rem;
}

.hobby-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--primary-color);
  border-radius: 50%;
}

/* 联系信息项 */
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
}

.contact-icon {
  color: var(--primary-color);
  flex-shrink: 0;
}

.contact-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .intro-container {
    grid-template-columns: 1fr;
  }

  .intro-left {
    order: 2;
  }

  .intro-right {
    order: 1;
  }

  .avatar-wrapper {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 640px) {
  .intro-container {
    padding: 1rem;
  }

  .info-card {
    padding: 1.5rem;
  }

  .basic-info .my-name {
    font-size: 1.3rem;
  }

  .section-header {
    padding-bottom: 0.75rem;
  }

  .section-title {
    font-size: 1.15rem;
  }

  .tech-tags {
    gap: 0.4rem;
  }

  .tech-tag {
    padding: 0.35rem 0.7rem;
    font-size: 0.8125rem;
  }
}
</style>
