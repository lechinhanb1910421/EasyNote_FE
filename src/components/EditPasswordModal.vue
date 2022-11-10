<script>
import { useUserStore } from '@/stores/user'
import AccountService from '@/services/account.service'

export default {
  props: ['modalTitle'],
  emits: {
    passwordChanged: null
  },
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      isErr: false,
      isAuth: false,
      errorMsg: '',
      authPass: '',
      newPass: '',
      confNewPass: '',
      isNPErr: false,
      isCPErr: false
    }
  },
  methods: {
    showErrBox(err) {
      this.errorMsg = err
      this.isErr = true
    },
    hideErrBox() {
      this.errorMsg = ''
      this.isErr = false
    },
    async verifyAuth() {
      try {
        const payload = {
          email: this.userStore.user.email,
          password: this.authPass
        }
        await AccountService.login(payload)
        this.isAuth = true
      } catch (error) {
        if (error.response) {
          this.showErrBox(error.response.data.message)
        }
      }
    },
    async submitChange() {
      if (this.newPass == null || this.newPass == '') {
        this.showErrBox('Password can not be empty')
        this.isNPErr = true
        this.isCPErr = true
        return
      }
      if (this.newPass.length <= 4) {
        this.isNPErr = true
        this.showErrBox('Password must has at least 4 characters')
        return
      }
      if (this.newPass !== this.confNewPass) {
        this.isCPErr = true
        this.showErrBox('Confirm Password does not matched')
        return
      }
      try {
        const res = await this.userStore.changePass(this.newPass)
        this.$emit('passwordChanged')
      } catch (error) {}
    },
    hideErrOutline() {}
  },
  created() {
    this.errorMsg = ''
    this.isErr = false
  },
  watch: {
    authPass: function () {
      this.isErr = false
    },
    newPass: function () {
      this.isNPErr = false
      this.isCPErr = false
      this.isErr = false
    },
    confNewPass: function () {
      this.isCPErr = false
      this.isErr = false
    }
  }
}
</script>
<template>
  <div class="modal-dialog modal-md modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="modaltitle">{{ modalTitle }}</span>
        <button type="button" ref="clsModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row" v-if="!isAuth">
          <div class="col-12 mb-2">
            <h5>Please verify your identity</h5>
          </div>
          <form id="verifyAuthForm" @submit.prevent="verifyAuth">
            <div class="col-12 mb-3">
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="verifyPass" v-model="authPass" placeholder="Your Current Password" />
                <label for="verifyPass">Your Current Password</label>
              </div>
              <div class="col-12 mb-3" v-if="isErr">
                <div class="alert alert-danger alert-dismissible fade show m-auto" role="alert">
                  {{ errorMsg }}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="hideErrBox"></button>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn_editPro" @click="verifyAuth">Verify Password</button>
              </div>
            </div>
          </form>
        </div>
        <div class="row" v-else-if="isAuth">
          <div class="col-12 mb-2">
            <h5>Type in your new password</h5>
          </div>
          <form id="changePassForm" @submit.prevent="submitChange">
            <div class="col-12 mb-3">
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="newPass"
                  :class="{ inputError: isNPErr }"
                  v-model="newPass"
                  placeholder="New Password" />
                <label for="newPass">New Password</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="confirmNewPass"
                  :class="{ inputError: isCPErr }"
                  v-model="confNewPass"
                  placeholder="Confirm New Password"
                  @click="hideErrOutline" />
                <label for="confirmNewPass">Confirm New Password</label>
              </div>
              <div class="col-12 mb-3" v-if="isErr">
                <div class="alert alert-danger alert-dismissible fade show m-auto" role="alert">
                  {{ errorMsg }}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn_editPro" @click="submitChange">Change Password</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-dialog {
  width: 700px;
}
.modal-title {
  margin-left: 15px;
  font-size: 24px;
  font-weight: 600;
}
.modal-content {
  margin: auto;
  width: 500px;
  height: 450px;
}
.modal-header {
  background-color: #dfd3c3;
}

.modal-body {
  background-color: #f8ede3;
  padding-left: 30px;
  padding-right: 30px;
}
.btn_editPro {
  width: 100%;
  height: 50px;
  background-color: #b9f8c5;
  font-weight: 500;
  font-size: 18px;
}


button:hover {
  transform: scale(1.03);
}
.inputError {
  box-shadow: #ff7878 0 0 3px 3px !important;
}
</style>
