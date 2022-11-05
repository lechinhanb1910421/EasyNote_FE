import { createWebHistory, createRouter } from 'vue-router'
import DashBoard from '@/views/DashBoard.vue'
import LoginPage from '@/views/LoginPage.vue'
import Forgot from '@/components/Forgot.vue'
import Welcome from '@/views/Welcome.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashBoard
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name != 'home') {
    const newTitle = to.name.charAt(0).toUpperCase() + to.name.slice(1)
    document.title = 'EverNote - ' + newTitle
  } else {
    document.title = 'EverNote'
  }
  next()
})
export default router
