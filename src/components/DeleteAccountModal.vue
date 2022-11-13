<script>
import { userStorage } from '@/stores/user'
import AccountService from '@/services/account.service'

export default {
  props: ['modalTitle'],
  emits: {
    accDeleted: null
  },
  setup() {
    const userStore = userStorage()
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
      confirmInput: '',
      isconfirmed: false
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
    async deleleAccount() {
      try {
        await this.userStore.deleteAccount(this.userStore.user.email)
        this.$emit('accDeleted')
      } catch (error) {}
    }
  },
  created() {
    this.errorMsg = ''
    this.isErr = false
  },
  watch: {
    authPass: function () {
      this.isErr = false
    },
    confirmInput: function (value) {
      if (value == this.userStore.user.email) {
        this.isconfirmed = true
      } else {
        this.isconfirmed = false
      }
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
          <form id="verifyAuthForm2" @submit.prevent="verifyAuth">
            <div class="col-12 mb-3">
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="verifydelPass" v-model="authPass" placeholder="Your Current Password" />
                <label for="verifydelPass">Your Current Password</label>
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
            <h5>Are you firmly sure ?</h5>
            <span>
              This action <strong>cannot</strong> be revert. <br />
              This will permanenlty delete your EasyNote account and remove all of your notes. Please consider carefully before delete this account.
            </span>
          </div>
          <form id="confirmForm" @submit.prevent="submitChange">
            <div class="col-12">
              <label for="confirmMsg" class="form-label">
                Please type
                <span class="text_danger">{{ userStore.user.email }} </span> confirm
              </label>
              <input type="text" v-model="confirmInput" class="form-control" id="confirmMsg" autocomplete="nope" />
            </div>
            <div class="col-12">
              <button class="btn btn_del" :disabled="!isconfirmed" @click="deleleAccount">I understand the consequences, delete this account</button>
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
  height: 400px;
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
.btn_del {
  border: 2px solid rgb(220, 0, 0);
  color: red;
  font-weight: bold;
  width: 100%;
  margin: auto;
  margin-top: 15px;
  height: 45px;
  background-color: white;
}
button:hover {
  transform: scale(1.03);
}
.inputError {
  box-shadow: #ff7878 0 0 3px 3px !important;
}
span.text_danger {
  font-weight: 500;
  color: red;
}
</style>
