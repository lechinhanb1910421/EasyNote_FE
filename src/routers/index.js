import { createWebHistory, createRouter } from 'vue-router'
import DashBoard from '@/views/DashBoard.vue'
import LoginPage from '@/views/LoginPage.vue'
import Forgot from '@/components/Forgot.vue'
import Profile from '@/views/Profile.vue'
import FeedBack from '@/views/FeedBack.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: DashBoard
    // components: {
    //   Header: Header,
    //   mainBody: DashBoard,
    //   Footer: Footer
    // }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage

    // components: {
    //   mainBody: LoginPage,
    //   Footer: Footer
    // }
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot

    // components: {
    //   Header: Header,
    //   mainBody: Forgot,
    //   Footer: Footer
    // }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile

    // components: {
    //   Header: Header,
    //   mainBody: Profile,
    //   Footer: Footer
    // }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: FeedBack

    // components: {
    //   mainBody: FeedBack,
    //   Footer: Footer
    // }
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
