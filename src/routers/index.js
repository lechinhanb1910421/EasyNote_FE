import { createWebHistory, createRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Forgot from '@/components/Forgot.vue'
import Signup from '@/components/Signup.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      header: Header,
      mainBody: HomePage
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      mainBody: LoginPage
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    components: {
      header: Header
    }
  },
  {
    path: '/signup',
    name: 'signup',
    components: {
      mainBody: Signup
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
