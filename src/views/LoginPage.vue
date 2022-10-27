<script>
import LogInContainer from '@/components/LogInContainer.vue'
import SignUpContainer from '@/components/SignUpContainer.vue'
import router from '@/routers'
import { useUserStore } from '@/stores/user'
export default {
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  components: {
    LogInContainer,
    SignUpContainer
  },
  data() {
    return {
      anchor: 'login'
    }
  },
  methods: {
    showLogin() {
      this.anchor = 'login'
    },
    showSignup() {
      this.anchor = 'signup'
    },
    onClickChild(value) {
      alert(value)
    },
    accountCreated(payload) {
      this.anchor = 'login'
    }
  },
  created() {
    if (this.userStore.user.email) {
      router.push('/')
    }
  }
}
</script>
<template>
  <div class="container-fluid">
    <div id="login_main" class="container">
      <div class="row text-center">
        <div class="col-md-2 col-xl-3"></div>
        <div class="col-12 col-md-8 col-xl-6">
          <h2 id="login_title">EverNote</h2>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-2 col-xl-3 col-12"></div>
        <div class="col-12 col-md-8 col-xl-6 text-center">
          <div id="login_container" class="bg-light text-center">
            <div class="row">
              <div class="btn-group" role="group" aria-label="Basic radio toggle button group" id="form_select_btn_group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" v-model="anchor" value="login" checked />
                <label class="btn btn-outline-light" for="btnradio1">Log In</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="anchor" value="signup" />
                <label class="btn btn-outline-light" for="btnradio2">Sign Up</label>
              </div>
            </div>
            <div class="row">
              <div class="col-12"></div>
            </div>
            <div class="row">
              <Transition name="slide-up" mode="out-in">
                <div v-if="anchor == 'login'">
                  <LogInContainer @child-call="onClickChild"></LogInContainer>
                </div>
                <div v-else-if="anchor == 'signup'">
                  <SignUpContainer @account-created="accountCreated"></SignUpContainer>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  background-color: #a0e7e5;
}
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
  font-size: 60px;
  font-weight: 1000;
  font-family: cursive;
}

#form_select_btn_group > input {
  background-color: white !important;
}
#form_select_btn_group label {
  text-align: center;
  align-items: center;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  color: black !important;
}
#form_select_btn_group .btn-check:checked + .btn,
.btn.active,
.btn.show,
.btn:first-child:active,
:not(.btn-check) + .btn:active {
  color: black !important;
}
label {
  text-align: center;
  align-items: center;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
}
.btn-outline-light {
  border-radius: 1.5rem 1.5rem 0 0;
  background-color: rgb(195, 195, 195);
  border: none;
  color: black;
}
.btn-outline-light:hover {
  color: black;
  background-color: rgb(220, 220, 220);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
