import { createWebHistory, createRouter } from 'vue-router'
import DashBoard from '@/views/DashBoard.vue'
import LoginPage from '@/views/LoginPage.vue'
import Forgot from '@/components/Forgot.vue'
import Profile from '@/views/Profile.vue'
import FeedBack from '@/views/FeedBack.vue'
import Admin from '@/views/Admin.vue'
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
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: FeedBack
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name != 'home') {
    const newTitle = to.name.charAt(0).toUpperCase() + to.name.slice(1)
    document.title = 'EasyNote - ' + newTitle
  } else {
    document.title = 'EasyNote'
  }
  next()
})
export default router
