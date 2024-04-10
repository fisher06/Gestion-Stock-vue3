import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { stockRoute } from '@/stock/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import('../views/LegalView.vue')
    },
    stockRoute,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/notFound'
    },
    {
      path: '/notFound',
      name: '404',
      component: NotFoundView
    }
  ]
})

export default router
