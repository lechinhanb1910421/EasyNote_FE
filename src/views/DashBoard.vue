<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import NoteTodo from '@/components/NoteTodo.vue'
import NoteDoing from '@/components/NoteDoing.vue'
import NoteDone from '@/components/NoteDone.vue'

import { useUserStore } from '@/stores/user'
import AccountService from '@/services/account.service'

import router from '@/routers'

export default {
  components: {
    Header,
    Footer,
    NoteTodo,
    NoteDoing,
    NoteDone
  },
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      profilePic: '',
      userName: '',
      user: {
        firstName: null,
        lastName: null,
        email: null,
        profilePic: null
      }
    }
  },
  methods: {
    async getUser() {
      const token = localStorage.getItem('auth_token')
      try {
        if (token) {
          const token_user = await AccountService.getUser(token)
          if (token_user) {
            this.userStore.saveUser(token_user.firstName, token_user.lastName, token_user.email, token_user.profilePic)
          } else {
            throw new Error('Can not get user with this token')
          }
        } else {
          throw new Error('There is valid no token')
        }
      } catch (error) {
        console.log(error)
        router.push('/login')
      }
    }
  },
  async created() {
    await this.getUser()
    this.userName = this.userStore.user.firstName + ' ' + this.userStore.user.lastName
  }
}
</script>
<template>
  <Header></Header>
  <div class="container text-dark" style="padding-top: 70px; min-height: 100vh">
    <div class="notesPads_Container">
      <div class="noteToDo_ctn notes_ctn"><NoteTodo></NoteTodo></div>
      <div class="noteDoing_ctn notes_ctn"><NoteDoing></NoteDoing></div>
      <div class="noteDone_ctn notes_ctn"><NoteDone></NoteDone></div>
    </div>
  </div>
  <Footer></Footer>
</template>
<style scoped>
.notesPads_Container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.notes_ctn {
  width: 32%;
  padding: 12px;
  box-shadow: rgb(0 0 0 / 30%) 3px 7px 7px 2px;
  border-radius: 0.75rem;
}
.noteToDo_ctn {
  height: 600px;
  background-color: #f1f1ae;
  border: 3px solid #c7c782;
}
.noteDoing_ctn {
  background-color: #b2e5fb;
  border: 3px solid #94cbe2;
}
.noteDone_ctn {
  background-color: #b9f8c5;
  border: 3px solid #98d6a3;
}
</style>
