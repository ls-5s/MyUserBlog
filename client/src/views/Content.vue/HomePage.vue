<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getArticleCount, getAboutInfo, getLatestArticles, getArticleList } from '@/api/class'
import { formatDate } from '@/utils/format'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 添加暗黑模式状态管理
const isDarkMode = ref(false)

// 初始化暗黑模式
const initDarkMode = () => {
  // 检查本地存储和系统偏好
  const savedMode = localStorage.getItem('darkMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (savedMode !== null) {
    isDarkMode.value = savedMode === 'true'
  } else {
    isDarkMode.value = prefersDark
  }

  updateDarkMode()
}

// 更新暗黑模式样式
const updateDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  // 保存模式到本地存储
  localStorage.setItem('darkMode', isDarkMode.value.toString())
}

// 切换暗黑模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  updateDarkMode()
}

// 监听暗黑模式变化
watch(isDarkMode, updateDarkMode)

// 现有代码...
const count = ref('')
const animatedCount = ref(0)
const readingCount = ref(0)
const getCount = async () => {
  const res = await getArticleCount()
  if (res.data.code === 201) {
    count.value = res.data.data
    // 触发数字动画
    animateNumber(animatedCount, 0, Number(res.data.data), 1500)
  }
}
// 公告
const notice = ref('')
const getNotice = async () => {
  const res = await getAboutInfo(1)
  if (res.data.code === 201) {
    notice.value = res.data.data.about
  }
}
// 最近更新
const update = ref([{ title: '', createTime: '' }])
const getUpdate = async () => {
  const res = await getLatestArticles()
  if (res.data.code === 201) {
    update.value = res.data.data

  }
}

const queryid = async (id) => {
  await router.push('/layout/article?id=' + id)
}
// 分页相关数据
const total = ref(0); // 初始化为0
const currentPage = ref(1);
const pageSize = ref(7); // 每页最多7条数据
const list = ref([])
// 获取文章列表
const fetchArticleList = async () => {
  try {
    const res = await getArticleList({ username: 'liyang' })
    list.value = res.data.articles || [];
    total.value = list.value.length; // 同步更新总数
    // 为文章项添加随机延迟的渐入动画
    setTimeout(() => {
      document.querySelectorAll('.article-card').forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        }, index * 100)
      })
    }, 100)
  } catch (error) {
    console.error('获取文章列表失败:', error);
    ElMessage.error('获取文章列表失败');
  }
}
// 计算当前页显示的文章数据
const articles = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return list.value.slice(startIndex, endIndex);
});
// 处理页码变更
const handleCurrentChange = (val) => {
  currentPage.value = val;
  // 为新加载的文章添加渐入动画
  setTimeout(() => {
    document.querySelectorAll('.article-card').forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      setTimeout(() => {
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 100)
    })
  }, 100)
};
// 数字增长动画函数
const animateNumber = (ref, start, end, duration) => {
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    // 使用easeOutQuad缓动函数使动画更自然
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    ref.value = Math.floor(easeProgress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      ref.value = end;
    }
  };
  window.requestAnimationFrame(step);
};
// 监听滚动事件，实现滚动动画
const handleScrollAnimation = () => {
  const elements = document.querySelectorAll('.scroll-animate')
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    if (elementTop < windowHeight * 0.85) {
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }
  })

  // 添加滚动时的视差效果
  const scrollY = window.scrollY;
  const particles = document.querySelectorAll('#particles-container div');
  particles.forEach((particle, index) => {
    // 根据索引和滚动距离创建不同的视差效果
    const speed = 0.02 + (index % 3) * 0.01;
    particle.style.transform = `translateY(${scrollY * speed}px)`;
  });
};

// 添加滚动事件监听
onMounted(() => {
  // 初始化暗黑模式
  initDarkMode()
  // 页面载入时的淡入效果
  document.body.style.opacity = '1'
  getCount()
  getNotice()
  getUpdate()
  fetchArticleList()
  // 启动阅读量数字动画
  setTimeout(() => {
    animateNumber(readingCount, 0, 111, 1800)
  }, 500)
  // 添加滚动事件监听
  window.addEventListener('scroll', handleScrollAnimation)
  // 初始化滚动动画
  handleScrollAnimation()
  // 创建背景粒子效果
  createBackgroundParticles()
  // 添加新的初始化动画
  initPageAnimations();
})
// 创建背景粒子效果
const createBackgroundParticles = () => {
  // 检查是否已有粒子容器
  if (document.getElementById('particles-container')) return
  const container = document.createElement('div')
  container.id = 'particles-container'
  container.style.position = 'fixed'
  container.style.top = '0'
  container.style.left = '0'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.pointerEvents = 'none'
  container.style.zIndex = '-1'
  document.body.appendChild(container)
  // 创建更多粒子并增加颜色变化
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div')
    // 随机大小、位置和透明度
    const size = Math.random() * 5 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    const opacity = Math.random() * 0.5 + 0.1
    const delay = Math.random() * 5

    // 随机颜色 - 使用主色调的变体
    const colors = ['#1890ff', '#722ed1', '#eb2f96', '#52c41a'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // 设置样式
    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '50%',
      left: `${x}%`,
      top: `${y}%`,
      opacity: opacity,
      animation: `float ${Math.random() * 10 + 10}s ease-in-out ${delay}s infinite`,
      boxShadow: `0 0 ${size * 3}px ${color}40` // 添加发光效果
    })
    container.appendChild(particle)
  }
}

// 添加鼠标跟踪效果函数
const createMouseTrail = () => {
  // 仅在桌面设备添加鼠标跟踪
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      // 创建鼠标尾迹粒子
      const trailParticle = document.createElement('div');
      trailParticle.classList.add('mouse-trail');
      trailParticle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #1890ff, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 4}px;
        top: ${e.clientY - 4}px;
        opacity: 0.7;
        animation: trail-fade 1s ease-out forwards;
      `;
      document.body.appendChild(trailParticle);

      // 移除已完成动画的粒子
      setTimeout(() => {
        trailParticle.remove();
      }, 1000);
    });
  }
};

// 添加页面加载时的初始化动画
const initPageAnimations = () => {
  // 添加鼠标跟踪效果
  createMouseTrail();

  // 添加全局CSS变量，用于主题切换动画
  document.documentElement.style.setProperty('--primary-color', '#1890ff');
  document.documentElement.style.setProperty('--secondary-color', '#722ed1');
};

// 原有的onMounted已整合到上面
</script>
<template>
  <div class="box">
    <!-- 暗黑模式切换按钮 -->
    <button class="dark-mode-toggle" @click="toggleDarkMode" :class="{ 'dark': isDarkMode }" title="切换暗黑模式">
      <span v-if="!isDarkMode" class="sun-icon">☀️</span>
      <span v-else class="moon-icon">🌙</span>
    </button>

    <div class="left">
      <div class="content">
        <!-- 左侧顶部装饰 -->
        <div class="left-decoration"></div>

        <!-- 文章列表 - 使用框框布局 -->
        <div class="article-list">
          <div v-for="article in articles" :key="article.id" class="article-card">
            <div class="article-info" @click="queryid(article.id)">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-date">{{ formatDate(article.createTime) }}</p>
              <p class="article-type">{{ article.type }}</p>
              <!-- 添加阅读量信息 -->
              <!-- <div class="article-meta">
                <span class="read-count">{{ Math.floor(Math.random() * 500) + 100 }} 阅读</span>
                <span class="comment-count">{{ Math.floor(Math.random() * 20) }} 评论</span>
              </div> -->
            </div>
            <!-- 添加文章卡片的装饰元素 -->
            <div class="article-decoration"></div>
          </div>
        </div>

        <!-- 分页组件 -->
        <div class="pagination-container">
          <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
            :page-size="pageSize" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-top scroll-animate">
        <!-- 装饰性元素 -->
        <div class="right-top-decoration"></div>

        <div class="right-img">
          <img src="@/assets/1.jpg" alt="头像" class="avatar-image">
          <!-- 头像悬停效果遮罩 -->
          <div class="avatar-overlay">
            <div class="avatar-edit-indicator">👤</div>
          </div>
        </div>

        <!-- 优化后的个人信息区域 -->
        <div class="profile-info">
          <h3 class="profile-title">全栈工程师</h3>
          <!-- 简短介绍 -->
          <p class="profile-description">热爱技术，分享前端开发经验</p>

          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-number">{{ animatedCount }}</div>
              <div class="stat-label">文章数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ readingCount }}</div>
              <div class="stat-label">阅读量</div>
            </div>
          </div>
        </div>

        <div class="right-top-bottom">
          <a href="https://github.com/" target="_blank" class="social-link">
            <span class="social-icon">
              <img src="@/assets/3.png" alt="GitHub">
            </span>
            <span class="social-text">GitHub</span>
          </a>
          <a href="https://juejin.cn/user/2813031236510796/posts" target="_blank" class="social-link">
            <span class="social-icon">
              <img src="@/assets/2.png" alt="掘金">
            </span>
            <span class="social-text">掘金</span>
          </a>
        </div>
      </div>

      <!-- 保持原有的其他内容不变 -->
      <!-- 公告区域 - 优化版 -->
      <div class="right-z-top scroll-animate">
        <div class="notice-header">
          <span class="notice-icon">📢</span>
          <h4 class="notice-title">公告</h4>
        </div>
        <div class="notice-content">
          {{ notice || '暂无公告信息' }}
        </div>
      </div>
      <div class="right-bottom scroll-animate">
        <div class="update-header">
          <i class="update-icon">📅</i>
          <h4 class="update-title">最近更新</h4>
        </div>
        <div class="update-list">
          <a v-for="item in update" :key="item.id" href="#" class="update-item">
            <div class="update-content" @click="queryid(item.id)">
              <div class="update-title-text">{{ item.title }}</div>
              <div class="update-time">{{ formatDate(item.createTime) }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 全局样式重置与基础设置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 页面载入淡入动画 */
body {
  opacity: 0;
  transition: opacity 0.8s ease-out;
  background-color: #f8f9fa;
}

/* 暗黑模式切换按钮 */
.dark-mode-toggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #ffffff;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.dark-mode-toggle.dark {
  background-color: #2d3748;
  color: #e2e8f0;
}

/* 暗黑模式基础样式 */
.dark body {
  background-color: #1a202c;
}

.box {
  min-height: 100vh;
  width: 1600px;
  margin: 0 auto;
  display: flex;
  padding: 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 左侧文章列表区域样式 */
.left {
  flex: 6;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  position: relative;
  overflow: hidden;
}

/* 暗黑模式下左侧区域样式 */
.dark .left {
  background-color: #2d3748;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 左侧区域装饰效果 */
.left::after {
  content: '';
  position: absolute;
  top: -10%;
  right: -10%;
  width: 40%;
  height: 40%;
  background: radial-gradient(circle, rgba(24, 144, 255, 0.03), transparent 70%);
  border-radius: 50%;
  z-index: 0;
}

.dark .left::after {
  background: radial-gradient(circle, rgba(24, 144, 255, 0.08), transparent 70%);
}

/* 新增左侧装饰元素 */
.left-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #1890ff, #722ed1, #eb2f96, #52c41a);
  border-radius: 12px 12px 0 0;
  z-index: 10;
}

.classPage {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.dark .classPage {
  color: #e2e8f0;
}

/* 左侧文章列表区域样式 */
.content {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  z-index: 1;
}

/* 文章列表样式 */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}

/* 文章卡片样式 - 增强版 */
.article-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* 暗黑模式下文章卡片样式 */
.dark .article-card {
  background: #374151;
  border-color: #4b5563;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 卡片悬浮效果 - 增强版 */
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.06);
  border-color: #1890ff;
}

.dark .article-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* 卡片装饰条 */
.article-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #1890ff, #722ed1);
  border-radius: 16px 0 0 16px;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.article-card:hover::before {
  transform: scaleY(1);
}

/* 文章装饰元素 */
.article-decoration {
  width: 100px;
  height: 100px;
  position: relative;
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.article-card:hover .article-decoration {
  opacity: 0.2;
}

.article-decoration::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed #1890ff;
  animation: rotate 15s linear infinite;
}

.dark .article-decoration::before {
  border-color: #4299e1;
}

/* 文章信息样式 */
.article-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
  flex: 1;
}

/* 文章标题样式 */
.article-title {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  line-height: 1.4;
  margin: 0;
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.dark .article-title {
  color: #e2e8f0;
}

.article-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #1890ff, #722ed1);
  transition: width 0.3s ease;
}

.article-card:hover .article-title {
  color: #1890ff;
}

.dark .article-card:hover .article-title {
  color: #60a5fa;
}

.article-card:hover .article-title::after {
  width: 100%;
}

/* 文章日期样式 */
.article-date {
  font-size: 14px;
  color: #999;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dark .article-date {
  color: #a0aec0;
}

.article-date::before {
  content: '📅';
}

/* 文章类型样式 */
.article-type {
  font-size: 14px;
  color: #666;
  margin: 0;
  padding: 4px 12px;
  background-color: #f0f2f5;
  border-radius: 16px;
  width: fit-content;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dark .article-type {
  color: #cbd5e0;
  background-color: #4a5568;
}

.article-type::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(24, 144, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.article-card:hover .article-type {
  background-color: #e6f7ff;
  color: #1890ff;
}

.dark .article-card:hover .article-type {
  background-color: #2d3748;
  color: #60a5fa;
}

.dark .article-card:hover .article-type::after {
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.2), transparent);
}

.article-card:hover .article-type::after {
  left: 100%;
}

/* 文章元信息样式 */
.article-meta {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.read-count,
.comment-count {
  font-size: 13px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s ease;
}

.dark .read-count,
.dark .comment-count {
  color: #a0aec0;
}

.read-count::before {
  content: '👁️';
}

.comment-count::before {
  content: '💬';
}

.article-card:hover .read-count,
.article-card:hover .comment-count {
  color: #1890ff;
}

.dark .article-card:hover .read-count,
.dark .article-card:hover .comment-count {
  color: #60a5fa;
}

/* 分页容器样式 */
.pagination-container {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark .pagination-container {
  border-top-color: #4a5568;
}

/* 为Element Plus分页按钮添加动画效果 */
:deep(.el-pagination__item) {
  transition: all 0.3s ease;
}

:deep(.el-pagination__item:hover:not(.is-disabled)) {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
}

.dark :deep(.el-pagination__item:hover:not(.is-disabled)) {
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.3);
}

:deep(.el-pagination__item.is-active) {
  transform: scale(1.1);
  box-shadow: 0 2px 10px rgba(24, 144, 255, 0.3);
}

.dark :deep(.el-pagination__item.is-active) {
  box-shadow: 0 2px 10px rgba(96, 165, 250, 0.4);
  background-color: #4299e1;
  border-color: #4299e1;
}

/* 暗黑模式下分页按钮文字颜色 */
.dark :deep(.el-pagination__item) {
  color: #cbd5e0;
  border-color: #4a5568;
  background-color: #2d3748;
}

/* 右侧区域样式 */
.right {
  margin-left: 30px;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 滚动动画类 */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* 右侧顶部区域 - 增强版 */
.right-top {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dark .right-top {
  background-color: #2d3748;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* 装饰性背景元素 */
.right-top-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(24, 144, 255, 0.05), transparent 60%);
  z-index: 0;
}

.dark .right-top-decoration {
  background: radial-gradient(circle at top right, rgba(96, 165, 250, 0.1), transparent 60%);
}

/* 渐变顶部边框 */
.right-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #1890ff, #722ed1, #eb2f96);
  border-radius: 16px 16px 0 0;
  z-index: 1;
}

/* 卡片悬浮效果 */
.right-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06);
}

.dark .right-top:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* 头像样式优化 */
.right-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 4px solid #f8f9fa;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  animation: pulse-soft 3s ease-in-out infinite;
}

.dark .right-img {
  border-color: #4a5568;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* 头像悬停效果 */
.right-img:hover {
  border-color: #1890ff;
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 25px rgba(24, 144, 255, 0.25);
}

.dark .right-img:hover {
  border-color: #60a5fa;
  box-shadow: 0 8px 25px rgba(96, 165, 250, 0.35);
}

/* 头像图片 */
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.right-img:hover .avatar-image {
  transform: scale(1.1);
}

/* 头像遮罩 */
.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.right-img:hover .avatar-overlay {
  opacity: 1;
}

/* 个人信息样式优化 */
.profile-info {
  width: 100%;
  margin: 10px 0 20px 0;
  position: relative;
  z-index: 2;
}

/* 标题样式 */
.profile-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
  background: linear-gradient(90deg, #1890ff, #722ed1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .profile-title {
  background: linear-gradient(90deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 个人描述 */
.profile-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.dark .profile-description {
  color: #a0aec0;
}

/* 统计数据容器 */
.stats-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 16px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
}

.dark .stats-container {
  background-color: #4a5568;
  border-color: #2d3748;
}

/* 统计项 */
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dark .stat-item {
  background-color: #2d3748;
}

/* 统计项装饰 */
.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #1890ff, #722ed1);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.dark .stat-item::before {
  background: linear-gradient(90deg, #60a5fa, #a78bfa);
}

/* 统计项悬浮效果 */
.stat-item:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.dark .stat-item:hover {
  background-color: #374151;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.stat-item:hover::before {
  transform: scaleX(1);
}

/* 统计数字和标签 */
.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #1890ff;
  margin-bottom: 4px;
}

.dark .stat-number {
  color: #60a5fa;
}

.stat-label {
  font-size: 12px;
  color: #999;
  text-align: center;
}

.dark .stat-label {
  color: #a0aec0;
}

/* 社交媒体链接 */
.right-top-bottom {
  display: flex;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 2;
  width: 100%;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #f8f9fa;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
}

.dark .social-link {
  background-color: #4a5568;
  color: #cbd5e0;
}

.social-link:hover {
  background-color: #e6f7ff;
  color: #1890ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

.dark .social-link:hover {
  background-color: #2d3748;
  color: #60a5fa;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.25);
}

.social-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.dark .social-icon img {
  filter: grayscale(100%) brightness(150%);
}

.social-link:hover .social-icon img {
  filter: grayscale(0%);
}

.dark .social-link:hover .social-icon img {
  filter: grayscale(0%) brightness(100%);
}

/* 公告区域样式 */
.right-z-top {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
}

.dark .right-z-top {
  background-color: #2d3748;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.notice-icon {
  font-size: 18px;
}

.notice-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.dark .notice-title {
  color: #e2e8f0;
}

.notice-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  position: relative;
}

.dark .notice-content {
  color: #a0aec0;
  background-color: #4a5568;
}

/* 最近更新区域样式 */
.right-bottom {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.dark .right-bottom {
  background-color: #2d3748;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.update-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.update-icon {
  font-size: 18px;
}

.update-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.dark .update-title {
  color: #e2e8f0;
}

.update-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.update-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.dark .update-item {
  background-color: #4a5568;
}

.update-item:hover {
  background-color: #e6f7ff;
  transform: translateX(8px);
  border-left-color: #1890ff;
}

.dark .update-item:hover {
  background-color: #374151;
  border-left-color: #60a5fa;
}

.update-content {
  flex: 1;
  min-width: 0;
}

.update-title-text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.dark .update-title-text {
  color: #e2e8f0;
}

.update-time {
  font-size: 12px;
  color: #999;
}

.dark .update-time {
  color: #a0aec0;
}

.update-arrow {
  font-size: 14px;
  color: #999;
  transition: all 0.3s ease;
}

.update-item:hover .update-arrow {
  color: #1890ff;
  transform: translateX(4px);
}

.dark .update-item:hover .update-arrow {
  color: #60a5fa;
}

/* 动画效果定义 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes pulse-soft {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.03);
  }
}

@keyframes trail-fade {
  from {
    opacity: 0.7;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.5);
  }
}

/* 响应式适配 */
@media (max-width: 1700px) {
  .box {
    width: 95%;
  }
}

@media (max-width: 1200px) {
  .box {
    flex-direction: column;
    gap: 20px;
  }

  .right {
    margin-left: 0;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .right-top,
  .right-z-top,
  .right-bottom {
    flex: 1;
    min-width: 300px;
  }
}

@media (max-width: 768px) {
  .box {
    padding: 10px;
  }

  .left,
  .right-top,
  .right-z-top,
  .right-bottom {
    padding: 16px;
  }

  .article-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-decoration {
    display: none;
  }

  .right {
    flex-direction: column;
  }

  .dark-mode-toggle {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

/* 暗黑模式下的动画和过渡效果增强 */
.dark .article-card,
.dark .right-top,
.dark .right-z-top,
.dark .right-bottom {
  transition: all 0.4s ease;
}

/* 暗黑模式下鼠标尾迹效果 */
.dark .mouse-trail {
  background: radial-gradient(circle, #60a5fa, transparent 70%);
}

/* 暗黑模式下背景粒子效果增强 */
.dark #particles-container div {
  opacity: 0.2;
}
</style>
