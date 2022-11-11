<script>
import router from '@/routers'
import AccountService from '@/services/account.service'
import { useUserStore } from '@/stores/user'
export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },
  data() {
    return {
      email: '',
      isDefaultEmail: true,
      selected: 'Please select a category',
      detailInfo: '',
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
            this.userStore.getUserNotes(token_user.email)
          } else {
            throw new Error('Can not get user with this token')
          }
        } else {
          throw new Error('There is valid no token')
        }
      } catch (error) {
        router.push('/login')
      }
    },
    useAnoEmail() {
      this.email = 'anonymous@email.com'
      this.isDefaultEmail = false
    },
    useUserEmail() {
      this.email = this.userStore.user.email
      this.isDefaultEmail = true
    },
    async submitFeedback() {
      if (this.selected === 'Please select a category') {
        this.errorMsg = 'Please select a category'
        this.isErr = true
        return
      }
      if (this.detailInfo == null || this.detailInfo == '') {
        this.errorMsg = 'Please give us a few detail information about'
        this.isErr = true
        return
      }
      const payload = {
        email: this.email,
        description: this.detailInfo,
        category: this.selected
      }
      await this.userStore.addFeedback(payload)
      $(this.$refs.feedbackModal).modal('show')
      this.isDefaultEmail = true
      this.selected = 'Please select a category'
      this.detailInfo = ''
    },
    goHome() {
      router.push({ name: 'home' })
    },
    
  },
  async created() {
    await this.getUser()
    this.email = this.userStore.user.email
    this.isDefaultEmail = true
    
  },
  watch: {
    selected: function () {
      this.errorMsg = ''
      this.isErr = false
    },
    detailInfo: function () {
      this.errorMsg = ''
      this.isErr = false
    }
  }
}
</script>
<template>
  <div class="container-fluid">
    <div id="login_main" class="container">
      <div class="row m-auto">
        <div class="col-10 m-auto mt-5">
          <div class="row feedback_ctn">
            <div class="col-12 mb-3 text-center">
              <h3>Send feedback to EasyNote</h3>
              <hr style="width: 85%; margin: auto" class="mt-3" />
            </div>
            <div class="col-10 m-auto d-block">
              <form ref="feedbackForm" @submit.prevent="submit">
                <div class="input-group mb-2">
                  <span class="input-group-text" id="email">Email</span>
                  <input type="text" class="form-control" :placeholder="email" aria-label="Email" aria-describedby="email" disabled />
                </div>
                <div class="mb-3">
                  <button type="button" class="btn btn_changeEmail btn_anoEmail" v-if="isDefaultEmail" @click="useAnoEmail">
                    Send feed back as anonymous
                  </button>
                  <button type="button" class="btn btn_changeEmail btn_defEmail" v-if="!isDefaultEmail" @click="useUserEmail">
                    Send feedback as {{ userStore.user.email }}
                  </button>
                </div>
                <div class="mb-2 input-group">
                  <span for="feedbackFeild" class="input-group-text feedback_labels">Feedback category:</span>
                  <select v-model="selected" class="form-select" aria-label="feedback select" id="feedbackFeild">
                    <option disabled selected hidden>Please select a category</option>
                    <option value="Suggestions">Suggestions</option>
                    <option value="Report an issue">Report an issue</option>
                    <option value="Compliments">Compliments</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="feedbackDetail" class="form-label ps-3 feedback_labels"> Detail Information:</label>
                  <textarea
                    class="form-control"
                    id="feedbackDetail"
                    rows="7"
                    placeholder="Tell us more about your idea"
                    maxlength="1024"
                    v-model="detailInfo"></textarea>
                </div>
                <div id="error_box" class="mb-3" v-if="isErr">
                  <div class="alert alert-danger alert-dismissible fade show m-auto" role="alert">
                    {{ errorMsg }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-10 m-auto d-flex justify-content-between align-items-center">
              <button type="button" class="btn btn_control btn_anoEmail">
                <router-link to="/" style="color: black"> Back to Dashboard </router-link>
              </button>
              <button type="button" class="btn btn_control btn_sendFeedback" @click="submitFeedback">Send Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Success inform modal  -->
  <div
    class="modal fade"
    id="feedbackModal"
    ref="feedbackModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="feedbackTitle"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="feedbackTitle">Thank you for your support!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <span class="modal_text">Your feedback has been sent.</span>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn_sendFeedback btn_control" data-bs-dismiss="modal" @click="goHome">Back to Dashboard</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Success inform modal  -->
</template>
<style scoped>
#login_main {
  min-height: 100vh;
  display: block;
}
#login_container {
  width: 80%;
  margin-left: 10%;
  height: fit-content;
  border-radius: 1.5rem;
  box-shadow: rgb(0 0 0 / 20%) 4px 4px 7px 0;
}
#login_title {
  margin-top: 20px;
  font-size: 50px;
  font-weight: 1000;
  font-family: cursive;
}
.feedback_ctn {
  display: block;
  margin: auto;
  width: 600px;
  height: 610px;
  padding-top: 20px;
  background-color: white;
  border-radius: 1rem;
  border: 2px solid rgb(0 0 0 / 15%);
  box-shadow: rgb(0 0 0 / 20%) 3px 3px 9px 2px;
}
.btn_changeEmail {
  font-weight: 500;
  font-size: 17px;
  width: 100%;
  height: 40px;
  background-color: #f1f1ae !important;
  border: 2px solid #c7c782;
  border-radius: 0.5rem;
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 7px 0px;
  transition: all 0.3s;
}
.btn_anoEmail {
  background-color: #f1f1ae !important;
  border: 2px solid #c7c782;
}
.btn_defEmail {
  background-color: #b2e5fb !important;
  border: 2px solid #94cbe2;
}
#feedbackDetail {
  resize: none;
}
.btn:hover {
  transform: scale(1.02);
}
.feedback_labels {
  font-weight: 500;
  font-size: 17px;
}
.btn_control {
  flex: 1;
  max-width: 225px;
  font-weight: 500;
}
.btn_sendFeedback {
  background-color: #b9f8c5 !important;
  border: 2px solid #98d6a3;
}
</style>
