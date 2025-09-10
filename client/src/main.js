import { createApp } from 'vue'
import App from './App.vue'
// 路由相关
import router from './router'
// Pinia状态管理相关
import pinia from './stores/index'
// Element Plus组件库及样式相关
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css' // Element Plus暗黑模式基础样式
// VueUse暗黑模式工具
import { useDark, useToggle } from '@vueuse/core'

// 创建唯一的Vue应用实例（避免重复创建）
const app = createApp(App)

// 注册所有插件（顺序不影响基础功能，按逻辑分类排列）
app.use(pinia)       // 注册Pinia状态管理
app.use(router)      // 注册路由
app.use(ElementPlus) // 注册Element Plus组件库

// 初始化暗黑模式功能
const isDark = useDark()         // 响应式变量：标记当前是否为暗黑模式
const toggleDark = useToggle(isDark) // 方法：切换明暗模式

// 全局挂载暗黑模式切换方法（所有组件可通过this.$toggleDark调用）
app.config.globalProperties.$toggleDark = toggleDark

// 挂载应用到DOM节点
app.mount('#app')
