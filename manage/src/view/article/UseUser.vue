<script setup>
import { ref } from 'vue';
import { about } from '@/api/about';
import { ElMessage } from 'element-plus';
// 公告内容状态
const announcementContent = ref('');
const aboutMeContent = ref('');
const hobbiesContent = ref('');
const learningContent = ref('');
const contactContent = ref(''); // 新增联系方式状态

// 发布内容
const handleAbout = async (data) => {
  try {
    if (!data.about) {
      ElMessage.error('请输入内容');
      return;
    }
    const res = await about(data);
    console.log(res.data);
    if (res.data.code === 201) {
      ElMessage.success('发布成功');
      announcementContent.value = '';
      aboutMeContent.value = '';
      hobbiesContent.value = '';
      learningContent.value = '';
      contactContent.value = ''; // 清空联系方式

    }
  } catch (error) {
    ElMessage.error('发布失败');
    console.error('发布内容:', error);
  }
}
</script>
<template>
  <div class="profile-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">个人信息管理</h2>
    </div>

    <!-- 卡片容器 - 采用网格布局 -->
    <div class="cards-grid">
      <!-- 公告管理卡片 -->
      <div class="profile-card">
        <!-- 头部区域，包含图标和标题 -->
        <div class="card-header">
          <!-- 公告图标 -->
          <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <h3 class="card-title">公告管理</h3>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 内容区域 -->
        <div class="card-content">
          <!-- 多行文本域 -->
          <textarea @keyup.enter="handleAbout({ about: announcementContent, id: 1 }) " v-model=" announcementContent"
            class="content-input" placeholder="请输入公告内容" rows="4"></textarea>

          <!-- 按钮区域 -->
          <div class="button-section">
            <el-button type="success" @click="handleAbout({about: announcementContent, id: 1})">发布公告</el-button>
          </div>
        </div>
      </div>

      <!-- 关于我卡片 -->
      <div class="profile-card">
        <!-- 头部区域，包含图标和标题 -->
        <div class="card-header">
          <!-- 用户图标 -->
          <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <h3 class="card-title">关于我</h3>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 内容区域 -->
        <div class="card-content">
          <!-- 多行文本域 -->
          <textarea @keyup.enter="handleAbout({about: aboutMeContent, id: 2})" v-model="aboutMeContent" class="content-input" placeholder="请输入关于我的介绍" rows="4"></textarea>

          <!-- 按钮区域 -->
          <div class="button-section">
            <el-button type="primary" @click="handleAbout({about: aboutMeContent, id: 2})">发布内容</el-button>
          </div>
        </div>
      </div>

      <!-- 兴趣爱好卡片 -->
      <div class="profile-card">
        <!-- 头部区域，包含图标和标题 -->
        <div class="card-header">
          <!-- 爱好图标 -->
          <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3 class="card-title">兴趣爱好</h3>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 内容区域 -->
        <div class="card-content">
          <!-- 多行文本域 -->
          <textarea @keyup.enter="handleAbout({about: hobbiesContent, id: 3})" v-model="hobbiesContent" class="content-input" placeholder="请输入兴趣爱好" rows="4"></textarea>

          <!-- 按钮区域 -->
          <div class="button-section">
            <el-button type="primary" @click="handleAbout({about: hobbiesContent, id: 3})">发布内容</el-button>
          </div>
        </div>
      </div>

      <!-- 技术栈卡片 -->
      <div class="profile-card">
        <!-- 头部区域，包含图标和标题 -->
        <div class="card-header">
          <!-- 技术栈图标 -->
          <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          <h3 class="card-title">技术栈</h3>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 内容区域 -->
        <div class="card-content">


          <!-- 学习中技术 -->
          <div class="skill-section">

            <textarea @keyup.enter="handleAbout({about: learningContent, id: 4})" v-model="learningContent" class="content-input" placeholder="请输入正在学习的技术" rows="4"></textarea>
          </div>

          <!-- 按钮区域 -->
          <div class="button-section">
            <el-button type="primary" @click="handleAbout({about: learningContent, id: 4})">发布内容</el-button>
          </div>
        </div>
      </div>

      <!-- 联系方式卡片 -->
      <div class="profile-card">
        <!-- 头部区域，包含图标和标题 -->
        <div class="card-header">
          <!-- 联系图标 -->
          <svg class="card-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l11.9 11.5a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <h3 class="card-title">联系方式</h3>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 内容区域 -->
        <div class="card-content">
          <!-- 多行文本域 -->
          <textarea @keyup.enter="handleAbout({about: contactContent, id: 5})" v-model="contactContent" class="content-input" placeholder="请输入联系方式，如QQ、邮箱等" rows="4"></textarea>

          <!-- 按钮区域 -->
          <div class="button-section">
            <el-button type="primary" @click="handleAbout({about: contactContent, id: 5})">发布内容</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
/* 主容器样式 */
.profile-container {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 20px;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 卡片网格布局 */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 卡片样式 */
.profile-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #e4e7ed;
}

.profile-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* 头部区域样式 */
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

/* 图标样式 */
.card-icon {
  width: 24px;
  height: 24px;
  color: #409eff;
  margin-right: 8px;
}

/* 标题样式 */
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 分隔线样式 */
.divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 12px 0;
}

/* 内容区域样式 */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 技术栈部分样式 */
.skill-section {
  margin-bottom: 8px;
}

.skill-label {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  margin-bottom: 6px;
  display: block;
}

/* 输入框样式 */
.content-input {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.content-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 按钮区域样式 */
.button-section {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  margin-top: 4px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .profile-container {
    padding: 12px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-title {
    font-size: 20px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .profile-card {
    padding: 16px;
  }

  .button-section {
    justify-content: center;
  }
}

/* 特殊断点适配 - 双列布局优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
