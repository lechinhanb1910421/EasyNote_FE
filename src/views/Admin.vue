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
  data() {
    return {
      currentFBType: 'named'
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
    },
    displayNamedFB() {
      this.currentFBType = 'named'
    },
    displayAnoFB() {
      this.currentFBType = 'anonymous'
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
        <section class="statistics_ctn">
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
        </section>
      </div>
      <div class="col-8">
        <section class="feedbacks_section">
          <div class="row mb-3">
            <span class="container_title">User Contacts</span>
          </div>
          <div class="row feedback_type_ctn">
            <button class="btn btn_feedbackType btn_blue" type="button" @click="displayNamedFB">Named Feedbacks</button>
            <button class="btn btn_feedbackType btn_yellow" type="button" @click="displayAnoFB">Anonymous Feedback</button>
          </div>
          <div class="row">
            <div class="col-12 mb-2" v-if="!adminStore.feedbacks.named.length">
              <div class="row feedback feedback_empty">There is no feedbacks</div>
            </div>
            <div class="col-12 feedbacks_ctn bg_blue" v-if="currentFBType == 'named'">
              <div v-for="item in adminStore.feedbacks.named">
                <button class="feedback row mb-2" type="button">
                  <div class="col-12">
                    <div class="feedback_header">
                      <p class="overflow_ellipsis feedbacks_email_ctn">
                        <strong> Email: </strong>
                        {{ item.email }}
                      </p>
                      <p class="overflow_ellipsis feedbacks_cate_ctn">
                        <strong> Category: </strong>
                        {{ item.category }}
                      </p>
                      <p class="overflow_ellipsis feedbacks_date_ctn">
                        <strong> Date: </strong>
                        {{ item.createDate }}
                      </p>
                    </div>
                  </div>
                  <div class="col-12" style="text-align: left">
                    <p class="feedback_desc_ctn overflow_ellipsis">
                      <strong>Description:</strong>
                      {{ item.description }}
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <div class="col-12 feedbacks_ctn bg_yellow" v-if="currentFBType == 'anonymous'">
              <div v-for="item in adminStore.feedbacks.anonymous">
                <button class="feedback row mb-2" type="button">
                  <div class="col-12">
                    <div class="feedback_header">
                      <p class="overflow_ellipsis feedbacks_email_ctn">
                        <strong> Email: </strong>
                        {{ item.email }}
                      </p>
                      <p class="overflow_ellipsis feedbacks_cate_ctn">
                        <strong> Category: </strong>
                        {{ item.category }}
                      </p>
                      <p class="overflow_ellipsis feedbacks_date_ctn">
                        <strong> Date: </strong>
                        {{ item.createDate }}
                      </p>
                    </div>
                  </div>
                  <div class="col-12" style="text-align: left">
                    <p class="feedback_desc_ctn overflow_ellipsis">
                      <strong>Description:</strong>
                      {{ item.description }}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<style>
.statistics_ctn {
  height: 630px;
  background-color: #b2e5fb !important;
  border-radius: 0.75rem;
}
.feedbacks_section {
  height: 630px;
  background-color: #b9f8c5 !important;
  border-radius: 0.75rem;
}
.feedback_type_ctn {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: auto;
}
.btn_feedbackType {
  margin: 5px;
  max-width: 300px;
  font-size: 20px;
  font-weight: 500;
  border: 2px solid rgb(0 0 0 /30%);
  box-shadow: rgb(0 0 0 /35%) 2px 2px 6px 0;
  transition: all 0.3s;
}
.btn_yellow {
  background-color: #f1f1ae;
}
.btn_yellow:hover {
  transform: scale(1.03);
  background-color: #c7c782;
}
.btn_blue {
  background-color: #b2e5fb;
}
.btn_blue:hover {
  background-color: #94cbe2;
  transform: scale(1.03);
}
.feedbacks_ctn {
  padding: 0;
  padding-top: 10px;
  margin: auto;
  width: 94%;
  border-radius: 0.5rem;
  border: 2px solid rgb(0 0 0 /30%);
  box-shadow: rgb(0 0 0 /35%) 2px 2px 6px 0;
  max-height: 400px;
  overflow: scroll;
}

.feedbacks_ctn::-webkit-scrollbar {
  display: none;
}
.bg_blue {
  background-color: #b2e5fb;
}
.bg_yellow {
  background-color: #f1f1ae;
}
.feedback_empty {
  height: 60px;
  font-size: 18px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 10px;
}
.container_title {
  text-align: center;
  margin: auto;
  padding-top: 20px;
  font-weight: 700;
  font-size: 40px;
}
.feedback {
  width: 97%;
  margin: auto;
  background-color: aliceblue;
  border: 2px solid rgb(0 0 0 /30%);
  box-shadow: rgb(0 0 0 /40%) 2px 2px 5px 0;
  border-radius: 0.5rem;
}
.feedback_header {
  width: 100%;
  display: flex;
  align-items: left;
  height: 40px;
}

.feedbacks_email_ctn {
  text-align: left;
  font-weight: 500;
  margin: auto;
  width: 350px;
  overflow: hidden;
}
.feedbacks_cate_ctn {
  text-align: left;
  font-weight: 500;
  margin: auto;
  width: 250px;
}

.feedbacks_date_ctn {
  text-align: left;
  font-weight: 500;
  margin: auto;
  width: 190px;
}

.feedback_desc_ctn {
  text-align: left;
  margin-left: 0;
  margin-top: auto;
  margin-bottom: 0;
  width: 780px;
  height: 40px;
}
.overflow_ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
