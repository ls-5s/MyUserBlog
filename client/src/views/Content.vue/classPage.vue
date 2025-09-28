<script setup>
import { ref, onMounted } from 'vue';
import { getLearnStack, getLearnPath } from '@/api/learn'
// 前端基础技术
const learnStack = ref([])
// 前端框架
const learnvue = ref([])
const learnPath = ref()
const learnnode = ref([])
const learnSkill = ref([])
// 返回顶部相关
const showBackToTop = ref(false);

// 获取学习路径
const getPath = async () => {
  const res = await getLearnPath()
  learnPath.value = res.data.data
  console.log(learnPath.value)
}
// 获取前端基础技术栈
const getStack = async (category) => {
  const res = await getLearnStack(category)
  learnStack.value = res.data.data
  // console.log(learnStack.value)
}
// 获取前端框架栈
const getVueStack = async (category) => {
  const res = await getLearnStack(category)
  learnvue.value = res.data.data
  // console.log(learnvue.value)
}
// 获取Node.js栈
const getNodeStack = async (category) => {
  const res = await getLearnStack(category)
  learnnode.value = res.data.data
  // console.log(learnnode.value)
}
// 获取技能提升栈
const getSkillStack = async (category) => {
  const res = await getLearnStack(category)
  learnSkill.value = res.data.data
  // console.log(learnSkill.value)
}
// 弹窗状态管理
const showModal = ref(false);
const currentCourse = ref(null);

// 打开弹窗函数
function openModal(courseName) {
  currentCourse.value = learnPath.value[courseName];
  showModal.value = true;
}

// 关闭弹窗函数
function closeModal() {
  showModal.value = false;
  currentCourse.value = null;
}

// 返回顶部函数
function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// 监听滚动事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

onMounted(() => {
  getStack('前端基础技术')
  getVueStack('前端框架')
  getNodeStack('后端开发')
  getSkillStack('技能提升')
  getPath()
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll);
  // 组件卸载时移除监听
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
})
</script>

<template>
  <div class="class-page">
    <!-- 头部渐变区域 -->
    <div class="header-gradient">
      <h1 class="header-title">全栈开发者学习路径</h1>
      <p class="header-description">从前端到后端，一站式掌握现代Web开发技能</p>
      <div class="header-buttons">
        <button class="start-learning-btn">开始学习</button>
        <button class="learn-more-btn">
          了解更多
          <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <div class="path-title-container">
        <h2 class="path-title">前端基础技术</h2>
        <div class="title-divider"></div>
      </div>

      <!-- 前端基础技术课程 -->
      <div class="course-section">
        <h3 class="section-title front-end-title">前端基础技术</h3>
        <div class="course-grid">
          <div class="course-card" v-for="item in learnStack" :key="item.stack" @click="openModal(item.stack)">
            <div class="course-card-content">
              <h4 class="course-title">{{ item.stack }}</h4>
              <p class="course-description">{{ item.introduction }}</p>
              <div class="course-footer">
                <span class="course-duration">{{ item.time }}</span>
                <button class="details-btn">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 前端框架课程 -->
      <div class="course-section">
        <h3 class="section-title front-end-title">前端框架</h3>
        <div class="course-grid">
          <div class="course-card" v-for="item in learnvue" :key="item.stack" @click="openModal(item.stack)">
            <div class="course-card-content">
              <h4 class="course-title">{{ item.stack }}</h4>
              <p class="course-description">{{ item.introduction }}</p>
              <div class="course-footer">
                <span class="course-duration">{{ item.time }}</span>
                <button class="details-btn">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 后端开发课程 -->
      <div class="course-section">
        <h3 class="section-title back-end-title">后端开发</h3>
        <div class="course-grid">
          <div class="course-card" v-for="item in learnnode" :key="item.stack" @click="openModal(item.stack)">
            <div class="course-card-content">
              <h4 class="course-title">{{ item.stack }}</h4>
              <p class="course-description">{{ item.introduction }}</p>
              <div class="course-footer">
                <span class="course-duration">{{ item.time }}</span>
                <button class="details-btn">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 开发工具与其他 -->
      <div class="course-section">
        <h3 class="section-title dev-tools-title">开发工具与其他</h3>
        <div class="course-grid">
          <div class="course-card" v-for="item in learnSkill" :key="item.stack" @click="openModal(item.stack)">
            <div class="course-card-content">
              <h4 class="course-title">{{ item.stack }}</h4>
              <p class="course-description">{{ item.introduction }}</p>
              <div class="course-footer">
                <span class="course-duration">{{ item.time }}</span>
                <button class="details-btn">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐学习资源 -->
      <div class="resources-section">
        <h3 class="resources-title">推荐学习资源</h3>
        <div class="resources-grid">
          <!-- 官方文档资源 -->
          <div class="resource-category">
            <h4 class="resource-category-title">官方文档</h4>
            <ul class="resource-list">
              <li class="resource-item">
                <a href="https://developer.mozilla.org/" target="_blank" class="resource-link">
                  <span class="resource-name">MDN Web Docs</span>
                  <span class="resource-desc">Web开发权威文档</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://vuejs.org/" target="_blank" class="resource-link">
                  <span class="resource-name">Vue.js 文档</span>
                  <span class="resource-desc">Vue.js官方指南</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://nodejs.org/" target="_blank" class="resource-link">
                  <span class="resource-name">Node.js 文档</span>
                  <span class="resource-desc">Node.js官方文档</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://expressjs.com/" target="_blank" class="resource-link">
                  <span class="resource-name">Express 文档</span>
                  <span class="resource-desc">Express框架指南</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 教程网站资源 -->
          <div class="resource-category">
            <h4 class="resource-category-title">教程网站</h4>
            <ul class="resource-list">
              <li class="resource-item">
                <a href="https://frontendmasters.com/" target="_blank" class="resource-link">
                  <span class="resource-name">Frontend Masters</span>
                  <span class="resource-desc">高级前端开发课程</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://www.freecodecamp.org/" target="_blank" class="resource-link">
                  <span class="resource-name">freeCodeCamp</span>
                  <span class="resource-desc">免费编程学习平台</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://www.codecademy.com/" target="_blank" class="resource-link">
                  <span class="resource-name">Codecademy</span>
                  <span class="resource-desc">交互式编程课程</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://www.udemy.com/" target="_blank" class="resource-link">
                  <span class="resource-name">Udemy</span>
                  <span class="resource-desc">在线学习平台</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 社区与论坛资源 -->
          <div class="resource-category">
            <h4 class="resource-category-title">社区与论坛</h4>
            <ul class="resource-list">
              <li class="resource-item">
                <a href="https://stackoverflow.com/" target="_blank" class="resource-link">
                  <span class="resource-name">Stack Overflow</span>
                  <span class="resource-desc">编程问答社区</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://github.com/" target="_blank" class="resource-link">
                  <span class="resource-name">GitHub</span>
                  <span class="resource-desc">代码托管与社区</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://dev.to/" target="_blank" class="resource-link">
                  <span class="resource-name">DEV Community</span>
                  <span class="resource-desc">开发者社区与博客</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://segmentfault.com/" target="_blank" class="resource-link">
                  <span class="resource-name">SegmentFault</span>
                  <span class="resource-desc">中文开发者社区</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 学习工具资源 -->
          <div class="resource-category">
            <h4 class="resource-category-title">学习工具</h4>
            <ul class="resource-list">
              <li class="resource-item">
                <a href="https://codesandbox.io/" target="_blank" class="resource-link">
                  <span class="resource-name">CodeSandbox</span>
                  <span class="resource-desc">在线代码编辑器</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://jsfiddle.net/" target="_blank" class="resource-link">
                  <span class="resource-name">JSFiddle</span>
                  <span class="resource-desc">前端代码测试工具</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://codepen.io/" target="_blank" class="resource-link">
                  <span class="resource-name">CodePen</span>
                  <span class="resource-desc">前端代码展示平台</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://leetcode.com/" target="_blank" class="resource-link">
                  <span class="resource-name">LeetCode</span>
                  <span class="resource-desc">算法练习平台</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 课程详情弹窗 -->
      <div v-if="showModal && currentCourse" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h3 class="modal-title">{{ currentCourse.stack }}</h3>
            <button class="modal-close-btn" @click="closeModal">
              <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="modal-content">
            <!-- 重新布局的课程信息 -->
            <div class="modal-info">
              <div class="info-item">
                <span class="info-label">学习时长:</span>
                <span class="info-value">{{ currentCourse.time }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">前置要求:</span>
                <span class="info-value">{{ currentCourse.prerequisites }}</span>
              </div>
            </div>
            <div class="modal-description">
              <h4 class="description-title">课程简介</h4>
              <p>{{ currentCourse.introduction }}</p>
            </div>
            <div class="modal-course-content">
              <h4 class="content-title">课程内容</h4>
              <ul class="content-list">
                <li v-for="item in currentCourse.content" :key="item" class="content-item">
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- 课程资源部分 -->
            <div class="modal-resources">
              <h4 class="resources-title">推荐资源</h4>
              <div class="resource-category">
                <h5 class="resource-category-title">官方文档</h5>
                <ul class="resource-list">
                  <li class="resource-item">
                    <a href="https://developer.mozilla.org/" target="_blank" class="resource-link">
                      <span class="resource-name">MDN Web Docs</span>
                      <span class="resource-desc">Web开发权威文档</span>
                    </a>
                  </li>

                </ul>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-close-btn" @click="closeModal">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <button v-if="showBackToTop" class="back-to-top-btn" @click="backToTop" aria-label="返回顶部">
      <svg class="back-to-top-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 主容器样式 */
.class-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
}

/* 头部渐变区域样式 */
.header-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 3rem 1.5rem;
}

.header-title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  font-weight: 700;
}

.header-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.header-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.start-learning-btn {
  background-color: white;
  color: #667eea;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-learning-btn:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.learn-more-btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.learn-more-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.arrow-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.learn-more-btn:hover .arrow-icon {
  transform: translateX(3px);
}

/* 主要内容区域样式 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* 路径标题样式 */
.path-title-container {
  text-align: center;
  margin-bottom: 3rem;
}

.path-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: #2d3748;
  margin-bottom: 1rem;
}

.title-divider {
  width: 100px;
  height: 4px;
  background-color: #667eea;
  margin: 0 auto;
  border-radius: 2px;
}

/* 课程部分样式 */
.course-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.front-end-title {
  color: #667eea;
}

.back-end-title {
  color: #48bb78;
}

.dev-tools-title {
  color: #ed8936;
}

/* 课程网格布局 */
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* 课程卡片样式 */
.course-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.course-card-content {
  padding: 1.5rem;
}

.course-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.course-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-duration {
  background-color: #e6f0ff;
  color: #4299e1;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
}

.details-btn {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(49, 130, 206, 0.3);
}

.details-btn:hover {
  background-color: #2c5aa0;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(49, 130, 206, 0.4);
}

.details-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.details-btn:hover .details-icon {
  transform: translateX(2px);
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.modal-close-btn:hover {
  color: #555;
  background-color: #f0f0f0;
}

.close-icon {
  width: 20px;
  height: 20px;
}

.modal-content {
  padding: 1.5rem;
}

.modal-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
}

.info-value {
  font-size: 0.9375rem;
  color: #2d3748;
  font-weight: 600;
}

.modal-description {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.description-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.modal-course-content {
  margin-bottom: 1rem;
}

.content-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.content-list {
  list-style-type: none;
}

.content-item {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: #4a5568;
}

.content-item:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #667eea;
  font-size: 1.25rem;
  line-height: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
}

/* 资源推荐模块样式 */
.resources-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
}

.resources-title {
  color: #9f7aea;
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.resource-category {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.resource-category-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.resource-list {
  list-style-type: none;
}

.resource-item {
  margin-bottom: 0.75rem;
}

.resource-item:last-child {
  margin-bottom: 0;
}

.resource-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: #667eea;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 4px;
}

.resource-link:hover {
  background-color: #f7fafc;
  color: #5a67d8;
}

.resource-name {
  font-weight: 600;
  font-size: 0.9375rem;
}

.resource-desc {
  font-size: 0.875rem;
  color: #718096;
}

/* 弹窗资源部分样式简化 - 复用现有样式 */
.modal-resources {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.modal-resources .resources-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
  border-bottom: none;
  padding-bottom: 0;
}

/* 返回顶部按钮样式 */
.back-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  z-index: 999;
}

.back-to-top-btn:hover {
  background-color: #5a67d8;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
}

.back-to-top-icon {
  width: 20px;
  height: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {

  .course-grid,
  .resources-grid {
    grid-template-columns: 1fr;
  }

  .modal-info {
    grid-template-columns: 1fr;
  }

  .modal-container {
    max-height: 90vh;
  }

  .back-to-top-btn {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .header-gradient {
    padding: 2rem 1rem;
  }

  .main-content {
    padding: 1.5rem 1rem;
  }

  .header-buttons {
    flex-direction: column;
    align-items: center;
  }

  .start-learning-btn,
  .learn-more-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .modal-footer {
    flex-direction: column;
  }

  .modal-close-btn {
    width: 100%;
  }

  .back-to-top-btn {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }
}
</style>
