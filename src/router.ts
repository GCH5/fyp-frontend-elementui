import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'

export type AppRouteNames = 'home'
  | 'about'
  | 'analyze-video'
import { menuActiveIndex } from 'src/store/store'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('./pages/About.vue'),
    },
    {
      name: 'analyze-video',
      path: '/analyze-video',
      component: () => import('./pages/AnalyzeVideo.vue'),
    },
  ],
})
router.beforeEach((to, from) => {
  menuActiveIndex.value = to.path;
})
export { router }