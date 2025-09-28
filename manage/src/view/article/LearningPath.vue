<script setup>
import { postlearn } from '@/api/learn'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const formData = ref({
  stack: '',
  prerequisites: '',
  time: '',
  resources: '',
  introduction: '',
  content: ''
})

// 提交表单
const handleSubmit = async () => {
  try {
    if (!formData.value.stack || !formData.value.prerequisites || !formData.value.time || !formData.value.resources || !formData.value.introduction || !formData.value.content) {
      ElMessage.error('请填写完整信息')
      return
    }
    await postlearn(formData.value)
    // 发布成功后，重置表单数据
    formData.value = {
      stack: '',
      prerequisites: '',
      time: '',
      resources: '',
      introduction: '',
      content: ''
    }
    // 提示用户发布成功
    ElMessage.success('发布成功')
  } catch (error) {
    // 发布失败，提示用户
    ElMessage.error('发布失败，请检查输入信息', error.message)
  }
}
// 重置表单
const resetForm = () => {

  formData.value = {
    stack: '',
    prerequisites: '',
    time: '',
    resources: '',
    introduction: '',
    content: ''
  }
  ElMessage.success('重置成功')
}
</script>
<template>
  <div class="learning-path-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">学习路径管理</h1>
    </div>

    <!-- 左右两栏容器 -->
    <div class="two-column-container">
      <!-- 表单容器 - 左侧 -->
      <div class="form-container">
        <div class="form-header">
          <h2 class="section-title">内容详情</h2>
        </div>

        <!-- 表单内容区域 -->
        <div class="form-content">
          <!-- 基本信息部分 - 网格布局 -->
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">技术栈</label>
              <input v-model="formData.stack" type="text" class="form-input" placeholder="请输入技术栈">
            </div>

            <div class="form-group">
              <label class="form-label">前置要求</label>
              <input v-model="formData.prerequisites" type="text" class="form-input" placeholder="请输入前置要求">
            </div>

            <div class="form-group">
              <label class="form-label">课程时长</label>
              <input v-model="formData.time" type="text" class="form-input" placeholder="请输入课程时长">
            </div>

            <div class="form-group">
              <label class="form-label">课程资源</label>
              <textarea v-model="formData.resources" type="text" class="form-textarea" placeholder="请输入课程资源"></textarea>
            </div>
          </div>

          <!-- 文本区域部分 -->
          <div class="form-group">
            <label class="form-label">课程简介</label>
            <textarea v-model="formData.introduction" class="form-textarea" placeholder="请输入课程简介" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">课程内容</label>
            <textarea v-model="formData.content" class="form-textarea" placeholder="请输入课程内容" rows="6"></textarea>
          </div>

          <!-- 提交按钮区域 -->
          <div class="form-actions">
            <button class="submit-btn" @click="handleSubmit">发布内容</button>
            <button class="cancel-btn" @click="resetForm">取消</button>
          </div>
        </div>
      </div>

      <!-- 技术栈介绍部分 - 右侧 -->
      <div class="tech-stack-section">
        <div class="form-header">
          <h2 class="section-title">技术栈介绍</h2>
        </div>
        <div class="form-content">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">分类</label>
              <input type="text" class="form-input" placeholder="请输入分类">
            </div>
            <div class="form-group">
              <label class="form-label">技术栈</label>
              <input type="text" class="form-input" placeholder="请输入技术栈">
            </div>
            <div class="form-group">
              <label class="form-label">时间</label>
              <input type="text" class="form-input" placeholder="请输入时间">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">技术栈介绍</label>
            <textarea v-model="formData.introduction" class="form-textarea" placeholder="请输入技术栈介绍" rows="4"></textarea>
          </div>
          <div class="form-actions">
            <button class="submit-btn" @click="handleTechStackSubmit">发布</button>
            <button class="cancel-btn" @click="handleTechStackCancel">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 整体容器样式 */
.learning-path-container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 页面标题样式 */
.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* 左右两栏布局容器 */
.two-column-container {
  display: flex;
  gap: 20px;
  max-width: 1840px;
  margin: 0 auto;
}

/* 表单容器样式 - 左右两栏共享 */
.form-container,
.tech-stack-section {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-height: 600px; /* 确保两栏高度一致 */
}

/* 表单头部样式 */
.form-header {
  margin-bottom: 25px;
}

.section-title {
  font-size: 20px;
  font-weight: 500;
  color: #409eff;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e6f7ff;
}

/* 表单网格布局 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

/* 表单组样式 */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

/* 表单标签样式 */
.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  margin-bottom: 8px;
}

/* 表单输入框样式 */
.form-input {
  padding: 10px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  color: #303133;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 表单文本域样式 */
.form-textarea {
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  color: #303133;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.3s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 表单操作按钮样式 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

/* 提交按钮样式 */
.submit-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #66b1ff;
}

/* 取消按钮样式 */
.cancel-btn {
  padding: 10px 20px;
  background-color: #ffffff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .two-column-container {
    flex-direction: column;
  }

  .form-container,
  .tech-stack-section {
    min-height: auto;
  }
}
</style>
