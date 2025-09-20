<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getArticleCount, getAboutInfo, getLatestArticles, getArticleList } from '@/api/class'
import { formatDate } from '@/utils/format'
import { ElMessage } from 'element-plus'
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
}
// 添加滚动事件监听
onMounted(() => {
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
  // 创建20个粒子
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div')
    // 随机大小、位置和透明度
    const size = Math.random() * 5 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    const opacity = Math.random() * 0.5 + 0.1
    const delay = Math.random() * 5
    // 设置样式
    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: '#1890ff',
      borderRadius: '50%',
      left: `${x}%`,
      top: `${y}%`,
      opacity: opacity,
      animation: `float ${Math.random() * 10 + 10}s ease-in-out ${delay}s infinite`
    })
    container.appendChild(particle)
  }
}
</script>
<template>
  <div class="box">
    <div class="left">
      <div class="content">
        <!-- 文章列表 - 使用框框布局 -->
        <div class="article-list">
          <div v-for="article in articles" :key="article.id" class="article-card">
            <div class="article-info">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-date">{{ formatDate(article.createTime) }}</p>
              <p class="article-type">{{ article.type }}</p>
            </div>
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
            <div class="update-content">
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

.classPage {
  font-size: 20px;
  font-weight: 600;
  color: #333;
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

/* 文章卡片样式 */
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
}

/* 卡片悬浮效果 */
.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.06);
  border-color: #1890ff;
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

/* 文章信息样式 */
.article-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
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

.article-card:hover .article-type::after {
  left: 100%;
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
}

/* 头像悬停效果 */
.right-img:hover {
  border-color: #1890ff;
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 25px rgba(24, 144, 255, 0.25);
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

/* 个人描述 */
.profile-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
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

/* 统计项悬浮效果 */
.stat-item:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.stat-item:hover::before {
  transform: scaleX(1);
}

/* 统计数字 */
.stat-number {
  font-size: 26px;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
  background: linear-gradient(90deg, #1890ff, #722ed1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 统计标签 */
.stat-label {
  font-size: 13px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* 社交媒体链接样式优化 */
.right-top-bottom {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  justify-content: center;
  position: relative;
  z-index: 2;
}

/* 社交链接基础样式 */
.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  color: #666;
  text-decoration: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid #e8e8e8;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.05), -2px -2px 6px rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

/* 社交图标 */
.social-icon img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
  background: #fff;
  padding: 2px;
}

/* 社交链接悬浮效果 */
.social-link:hover {
  background: linear-gradient(145deg, #1890ff, #722ed1);
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(24, 144, 255, 0.3);
  border-color: #1890ff;
}

.social-link:hover .social-icon img {
  transform: scale(1.2) rotate(5deg);
  background: #fff;
}

/* 公告区域 - 优化版 */
.right-z-top {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

/* 卡片悬浮效果 */
.right-z-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

/* 装饰性背景 */
.right-z-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ff9a9e, #fad0c4);
  border-radius: 16px 16px 0 0;
}

/* 公告头部 */
.notice-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f8f9fa;
  position: relative;
}

/* 公告图标 */
.notice-icon {
  font-size: 20px;
  animation: pulse 2s infinite;
}

/* 图标脉冲动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

/* 公告标题 */
.notice-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
  padding: 0;
  border: none;
  background: linear-gradient(90deg, #ff758c, #ff7eb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 公告内容 */
.notice-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  padding: 8px 12px;
  background-color: #fff5f5;
  border-radius: 8px;
  border-left: 3px solid #ff758c;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

/* 内容悬浮效果 */
.notice-content:hover {
  background-color: #fff0f0;
  transform: translateX(4px);
}

/* 装饰性点缀 */
.notice-content::after {
  content: '';
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #ff758c 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.2;
  z-index: -1;
}

/* 最近更新区域 - 优化版 */
.right-bottom {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.04);
  flex-grow: 1;
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 卡片悬浮效果 */
.right-bottom:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

/* 装饰性顶部边框 */
.right-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #52c41a, #1890ff);
  border-radius: 16px 16px 0 0;
}

/* 更新标题区域 */
.update-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  position: relative;
}

/* 更新图标 */
.update-icon {
  font-size: 20px;
  animation: pulse 2s infinite;
}

/* 图标脉冲动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

/* 更新标题文本 */
.update-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
  background: linear-gradient(90deg, #52c41a, #1890ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 更新列表 */
.update-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 更新条目 */
.update-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background-color: #fafafa;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

/* 条目装饰性元素 */
.update-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #52c41a, #1890ff);
  border-radius: 12px 0 0 12px;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

/* 条目悬浮效果 */
.update-item:hover {
  background-color: #ffffff;
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-color: #e6f7ff;
}

.update-item:hover::before {
  transform: scaleY(1);
}

/* 条目内容 */
.update-content {
  flex: 1;
  min-width: 0;
}

/* 文章标题 */
.update-title-text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
}

.update-item:hover .update-title-text {
  color: #1890ff;
}

/* 创建时间 */
.update-time {
  font-size: 12px;
  color: #999;
  font-weight: 400;
}

/* 箭头图标 */
.update-arrow {
  font-size: 14px;
  color: #ccc;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.update-item:hover .update-arrow {
  color: #1890ff;
  transform: translateX(3px);
}

/* 空状态样式 */
.update-list:empty::after {
  content: '暂无更新内容';
  display: block;
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}

/* 粒子浮动动画 */
@keyframes float {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  25% {
    transform: translateY(-15px) translateX(5px);
  }

  50% {
    transform: translateY(0) translateX(10px);
  }

  75% {
    transform: translateY(15px) translateX(5px);
  }
}

/* 响应式优化 */
@media (max-width: 1680px) {
  .box {
    width: 90%;
  }
}

@media (max-width: 1200px) {
  .box {
    flex-direction: column;
  }

  .right {
    margin-left: 0;
    margin-top: 20px;
  }

  .left,
  .right-top,
  .right-z-top,
  .right-bottom {
    border-radius: 12px;
  }
}

@media (max-width: 768px) {
  .right-z-top {
    padding: 16px;
  }

  .notice-title {
    font-size: 16px;
  }

  .notice-content {
    font-size: 13px;
  }

  .right-bottom {
    padding: 20px 16px;
  }

  .update-title {
    font-size: 18px;
  }

  .update-item {
    padding: 12px 14px;
  }

  .update-title-text {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .right-bottom {
    padding: 16px 12px;
  }

  .update-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .update-arrow {
    margin-left: 0;
    align-self: flex-end;
  }
}
</style>
