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
      isDefaultEmail: true
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
    },
    useAnoEmail() {
      this.email = 'anonymous@email.com'
      this.isDefaultEmail = false
    },
    useUserEmail() {
      this.email = this.userStore.user.email
      this.isDefaultEmail = true
    }
  },
  async created() {
    await this.getUser()
    this.email = this.userStore.user.email
    this.isDefaultEmail = true
  }
}
</script>
<template>
  <div class="container-fluid">
    <div id="login_main" class="container">
      <div class="row m-auto">
        <div class="col-12 text-center">
          <h2 id="login_title">EasyNote</h2>
        </div>
        <div class="col-10 m-auto mt-3">
          <div class="row feedback_ctn">
            <div class="col-12 mb-4 text-center">
              <h3>Send feedback to EasyNote</h3>
              <hr style="width: 85%; margin: auto" class="mt-3" />
            </div>
            <div class="col-10 m-auto d-block">
              <form ref="feedbackForm" @submit.prevent="submit">
                <div class="input-group mb-3">
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
                <div class="mb-3">
                  <label for="feedbackFeild" class="form-label ps-3 feedback_labels">Feedback category:</label>
                  <select class="form-select" aria-label="feedback select" id="feedbackFeild">
                    <option class="toption" disabled selected hidden>Select your feedback category</option>
                    <option value="1">Suggestions</option>
                    <option value="2">Report an issue</option>
                    <option value="3">Compliment</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="feedbackDetail" class="form-label ps-3 feedback_labels"> Detail Information:</label>
                  <textarea class="form-control" id="feedbackDetail" rows="3" placeholder="Tell us more about your idea"></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row mt-3">
        <div class="col-12"></div>
      </div> -->
    </div>
  </div>
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
  padding-top: 20px;
  background-color: white;
  height: 500px;
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
  background-color: #b9f8c5 !important;
  border: 2px solid #98d6a3;
}
.text-left {
  margin-left: 0px;
}
.btn:hover {
  transform: scale(1.02);
}
.feedback_labels {
  font-weight: 500;
  font-size: 17px;
}
</style>
