<script setup>
import { ref } from 'vue';

// 弹窗状态管理
const showModal = ref(false);
const currentCourse = ref(null);

// 课程详细信息数据
const coursesData = {
  'HTML': {
    title: 'HTML 基础与进阶',
    description: '掌握网页结构的基础标记语言，学习语义化标签和表单元素',
    duration: '2-3周',
    level: '初级',
    content: [
      'HTML基本标签和文档结构',
      '语义化HTML5标签',
      '表单元素与验证',
      '多媒体元素（图片、音频、视频）',
      'HTML与CSS的结合',
      '响应式HTML设计原则'
    ],
    prerequisites: '无',
    certificate: true
  },
  'CSS': {
    title: 'CSS 样式设计精通',
    description: '学习样式设计，包括选择器、盒模型、Flexbox、Grid布局和响应式设计',
    duration: '3-4周',
    level: '初级到中级',
    content: [
      'CSS选择器与优先级',
      '盒模型与布局基础',
      'Flexbox弹性布局',
      'Grid网格布局',
      'CSS变量与自定义属性',
      '响应式设计与媒体查询',
      '动画与过渡效果'
    ],
    prerequisites: '基础HTML知识',
    certificate: true
  },
  'JavaScript': {
    title: 'JavaScript 编程基础与高级特性',
    description: '学习JavaScript编程语言基础、DOM操作、异步编程和ES6+特性',
    duration: '1-2个月',
    level: '初级到中级',
    content: [
      'JavaScript基础语法',
      '数据类型与运算符',
      '函数、对象与数组',
      'DOM操作与事件处理',
      '异步编程（回调、Promise、async/await）',
      'ES6+新特性',
      '错误处理与调试技巧'
    ],
    prerequisites: '基础HTML和CSS知识',
    certificate: true
  },
  'Vue 2': {
    title: 'Vue.js 2 框架开发实战',
    description: '学习Vue.js 2框架的核心概念、组件系统、指令和生命周期钩子',
    duration: '1个月',
    level: '中级',
    content: [
      'Vue.js基本概念与安装',
      '模板语法与数据绑定',
      '组件系统与通信',
      '指令系统',
      '生命周期钩子',
      'Vue Router路由管理',
      'Vuex状态管理'
    ],
    prerequisites: 'JavaScript基础',
    certificate: true
  },
  'Vue 3': {
    title: 'Vue.js 3 新特性与实战',
    description: '掌握Vue.js 3的新特性，包括Composition API、Teleport和Suspense',
    duration: '1个月',
    level: '中级到高级',
    content: [
      'Vue 3新特性概述',
      'Composition API深入理解',
      'Teleport组件',
      'Suspense异步组件',
      'Vue 3性能优化',
      'TypeScript与Vue 3结合',
      'Vue 3生态系统'
    ],
    prerequisites: 'Vue 2基础或其他框架经验',
    certificate: true
  },
  'UniApp': {
    title: 'UniApp 跨平台应用开发',
    description: '学习使用UniApp开发跨平台应用，一次编写多端运行（iOS、Android、Web）',
    duration: '1-2个月',
    level: '中级',
    content: [
      'UniApp框架介绍与环境搭建',
      '页面路由与组件',
      '数据请求与状态管理',
      '原生API调用',
      '条件编译与平台差异处理',
      '应用发布与优化',
      '实战项目开发'
    ],
    prerequisites: 'Vue.js基础',
    certificate: true
  },
  'Axios': {
    title: 'Axios 网络请求实战',
    description: '掌握HTTP请求库Axios的使用，处理API调用、请求拦截和响应处理',
    duration: '2周',
    level: '初级到中级',
    content: [
      'Axios基础用法',
      '请求配置与参数处理',
      '响应数据处理',
      '拦截器的使用',
      '错误处理策略',
      '取消请求',
      'Axios在实际项目中的最佳实践'
    ],
    prerequisites: 'JavaScript基础',
    certificate: false
  },
  'Tailwind CSS': {
    title: 'Tailwind CSS 实用样式框架',
    description: '学习实用优先的CSS框架，掌握原子类设计、响应式工具和自定义配置',
    duration: '2-3周',
    level: '初级到中级',
    content: [
      'Tailwind CSS介绍与安装',
      '原子类设计理念',
      '响应式工具类',
      '自定义配置',
      '组件提取',
      '深色模式支持',
      '性能优化'
    ],
    prerequisites: '基础CSS知识',
    certificate: false
  },
  'Node.js': {
    title: 'Node.js 后端开发基础',
    description: '学习使用JavaScript构建后端应用程序，了解事件循环和非阻塞I/O',
    duration: '1-2个月',
    level: '中级',
    content: [
      'Node.js架构与原理',
      '模块系统（CommonJS、ES模块）',
      '文件系统操作',
      '网络编程基础',
      '异步编程模型',
      'NPM包管理',
      'Express框架入门'
    ],
    prerequisites: 'JavaScript基础',
    certificate: true
  },
  'Express': {
    title: 'Express.js Web应用开发',
    description: '学习使用Express框架快速构建Web应用和API，掌握中间件和路由',
    duration: '3-4周',
    level: '中级',
    content: [
      'Express框架介绍与安装',
      '路由系统',
      '中间件机制',
      '请求与响应处理',
      '模板引擎',
      '数据库集成',
      '认证与授权'
    ],
    prerequisites: 'Node.js基础',
    certificate: true
  },
  'TypeORM': {
    title: 'TypeORM 数据库映射框架',
    description: '学习使用TypeORM进行数据库操作，实现对象关系映射和数据模型管理',
    duration: '2-3周',
    level: '中级',
    content: [
      'TypeORM介绍与安装',
      '实体定义与关系映射',
      '仓库模式',
      '查询构建器',
      '迁移与种子',
      '事务处理',
      '性能优化技巧'
    ],
    prerequisites: 'TypeScript和数据库基础',
    certificate: false
  },
  'Git': {
    title: 'Git 版本控制精通',
    description: '掌握版本控制系统Git，学习分支管理、合并、提交和远程仓库操作',
    duration: '2-3周',
    level: '初级到中级',
    content: [
      'Git基础概念',
      '本地仓库操作',
      '分支管理策略',
      '合并与解决冲突',
      '远程仓库操作',
      'Git工作流',
      '高级Git技巧'
    ],
    prerequisites: '无',
    certificate: false
  },
  'TypeScript': {
    title: 'TypeScript 类型系统与高级特性',
    description: '学习TypeScript的类型系统、接口、泛型和高级特性，提升代码质量',
    duration: '3-4周',
    level: '中级',
    content: [
      'TypeScript基础类型',
      '接口与类型别名',
      '类与面向对象编程',
      '泛型编程',
      '高级类型特性',
      '模块化开发',
      '工程配置与最佳实践'
    ],
    prerequisites: 'JavaScript基础',
    certificate: true
  }
};

// 打开弹窗
function openModal(courseName) {
  currentCourse.value = coursesData[courseName];
  showModal.value = true;
  document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭弹窗
function closeModal() {
  showModal.value = false;
  currentCourse.value = null;
  document.body.style.overflow = 'auto'; // 恢复背景滚动
}
</script>

<template>
  <div class="class-page">
    <!-- 头部区域 - 渐变背景 -->
    <div class="header-gradient">
      <h1 class="header-title">找到适合你的学习路径</h1>
      <p class="header-description">从入门到精通，我们精心设计的学习路径将帮助你系统掌握技能，达成学习目标</p>
      <div class="header-buttons">
        <button class="start-learning-btn">开始学习</button>
        <button class="learn-more-btn">
          了解更多
          <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 学习路径标题 -->
      <div class="path-title-container">
        <h2 class="path-title">全栈开发者</h2>
        <div class="title-divider"></div>
      </div>

      <!-- 前端基础技术部分 -->
      <div class="course-section">
        <h3 class="section-title front-end-title">前端基础技术</h3>

        <!-- 课程卡片容器 -->
        <div class="course-grid">
          <!-- HTML 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">HTML</div>
              <div class="course-description">掌握网页结构的基础标记语言，学习语义化标签和表单元素</div>
              <div class="course-footer">
                <span class="course-duration">2-3周</span>
                <button class="details-btn" @click="openModal('HTML')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- CSS 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">CSS</div>
              <div class="course-description">学习样式设计，包括选择器、盒模型、Flexbox、Grid布局和响应式设计</div>
              <div class="course-footer">
                <span class="course-duration">3-4周</span>
                <button class="details-btn" @click="openModal('CSS')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- JavaScript 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">JavaScript</div>
              <div class="course-description">学习JavaScript编程语言基础、DOM操作、异步编程和ES6+特性</div>
              <div class="course-footer">
                <span class="course-duration">1-2个月</span>
                <button class="details-btn" @click="openModal('JavaScript')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 前端框架部分 -->
      <div class="course-section">
        <h3 class="section-title front-end-title">前端框架</h3>

        <!-- 课程卡片容器 -->
        <div class="course-grid">
          <!-- Vue 2 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">Vue 2</div>
              <div class="course-description">学习Vue.js 2框架的核心概念、组件系统、指令和生命周期钩子</div>
              <div class="course-footer">
                <span class="course-duration">1个月</span>
                <button class="details-btn" @click="openModal('Vue 2')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Vue 3 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">Vue 3</div>
              <div class="course-description">掌握Vue.js 3的新特性，包括Composition API、Teleport和Suspense</div>
              <div class="course-footer">
                <span class="course-duration">1个月</span>
                <button class="details-btn" @click="openModal('Vue 3')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- UniApp 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">UniApp</div>
              <div class="course-description">学习使用UniApp开发跨平台应用，一次编写多端运行（iOS、Android、Web）</div>
              <div class="course-footer">
                <span class="course-duration">1-2个月</span>
                <button class="details-btn" @click="openModal('UniApp')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Axios 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">Axios</div>
              <div class="course-description">掌握HTTP请求库Axios的使用，处理API调用、请求拦截和响应处理</div>
              <div class="course-footer">
                <span class="course-duration">2周</span>
                <button class="details-btn" @click="openModal('Axios')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Tailwind CSS 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">Tailwind CSS</div>
              <div class="course-description">学习实用优先的CSS框架，掌握原子类设计、响应式工具和自定义配置</div>
              <div class="course-footer">
                <span class="course-duration">2-3周</span>
                <button class="details-btn" @click="openModal('Tailwind CSS')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 后端技术部分 -->
      <div class="course-section">
        <h3 class="section-title back-end-title">后端技术</h3>

        <!-- 课程卡片容器 -->
        <div class="course-grid">
          <!-- Node.js 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">Node.js</div>
              <div class="course-description">学习使用JavaScript构建后端应用程序，了解事件循环和非阻塞I/O</div>
              <div class="course-footer">
                <span class="course-duration">1-2个月</span>
                <button class="details-btn" @click="openModal('Node.js')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Express 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">Express</div>
              <div class="course-description">学习使用Express框架快速构建Web应用和API，掌握中间件和路由</div>
              <div class="course-footer">
                <span class="course-duration">3-4周</span>
                <button class="details-btn" @click="openModal('Express')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- TypeORM 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">TypeORM</div>
              <div class="course-description">学习使用TypeORM进行数据库操作，实现对象关系映射和数据模型管理</div>
              <div class="course-footer">
                <span class="course-duration">2-3周</span>
                <button class="details-btn" @click="openModal('TypeORM')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 开发工具和进阶技术部分 -->
      <div class="course-section">
        <h3 class="section-title dev-tools-title">开发工具和进阶技术</h3>

        <!-- 课程卡片容器 -->
        <div class="course-grid">
          <!-- Git 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">Git</div>
              <div class="course-description">掌握版本控制系统Git，学习分支管理、合并、提交和远程仓库操作</div>
              <div class="course-footer">
                <span class="course-duration">2-3周</span>
                <button class="details-btn" @click="openModal('Git')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- TypeScript 课程卡片 -->
          <div class="course-card">
            <div class="course-card-content">
              <div class="course-title">TypeScript</div>
              <div class="course-description">学习TypeScript的类型系统、接口、泛型和高级特性，提升代码质量</div>
              <div class="course-footer">
                <span class="course-duration">3-4周</span>
                <button class="details-btn" @click="openModal('TypeScript')">
                  详情
                  <svg class="details-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 资源推荐模块 -->
      <div class="resources-section">
        <h3 class="section-title resources-title">推荐学习资源</h3>

        <div class="resources-grid">
          <!-- 在线文档资源 -->
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
                  <span class="resource-name">Vue.js 官方文档</span>
                  <span class="resource-desc">Vue框架权威指南</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://nodejs.org/en/docs/" target="_blank" class="resource-link">
                  <span class="resource-name">Node.js 文档</span>
                  <span class="resource-desc">Node.js官方API参考</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://www.typescriptlang.org/docs/" target="_blank" class="resource-link">
                  <span class="resource-name">TypeScript 文档</span>
                  <span class="resource-desc">TypeScript官方指南</span>
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
                  <span class="resource-desc">高级前端课程</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://egghead.io/" target="_blank" class="resource-link">
                  <span class="resource-name">Egghead.io</span>
                  <span class="resource-desc">短平快的编程教程</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://scrimba.com/" target="_blank" class="resource-link">
                  <span class="resource-name">Scrimba</span>
                  <span class="resource-desc">交互式编程学习平台</span>
                </a>
              </li>
              <li class="resource-item">
                <a href="https://freecodecamp.org/" target="_blank" class="resource-link">
                  <span class="resource-name">freeCodeCamp</span>
                  <span class="resource-desc">免费编程学习资源</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- 社区论坛资源 -->
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
    </div>

    <!-- 课程详情弹窗 -->
    <div v-if="showModal && currentCourse" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">{{ currentCourse.title }}</h3>
          <button class="modal-close-btn" @click="closeModal">
            <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <div class="modal-info">
            <div class="info-item">
              <span class="info-label">学习时长:</span>
              <span class="info-value">{{ currentCourse.duration }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">难度级别:</span>
              <span class="info-value">{{ currentCourse.level }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">前置要求:</span>
              <span class="info-value">{{ currentCourse.prerequisites }}</span>
            </div>
            <div class="info-item" v-if="currentCourse.certificate">
              <span class="info-label">证书:</span>
              <span class="info-value certificate-badge">完成可获得证书</span>
            </div>
          </div>
          <div class="modal-description">
            <h4 class="description-title">课程简介</h4>
            <p>{{ currentCourse.description }}</p>
          </div>
          <div class="modal-course-content">
            <h4 class="content-title">课程内容</h4>
            <ul class="content-list">
              <li v-for="item in currentCourse.content" :key="item" class="content-item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-close-btn" @click="closeModal">关闭</button>
          <button class="modal-enroll-btn">立即学习</button>
        </div>
      </div>
    </div>
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

/* 修复弹窗关闭按钮样式 */
.modal-close-btn {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
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
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
}

.certificate-badge {
  background-color: #c6f6d5;
  color: #276749;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  display: inline-block;
  align-self: flex-start;
}

.modal-description {
  margin-bottom: 1.5rem;
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

.modal-enroll-btn {
  background-color: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal-enroll-btn:hover {
  background-color: #5a67d8;
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
  opacity: 0;
  transform: translateY(-5px);
  transition: all 0.3s ease;
}

.resource-link:hover .resource-desc {
  opacity: 1;
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }

  .modal-info {
    grid-template-columns: 1fr;
  }

  .modal-container {
    max-height: 90vh;
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

  .modal-close-btn,
  .modal-enroll-btn {
    width: 100%;
  }
}
</style>
