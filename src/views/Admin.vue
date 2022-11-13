<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AccountService from '@/services/account.service'
import { adminStorage } from '@/stores/admin'
import { userStorage } from '@/stores/user'
import router from '@/routers'
export default {
  components: {
    Header,
    Footer
  },
  setup() {
    const adminStore = adminStorage()
    const userStore = userStorage()
    return {
      userStore,
      adminStore
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
    this.adminStore.getAllStatistics()
    await this.getUser()
  }
}
</script>
<template>
  <Header :isSearch="false" :user-role="'admin'"></Header>
  <div class="container text-dark" style="min-height: 100vh">
    <div class="row mt-4">
      <div class="col-4">
        <div class="statistics_ctn">
          <div class="row mb-4">
            <span class="container_title">App Statistics</span>
          </div>
          <div class="row px-3 mb-3">
            <h5>Total notes: {{ adminStore.statistic.totalNotes }}</h5>
          </div>
          <div class="row px-3 mb-3">
            <h5>Total accounts: {{ adminStore.statistic.totalAccounts }}</h5>
          </div>
          <div class="row px-3 mb-3">
            <h5>Total feedbacks: {{ adminStore.statistic.totalFeedbacks }}</h5>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="contacts_ctn">
          <div class="row mb-3">
            <span class="container_title">User Contacts</span>
          </div>
          <div class="row px-4">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody v-for="(item, idx) in adminStore.feedbacks.named">
                <tr class="feedback_ctn">
                  <td class="feedback_email">{{ item.email }}</td>
                  <td class="feedback_cate">
                    {{ item.category }}
                  </td>
                  <td class="feedback_desc">
                    {{ item.description }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
.container_title {
  text-align: center;
  margin: auto;
  padding-top: 20px;
  font-weight: 700;
  font-size: 40px;
}

table,
th,
td {
  border: 3px solid rgb(0 0 0 /60%);
}
td {
  padding: 5px;
  overflow: hidden;
  white-space: nowrap;
}
table {
  margin-top: 20px;
  background-color: #f1f1ae;
  table-layout: fixed;
}
thead {
  text-align: center;
  background-color: rgb(0 0 0 /20%);
}
.feedback_desc {
  width: 200px;
  overflow: hidden;
}
</style>
