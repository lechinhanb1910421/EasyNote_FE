<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AccountService from '@/services/account.service'
import { userStorage } from '@/stores/user'
import router from '@/routers'
export default {
  components: {
    Header,
    Footer
  },
  setup() {
    const userStore = userStorage()
    return {
      userStore
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
            this.userStore.getUserNotes(token_user.email)
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
  }
}
</script>
<template>
  <Header :isSearch="false" :isAdmin="true"></Header>
  <div class="container text-dark" style="min-height: 100vh">
    <div class="row mt-4">
      <div class="col-4">
        <div class="statistics_ctn">
          <h2>Statistics</h2>
        </div>
      </div>
      <div class="col-8">
        <div class="contacts_ctn">
          <h2>User Contacts</h2>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<style>
.statistics_ctn {
  height: 500px;
  background-color: #b2e5fb;
  border-radius: 0.75rem;
}
.contacts_ctn {
  height: 500px;
  background-color: #b9f8c5;
  border-radius: 0.75rem;
}
</style>
