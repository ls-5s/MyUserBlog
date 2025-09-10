<template>

  <div class="common-layout">
    <el-container>
      <el-header>
        <!-- 带图标的导航链接 -->



        <!-- 暗黑模式切换开关：规范属性排列，图标用组件形式确保显示 -->
        <el-switch v-model="isDark" :active-icon="ActiveIcon" :inactive-icon="InactiveIcon" @change="toggleTheme"
          active-text="暗黑模式" inactive-text="亮色模式" style="margin-right: 16px" />
        <!-- 暗黑模式图标（月亮）-->
        <!-- 亮色模式图标（太阳）-->
        <!-- 开关激活时的文字提示-->
        <!-- 开关未激活时的文字提示-->
        <el-link type="primary" href="/layout/about" class="nav-link" :underline="false">
          <!-- About 图标 + 文字 -->
          <el-icon class="mr-2">
            <InfoFilled /><!-- Element UI 内置的信息/关于填充图标 -->
          </el-icon>
          关于
        </el-link>
        <el-link type="primary" href="/layout/home" class="nav-link" :underline="false">
          <!-- Home 图标 + 文字 -->
          <el-icon class="mr-2"><!-- 图标与文字间距 -->
            <HomeFilled /><!-- Element UI 内置的首页填充图标 -->
          </el-icon>
          首页
        </el-link>

      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>

</template>

<script setup>
import { ref, onMounted, h } from 'vue'
// 1. 导入 Element Plus 图标组件（必须导入，否则图标不显示）
import { ElIcon } from 'element-plus'
import { Moon, Sunny, HomeFilled, InfoFilled } from '@element-plus/icons-vue'

// 2. 响应式变量：默认亮色模式（isDark 初始为 false）
const isDark = ref(false)
const htmlEl = document.documentElement  // 获取根标签 <html>

// 3. 定义图标组件（用 h 函数创建图标实例，适配 el-switch 要求）
const ActiveIcon = h(ElIcon, null, { default: () => h(Moon) })    // 暗黑模式：月亮图标
const InactiveIcon = h(ElIcon, null, { default: () => h(Sunny) })  // 亮色模式：太阳图标

// 4. 页面加载时恢复上次主题（localStorage 持久化，刷新不丢失）
onMounted(() => {
  const savedTheme = localStorage.getItem('appTheme')
  // 若上次是暗黑模式，同步状态和 html 类名
  if (savedTheme === 'dark') {
    isDark.value = true
    htmlEl.classList.add('dark')
  }
})

// 5. 主题切换逻辑：同步 html 类名 + 持久化主题
const toggleTheme = () => {
  if (isDark.value) {
    // 切换到暗黑模式：加 dark 类 + 存 localStorage
    htmlEl.classList.add('dark')
    localStorage.setItem('appTheme', 'dark')
  } else {
    // 切换到亮色模式：删 dark 类 + 存 localStorage
    htmlEl.classList.remove('dark')
    localStorage.setItem('appTheme', 'light')
  }
}
</script>

<style scoped>
/* 优化开关样式：调整颜色和图标大小，提升视觉效果 */
.el-switch {
  /* 暗黑模式开关激活色（匹配 Element Plus 主色） */
  --el-switch-on-color: #409eff;
  /* 亮色模式开关未激活色（浅灰色，更柔和） */
  --el-switch-off-color: #e5e7eb;
  /* 图标大小调整 */
  --el-icon-size: 16px;
}

/* 开关文字样式优化 */
.el-switch__label {
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.el-header {
  position: fixed;
  /* 固定定位，脱离文档流 */
  top: 0;
  /* 距离窗口顶部 0px */
  left: 0;
  /* 距离窗口左侧 0px */
  width: 100%;
  /* 宽度占满窗口 */
  /* background-color: #333; */
  /* 建议补充背景色，否则阴影可能不明显 */
  color: white;
  padding: 15px 0;
  z-index: 999;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  /* border-bottom: 1px solid #e4e7ed; */
  /* 新增阴影：水平偏移0、垂直偏移2px、模糊10px、透明度20%的黑色阴影 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* 暗黑模式下的边框颜色 */
:deep(.dark) .el-header {
  border-bottom: 1px solid #303133;
  /* 暗黑模式边框颜色 */
}

.el-link {
  margin: 0 8px;
}
</style>
