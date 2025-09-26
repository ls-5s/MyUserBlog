<script setup>
// 可以在这里添加组件逻辑和数据
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 头部区域 - 渐变背景 -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white h-[300px] flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold mb-4">找到适合你的学习路径</h1>
      <p class="text-lg mb-8 max-w-2xl text-center">从入门到精通，我们精心设计的学习路径将帮助你系统掌握技能，达成学习目标</p>
      <div class="flex space-x-4">
        <button class="bg-white text-blue-500 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors duration-300">开始学习</button>
        <button class="bg-transparent text-white border-2 border-white px-6 py-2 rounded-md flex items-center hover:bg-white/10 transition-colors duration-300">
          了解更多
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12">
      <!-- 学习路径标题 -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-slate-900 mb-6">全栈开发者</h2>
        <div class="w-20 h-1 bg-blue-500 mx-auto mb-10"></div>
      </div>

      <!-- 前端课程部分 -->
      <div class="mb-16">
        <h3 class="text-3xl font-bold text-slate-900 mb-8 pl-4 border-l-4 border-blue-500">前端</h3>

        <!-- 课程卡片容器 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- HTML&CSS 基础课程卡片 -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div class="p-6">
              <div class="font-bold text-2xl mb-2">HTML&CSS 基础</div>
              <div class="text-slate-600 mb-4">掌握网页结构和样式设计的基础知识</div>
              <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <span class="text-slate-500">3周到1个月</span>
                <button class="text-red-500 font-bold hover:text-red-600 transition-colors duration-300 flex items-center">
                  详情 -
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- JavaScript 基础课程卡片 -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div class="p-6">
              <div class="font-bold text-2xl mb-2">JavaScript 基础</div>
              <div class="text-slate-600 mb-4">学习JavaScript编程语言基础知识和DOM操作</div>
              <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <span class="text-slate-500">1-2个月</span>
                <button class="text-red-500 font-bold hover:text-red-600 transition-colors duration-300 flex items-center">
                  详情 -
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Vue.js 框架课程卡片 -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div class="p-6">
              <div class="font-bold text-2xl mb-2">Vue.js 框架</div>
              <div class="text-slate-600 mb-4">掌握现代前端框架Vue.js的核心概念和应用</div>
              <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <span class="text-slate-500">1-2个月</span>
                <button class="text-red-500 font-bold hover:text-red-600 transition-colors duration-300 flex items-center">
                  详情 -
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 后端课程部分 -->
      <div>
        <h3 class="text-3xl font-bold text-slate-900 mb-8 pl-4 border-l-4 border-purple-500">后端</h3>

        <!-- 后端课程卡片容器 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Node.js 基础课程卡片 -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div class="p-6">
              <div class="font-bold text-2xl mb-2">Node.js 基础</div>
              <div class="text-slate-600 mb-4">学习使用JavaScript构建后端应用程序</div>
              <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <span class="text-slate-500">1-2个月</span>
                <button class="text-red-500 font-bold hover:text-red-600 transition-colors duration-300 flex items-center">
                  详情 -
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 数据库基础课程卡片 -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div class="p-6">
              <div class="font-bold text-2xl mb-2">数据库基础</div>
              <div class="text-slate-600 mb-4">学习数据库设计和SQL查询语言</div>
              <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <span class="text-slate-500">1个月</span>
                <button class="text-red-500 font-bold hover:text-red-600 transition-colors duration-300 flex items-center">
                  详情 -
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- RESTful API 设计课程卡片 -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <div class="p-6">
              <div class="font-bold text-2xl mb-2">RESTful API 设计</div>
              <div class="text-slate-600 mb-4">学习设计和实现高质量的API接口</div>
              <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                <span class="text-slate-500">2-3周</span>
                <button class="text-red-500 font-bold hover:text-red-600 transition-colors duration-300 flex items-center">
                  详情 -
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 可以在这里添加特定的组件样式 */
</style>
