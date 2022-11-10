<script>
// import router from '@/routers'
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
    useAnoEmail() {
      this.email = 'anonymous@mail.com'
      console.log(this.email)
    }
  },
  created() {
    if (!this.userStore.user.email) {
      this.email = 'anonymous@mail.com'
    } else {
      this.email = this.userStore.user.email
    }
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
                  <button type="button" class="btn_changeEmail" @click="useAnoEmail">Send feed back as anonymous</button>
                </div>
                <div class="mb-3">
                  <label for="feedbackDetail" class="form-label">More Info:</label>
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
  background-color: #f1f1ae;
  border-radius: 0.5rem;
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 7px 0px;
}
.text-left {
  margin-left: 0px;
}
</style>
