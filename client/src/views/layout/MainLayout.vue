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
          我的
        </el-link>
        <el-link type="primary" href="/layout/class" class="nav-link" :underline="false">
          <!-- Class 图标 + 文字 -->
          <el-icon class="mr-2">
            <Filter /><!-- Element UI 内置的班级填充图标 -->
          </el-icon>
          学习路径
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
      <!-- <el-footer>
        <div class="text-red-500">2024 全栈开发者</div>
      </el-footer> -->

    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
// 1. 导入 Element Plus 图标组件（必须导入，否则图标不显示）
import { ElIcon } from 'element-plus'
import { Moon, Sunny, HomeFilled, InfoFilled, Filter } from '@element-plus/icons-vue'

// 2. 响应式变量：默认亮色模式（isDark 初始为 false）
const isDark = ref(false)
const currentThemeColor = ref('#6366f1') // 默认紫色系
const htmlEl = document.documentElement  // 获取根标签 <html>


// 3. 定义图标组件（用 h 函数创建图标实例，适配 el-switch 要求）
const ActiveIcon = h(ElIcon, null, { default: () => h(Moon) })    // 暗黑模式：月亮图标
const InactiveIcon = h(ElIcon, null, { default: () => h(Sunny) })  // 亮色模式：太阳图标

// 4. 页面加载时恢复上次主题（localStorage 持久化，刷新不丢失）
onMounted(() => {
  const savedTheme = localStorage.getItem('appTheme')
  const savedColor = localStorage.getItem('themeColor')

  if (savedTheme === 'dark') {
    isDark.value = true
    htmlEl.classList.add('dark')
  }

  if (savedColor) {
    currentThemeColor.value = savedColor
    updateThemeColor(savedColor)
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

// // 更改主题颜色 - 简化版本
// const changeThemeColor = () => {
//   updateThemeColor(currentThemeColor.value)
//   localStorage.setItem('themeColor', currentThemeColor.value)
// }

// 更新CSS变量
const updateThemeColor = (color) => {
  document.documentElement.style.setProperty('--theme-primary-color', color)
  // 根据主色调计算深色模式下的对应颜色
  const darkColor = calculateDarkModeColor(color)
  document.documentElement.style.setProperty('--theme-primary-color-dark', darkColor)

  // 同时更新开关的激活颜色
  document.documentElement.style.setProperty('--el-switch-on-color', color)
}

// 简单计算深色模式下的对应颜色
const calculateDarkModeColor = (color) => {
  // 这里只是简单示例，实际项目中可以使用更复杂的颜色转换算法
  // 移除#号
  const hex = color.replace('#', '')
  // 解析RGB值
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  // 降低亮度以适应深色模式
  const factor = 0.7 // 调整因子，可以根据需要修改
  const darkR = Math.floor(r * factor)
  const darkG = Math.floor(g * factor)
  const darkB = Math.floor(b * factor)
  // 转回十六进制
  return `rgb(${darkR}, ${darkG}, ${darkB})`
}
</script>

<style scoped>
/* 优化开关样式：调整颜色和图标大小，提升视觉效果 */
.el-switch {
  /* 暗黑模式开关激活色（紫色系，更具现代感） */
  --el-switch-on-color: var(--theme-primary-color, #6366f1);
  /* 亮色模式开关未激活色（柔和的浅灰色） */
  --el-switch-off-color: #cbd5e1;
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
  z-index: 999;
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
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
}

/* 暗黑模式下的边框颜色 */
:deep(.dark) .el-header {
  border-bottom: 1px solid #303133;
  /* 暗黑模式边框颜色 */
}

.el-link {
  margin: 0 8px;
  transition: color 0.3s ease;
}

/* 链接悬停效果 */
.el-link:hover {
  color: var(--theme-primary-color, #6366f1) !important;
}

/* 调整主内容区域的上边距，避免被固定的头部遮挡 */
.el-main {
  padding-top: 80px;
}
</style>
