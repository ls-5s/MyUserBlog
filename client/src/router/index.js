import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',

    component: () => import('@/views/layout/MainLayout.vue'),
    redirect: '/layout/home',
    children: [{
      path: '/layout/home',
      component: () => import('@/views/Content.vue/HomePage.vue'),
    }, {
      path: 'layout/about',
      component: () => import('@/views/Content.vue/aboutPage.vue'),
    },{
      path: 'layout/class',
      component: () => import('@/views/Content.vue/classPage.vue'),
    }
  ],
  }],
})

export default router
