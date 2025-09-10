<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a href="#" class="logo">代码空间</a>
        </div>
        <nav class="navbar-nav">
          <a href="#" class="nav-link active">首页</a>
          <a href="#" class="nav-link">文章</a>
          <a href="#" class="nav-link">分类</a>
          <a href="#" class="nav-link">关于</a>
        </nav>
      </div>
    </header>

    <!-- 页面主体内容 -->
    <main class="main-content">
      <div class="container">
        <!-- 博客头部 -->
        <div class="blog-header">
          <h1 class="blog-title">探索前端开发的无限可能</h1>
          <p class="blog-description">分享Web开发技术、前端框架、性能优化和最佳实践</p>
        </div>

        <div class="content-layout">
          <!-- 主内容区 -->
          <div class="main-column">
            <!-- 特色文章 -->
            <section class="featured-section">
              <h2 class="section-title">特色文章</h2>
              <div class="featured-posts">
                <div v-for="post in featuredPosts" :key="post.id" class="featured-post">
                  <div class="post-cover">
                    <img :src="post.coverImage" :alt="post.title" class="post-image">
                  </div>
                  <div class="post-content">
                    <div class="post-meta">
                      <span class="post-date">{{ post.date }}</span>
                      <span class="post-category">{{ post.category }}</span>
                    </div>
                    <h3 class="post-title">{{ post.title }}</h3>
                    <p class="post-excerpt">{{ post.excerpt }}</p>
                    <div class="post-tags">
                      <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
                    </div>
                    <a href="#" class="read-more">阅读全文</a>
                  </div>
                </div>
              </div>
            </section>

            <!-- 最新文章 -->
            <section class="latest-section">
              <h2 class="section-title">最新文章</h2>
              <div class="latest-posts">
                <div v-for="post in latestPosts" :key="post.id" class="latest-post">
                  <div class="latest-post-content">
                    <h3 class="post-title">{{ post.title }}</h3>
                    <p class="post-excerpt">{{ post.excerpt }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- 侧边栏 -->
          <aside class="sidebar">
            <!-- 作者信息 -->
            <div class="author-card">
              <div class="author-avatar">
                <img src="@/assets/1.jpg" alt="作者头像" class="avatar-image">
              </div>
              <h3 class="author-name">开发者</h3>
              <p class="author-bio">热衷于Web技术的全栈开发者，分享技术心得和实战经验。</p>
            </div>

            <!-- 分类 -->
            <div class="categories-widget">
              <h3 class="widget-title">分类</h3>
              <ul class="categories-list">
                <li v-for="category in categories" :key="category.name" class="category-item">
                  <a href="#" class="category-link">{{ category.name }}</a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h2 class="brand-name">代码空间</h2>
          </div>
          <div class="footer-links">
            <a href="#" class="footer-link">首页</a>
            <a href="#" class="footer-link">文章</a>
            <a href="#" class="footer-link">分类</a>
            <a href="#" class="footer-link">关于</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="copyright">© 2023 代码空间. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟博客文章数据
const featuredPosts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API完全指南',
    excerpt: '深入探索Vue 3的Composition API，了解其设计理念和使用方法，提升你的组件开发效率。',
    coverImage: 'https://picsum.photos/800/450?random=1',
    date: '2023-08-15',
    category: '前端开发',
    tags: ['Vue', 'JavaScript']
  },
  {
    id: 2,
    title: '现代CSS布局技术详解',
    excerpt: '从Flexbox到Grid，从CSS变量到响应式设计，掌握现代Web布局的核心技术。',
    coverImage: 'https://picsum.photos/800/450?random=2',
    date: '2023-07-28',
    category: 'CSS',
    tags: ['CSS', '布局']
  }
]);

const latestPosts = ref([
  {
    id: 3,
    title: 'JavaScript异步编程进阶',
    excerpt: '深入了解Promise、async/await、事件循环等JavaScript异步编程的核心概念。'
  },
  {
    id: 4,
    title: 'Node.js性能优化实战',
    excerpt: '探索Node.js应用性能优化的实用技巧和最佳实践，让你的服务运行更高效。'
  },
  {
    id: 5,
    title: 'TypeScript高级类型系统',
    excerpt: '掌握TypeScript的高级类型特性，提升代码的类型安全性和可维护性。'
  }
]);

const categories = ref([
  { name: '前端开发' },
  { name: 'JavaScript' },
  { name: 'CSS' },
  { name: 'Vue.js' },
  { name: 'Node.js' }
]);
</script>

<style scoped>
/* 变量定义 */
:root {
  --primary-color: #4f46e5;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --border-color: #e5e7eb;
  --transition: all 0.3s ease;
  --radius-md: 0.5rem;
}

/* 全局样式 */
.home-container {
  margin-top: 60px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 导航栏样式 */
.navbar {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand .logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
}

.nav-link:hover, .nav-link.active {
  color: var(--primary-color);
}

/* 主内容区 */
.main-content {
  padding: 3rem 0;
}

/* 博客头部 */
.blog-header {
  text-align: center;
  margin-bottom: 2rem;
}

.blog-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.blog-description {
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
}

/* 内容布局 */
.content-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
}

/* 主列 */
.main-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 区域标题 */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

/* 特色文章 */
.featured-posts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .featured-posts {
    grid-template-columns: repeat(2, 1fr);
  }
}

.featured-post {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-cover {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.post-excerpt {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-tag {
  font-size: 0.75rem;
  color: var(--primary-color);
  background-color: rgba(79, 70, 229, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

.read-more {
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
}

.read-more:hover {
  text-decoration: underline;
}

/* 最新文章 */
.latest-posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.latest-post {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.latest-post .post-title {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.latest-post .post-excerpt {
  font-size: 0.875rem;
  margin-bottom: 0;
}

/* 侧边栏 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 作者卡片 */
.author-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.author-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.author-bio {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

/* 分类小部件 */
.categories-widget {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: 0.75rem;
}

.category-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
}

.category-link:hover {
  color: var(--primary-color);
}

/* 页脚 */
.footer {
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
}

.footer-link:hover {
  color: var(--primary-color);
}

.footer-bottom {
  text-align: center;
}

.copyright {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
