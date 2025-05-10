import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseDetails from '../views/CourseDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/CourseList.vue')
    },
    { path: '/courses/:id',
      name: CourseDetails,
      props: true,
      component: CourseDetails
    },
    {
      path: '/beginner',
      name: 'BeginnerPath',
      component: () => import('@/views/learning-paths/Beginner.vue'),
      meta: { title: 'Beginner Learning Path' }

    },
    {
      path: '/intermediate',
      name: 'IntermediatePath',
      component: () => import('@/views/learning-paths/Intermediate.vue'),
      meta: { title: 'Intermediate Learning Path' }
    },
    {
      path: '/advanced',
      name: 'AdvancedPath',
      component: () => import('@/views/learning-paths/Advanced.vue'),
      meta: { title: 'Advanced Learning Path' }
    },
  ]
})

export default router
