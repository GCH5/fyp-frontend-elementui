import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import { menuActiveIndex } from 'src/store/store'

export type AppRouteNames = 'home'
| 'about'
| 'queue-analysis'
| 'crowd-counting'

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
      name: 'queue-analysis',
      path: '/queue-analysis',
      component: async () => await import('./pages/QueueAnalysis.vue')
    },
    {
      name: 'queue-analysis-static',
      path: '/queue-analysis-static',
      component: async () => await import('./pages/QueueAnalysisStatic.vue')
    },
    {
      name: 'queue-analysis-live',
      path: '/queue-analysis-live',
      component: async () => await import('./pages/QueueAnalysisLive.vue')
    },
    {
      name: 'crowd-counting',
      path: '/crowd-counting',
      component: async () => await import('./pages/CrowdCounting.vue')
    },
    {
      name: 'crowd-counting-static',
      path: '/crowd-counting-static',
      component: async () => await import('./pages/CrowdCountingStatic.vue')
    },
    {
      name: 'crowd-counting-live',
      path: '/crowd-counting-live',
      component: async () => await import('./pages/CrowdCountingLive.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.path.startsWith('/queue-analysis')) {
    menuActiveIndex.value = '/queue-analysis'
  } else if (to.path.startsWith('/crowd-counting')) {
    menuActiveIndex.value = '/crowd-counting'
  } else {
    menuActiveIndex.value = to.path
  }
})
export { router }
