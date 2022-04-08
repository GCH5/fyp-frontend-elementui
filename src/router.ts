import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import { menuActiveIndex } from 'src/store/store'

export type AppRouteNames = 'home'
| 'about'
| 'analyze-video'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'about',
      path: '/about',
      component: async () => await import('./pages/AboutPage.vue')
    },
    {
      name: 'analyze-video',
      path: '/analyze-video',
      component: async () => await import('./pages/AnalyzeVideo.vue')
    }
  ]
})
router.beforeEach((to) => {
  menuActiveIndex.value = to.path
})
export { router }
