import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. 根路径直接重定向到 /login（无需额外配置 component）
    {
      path: '/',
      redirect: '/login' // 根路径重定向到登录页
    },
    // 2. 新增 /login 路由，对应 Login 组件
    {
      path: '/login', // 定义 /login 路径
      name: 'Login', // 可选：给路由命名，方便后续通过名称跳转
      component: () => import('@/view/login/UseLogin.vue') // 关联登录组件
    },
    {
      path: '/UseLayout',
      name: 'UseLayout',
      component: () => import('@/view/layout/UseLayout.vue')
    }
  ]
})

export default router
