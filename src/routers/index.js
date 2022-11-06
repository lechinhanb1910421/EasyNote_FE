import { createWebHistory, createRouter } from 'vue-router'
import DashBoard from '@/views/DashBoard.vue'
import LoginPage from '@/views/LoginPage.vue'
import Forgot from '@/components/Forgot.vue'
import Profile from '@/views/Profile.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      Header: Header,
      mainBody: DashBoard,
      Footer: Footer
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      mainBody: LoginPage,
      Footer: Footer
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    components: {
      Header: Header,
      mainBody: Forgot,
      Footer: Footer
    }
  },
  {
    path: '/profile',
    name: 'profile',
    components: {
      Header: Header,
      mainBody: Profile,
      Footer: Footer
    }
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
