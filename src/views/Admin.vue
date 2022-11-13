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
      currentFBType: 'named',
      detailFeedback: {
        id: '',
        email: '',
        desc: '',
        category: '',
        createDate: ''
      },
      isErr: false,
      errorMsg: ''
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
    },
    showDetailFeedback(payload) {
      this.detailFeedback.id = payload._id
      this.detailFeedback.email = payload.email
      this.detailFeedback.desc = payload.description
      this.detailFeedback.category = payload.category
      this.detailFeedback.createDate = payload.createDate
      $(this.$refs.detailFeedback).modal('show')
    },
    resetDetailfeedback() {
      this.detailFeedback.id = ''
      this.detailFeedback.email = ''
      this.detailFeedback.desc = ''
      this.detailFeedback.category = ''
      this.detailFeedback.createDate = ''
      $(this.$refs.detailFeedback).modal('hide')
    },
    async deleteFeedback() {
      try {
        await this.adminStore.deleteFeedback(this.detailFeedback.id)
      } catch (error) {}
      this.resetDetailfeedback()
      const message = '<span> <i class="fa-regular fa-circle-check"></i> Feedback was deleted </span>'
      this.$toast.success(message, {
        duration: 3000
      })
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
          <div class="row mb-2">
            <div class="d-flex align-items-center justify-content-center">
              <span class="statistic_text"> Total notes: </span>
              <span class="statistic_number"> {{ adminStore.statistic.totalNotes }}</span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="d-flex align-items-center justify-content-center">
              <span class="statistic_text"> Total Accounts: </span>
              <span class="statistic_number"> {{ adminStore.statistic.totalAccounts }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="d-flex align-items-center justify-content-center">
              <span class="statistic_text"> Total Feedbacks: </span>
              <span class="statistic_number"> {{ adminStore.statistic.totalFeedbacks }}</span>
            </div>
          </div>
        </section>
      </div>
      <div class="col-8">
        <section class="feedbacks_section">
          <div class="row mb-3">
            <span class="container_title">User Feedbacks</span>
          </div>
          <div class="row feedback_type_ctn">
            <button class="btn btn_feedbackType btn_blue" type="button" @click="displayNamedFB">Named Feedbacks</button>
            <button class="btn btn_feedbackType btn_yellow" type="button" @click="displayAnoFB">Anonymous Feedbacks</button>
          </div>
          <div class="row">
            <div class="col-12 mb-2" v-if="!adminStore.feedbacks.named.length">
              <div class="row feedback feedback_empty">There is no feedbacks</div>
            </div>
            <div class="col-12 feedbacks_ctn bg_blue" v-if="currentFBType == 'named'">
              <div v-for="item in adminStore.feedbacks.named">
                <button class="feedback row mb-2" type="button" @click="showDetailFeedback(item)">
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
                <button class="feedback row mb-2" type="button" @click="showDetailFeedback(item)">
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

  <!-- Detail feedback modal -->
  <div
    class="modal fade modal-lg"
    id="detailFeedback"
    ref="detailFeedback"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title" id="detailNoteTitle">
            <i class="fa-solid fa-message"></i>
            User Feedback
          </span>
          <button type="button" ref="clsModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <span class="feedbackEmail"><strong>From: </strong> {{ detailFeedback.email }}</span>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <span class="feedbackCate"><strong> Category:</strong> {{ detailFeedback.category }}</span>
            </div>
            <div class="col-6">
              <span class="feedbackDate"><strong> Created Date:</strong> {{ detailFeedback.createDate }}</span>
            </div>
          </div>
          <div class="mb-3">
            <span class="detailFB_labels">Detail Description:</span>
            <p class="detailFB_desc">{{ detailFeedback.desc }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn_bg_red" @click="deleteFeedback">Delete Feedback</button>
          <button type="button" class="btn btn_bg_red" data-bs-dismiss="modal">Close Feedback</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Detail feedback modal -->
  <Footer></Footer>
</template>
<style scoped>
.statistics_ctn {
  height: 630px;
  background-color: #b2e5fb !important;
  border-radius: 0.75rem;
  border: 3px solid rgb(0 0 0 / 20%);
  box-shadow: rgb(0 0 0 /35%) 3px 3px 8px 0;
}
.statistic_text {
  font-size: 26px;
  font-weight: 500;
}
.statistic_number {
  margin-left: 20px;
  font-weight: bold;
  font-size: 60px;
}
.feedbacks_section {
  height: 630px;
  background-color: #b9f8c5 !important;
  border-radius: 0.75rem;
  border: 3px solid rgb(0 0 0 / 20%);
  box-shadow: rgb(0 0 0 /35%) 3px 3px 8px 0;
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
  max-height: 440px;
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
  transition: all 0.2s;
}
.feedback:hover {
  transform: scale(1.02);
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
  width: 750px;
  height: 40px;
}
.overflow_ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.modal-title {
  margin-left: 15px;
  font-size: 24px;
  font-weight: 600;
}
.modal-content {
  margin: auto;
  width: 600px;
  height: 600px;
}
.modal-header {
  background-color: #dfd3c3;
}

.modal-body {
  background-color: #f8ede3;
  padding-left: 30px;
  padding-right: 30px;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  padding-left: 7%;
  padding-right: 7%;
  background-color: #b19c8f;
}
.modal-footer button {
  max-width: 230px;
  font-weight: 500;
  font-size: 16px;
  width: 50%;
  color: black;
  transition: transform 0.2s;
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
}
.btn_bg_red {
  background-color: #ff7878 !important;
}

.feedbackEmail {
  font-size: 24px;
  font-weight: 500;
}
.feedbackCate,
.feedbackDate {
  font-size: 20px;
  font-weight: 500;
}
.detailFB_labels {
  font-size: 20px;
  font-weight: bold;
}
.detailFB_desc {
  font-size: 18px;
}
</style>
