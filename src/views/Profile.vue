<script>
import router from '@/routers'
import AccountService from '@/services/account.service'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      userName: '',
      userEmail: '',
      userProPic: '',
      editedFName: '',
      editedLName: '',
      errorMsg: '',
      isErr: false,
      fNameErr: false,
      lNameErr: false,
      validUpdate: false,
      isMainPage: true
    }
  },
  setup() {
    const userStore = useUserStore()
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
    },
    getUserInfo() {
      this.firstName = this.userStore.user.firstName
      this.lastName = this.userStore.user.lastName
      this.userName = this.firstName + ' ' + this.lastName
      this.userEmail = this.userStore.user.email
      this.userProPic = this.userStore.user.profilePic
      this.editedFName = this.firstName
      this.editedLName = this.lastName
    },
    discardEdit() {
      this.editedFName = this.firstName
      this.editedLName = this.lastName
    },
    showErrBox(error) {
      this.errorMsg = error
      this.isErr = true
    },
    hideErrBox() {
      this.errorMsg = ''
      this.isErr = false
    },
    async updateInfo() {
      if (this.fNameErr || this.lNameErr || this.isErr) {
        return
      }
      try {
        await this.userStore.updateUserInfo(this.editedFName, this.editedLName, this.userEmail)
        await this.getUser()
        this.getUserInfo()
        this.$router.go({ name: 'profile' })
      } catch (error) {}
    },
    showPassModal() {
      this.isMainPage = false
    },
    showMainModal() {
      this.isMainPage = true
    }
  },
  async created() {
    await this.getUser()
    this.getUserInfo()
  },

  watch: {
    editedFName: async function (message) {
      if (message == null || message == '') {
        this.showErrBox('First Name can not be empty')
        this.fNameErr = true
      } else {
        if (message != this.firstName) {
          this.validUpdate = true
        } else {
          this.validUpdate = false
        }
        this.fNameErr = false
        this.hideErrBox()
      }
    },
    editedLName: async function (message) {
      if (message == null || message == '') {
        this.showErrBox('Last Name can not be empty')
        this.lNameErr = true
      } else {
        if (message != this.lastName) {
          this.validUpdate = true
        } else {
          this.validUpdate = false
        }
        this.lNameErr = false
        this.hideErrBox()
      }
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-3 mb-3 d-flex profile_info">
        <div class="profile_pic">
          <img :src="userProPic" alt="..." height="150" width="150" class="rounded-circle" />
        </div>
        <div class="general_info">
          <p class="prof_userName">{{ userName }}</p>
          <p class="prof_userEmail">{{ userEmail }}</p>
        </div>
        <div class="edit_ctn">
          <button class="btn btn_editProfile" type="button" data-bs-toggle="modal" data-bs-target="#edit_profile">
            <i class="fa-solid fa-pen-to-square"></i>
            Edit
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div id="" class="col-4">
        <div class="total_notes"></div>
      </div>
      <div id="" class="col-4">
        <div class="total_notes">Show total notes done</div>
      </div>
      <div id="" class="col-4">
        <div class="total_notes">Show total EasyNote score</div>
      </div>
    </div>
  </div>

  <!-- Modal  Edit Profile info -->
  <div
    class="modal fade modal-lg"
    id="edit_profile"
    ref="edit_profile"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Profile Information</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="discardEdit"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4 d-block">
              <img class="avatar_edit" :src="userProPic" alt="..." />
              <div>
                <label for="files" class="btn btn_avatar"><i class="fa-solid fa-camera"></i> Select Image</label>
                <input id="files" class="d-none" type="file" />
              </div>
            </div>
            <div class="col-8">
              <div class="form-floating mb-2 row">
                <input type="email" class="form-control" v-model="userEmail" id="email" disabled />
                <label for="email">Email address</label>
              </div>
              <div class="form-floating mb-2 row">
                <input
                  type="text"
                  name="firstName"
                  v-model="editedFName"
                  id="fname"
                  class="form-control shadow-none"
                  :class="{ inputError: fNameErr }"
                  placeholder="First Name"
                  autocomplete="nope" />
                <label for="firstName">First Name</label>
              </div>

              <div class="form-floating row mb-2">
                <input
                  type="text"
                  name="lastName"
                  v-model="editedLName"
                  id="lname"
                  :class="{ inputError: lNameErr }"
                  class="form-control shadow-none outline"
                  placeholder="Last Name"
                  autocomplete="nope" />
                <label for="lastName" class="">Last Name</label>
              </div>
              <div class="row mb-3" v-if="isErr">
                <div class="alert alert-danger alert-dismissible fade show m-auto" role="alert" style="width: 95%">
                  {{ errorMsg }}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
              <!-- <div class="row mb-2">
                <div class="col-6 pe-1">
                  <button type="button" class="btn btn_danger btn_delAccount">Delete Account</button>
                </div>
                <div class="col-6 ps-1">
                  <button type="button" class="btn btn_danger btn_changePwd" @click="showPassModal">Change Password</button>
                </div>
              </div> -->
            </div>
            <div class="col-8" v-if="!isMainPage">
              <div>
                <h5>Change EasyNote Password</h5>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="changePass" />
                <label for="changePass">New Password</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="passConfirm" />
                <label for="passConfirm">Comfirm Password</label>
              </div>
              <div class="row mb-3" v-if="isErr">
                <div class="alert alert-danger alert-dismissible fade show m-auto" role="alert" style="width: 95%">
                  {{ errorMsg }}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-6 pe-1">
                  <button type="button" class="btn btn_danger btn_delAccount" @click="showMainModal">Discard Change</button>
                </div>
                <div class="col-6 ps-1">
                  <button type="button" class="btn btn_danger btn_changePwd">Submit and Log Out</button>
                </div>
              </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn_delAccount" data-bs-dismiss="modal" @click="discardEdit">Discard and Close</button>
          <button type="button" class="btn btn_saveChange" @click="updateInfo" :disabled="!validUpdate" data-bs-dismiss="modal">
            Update Information
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
}
.profile_info {
  margin: auto;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 20px 0px;
  background-color: #fffcf2;
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 20%) 3px 3px 8px 0;
}

.general_info {
  margin-left: 20px;
}
.prof_userName {
  margin: 0;
  font-size: 36px;
  font-weight: bold;
}
.prof_userEmail {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}
.edit_ctn {
  display: block;
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.btn_editProfile {
  width: 100px;
  font-weight: 500;
  background-color: rgb(220, 220, 220);
}

.modal-content {
  width: 650px;
  height: 400px;
  margin: auto;
  background-color: #f8ede3;
}
.modal-body {
  margin: 20px;
}
.btn_avatar {
  margin-top: 10px;
  width: 150px;
  border: 2px solid black;
  border-radius: 0.75rem;
  background-color: rgb(220, 220, 220);
}
.btn_avatar:hover {
  background-color: rgb(240, 240, 240);
}
.avatar_edit {
  aspect-ratio: 1/1;
  width: 150px;
  border-radius: 50%;
}

.btn_danger {
  width: 100%;
  border-radius: 0.75rem;
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 7px 0;
  transition: all 0.3s;
}
.btn_danger:hover {
  transform: scale(1.03);
}
.btn_changePwd {
  background-color: #b2e5fb;
  border: 2px solid #93cae1;
}

.btn_delAccount {
  background-color: #ff7878;
  border: 2px solid #d65353;
}

.total_notes {
  margin-left: 10px;
  margin-right: 10px;
  background-color: #b9f8c5;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-header {
  background-color: #dfd3c3;
}
.modal-footer {
  justify-content: space-around;
  background-color: #b19c8f;
}
.modal-footer button {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  max-width: 270px;
  transition: all 0.3s;
}
.modal-footer button:hover {
  transform: scale(1.03);
}
.btn_saveChange {
  background-color: #b9f8c5;
  border: 2px solid #85d193;
}
.inputError {
  box-shadow: #ff7878 0 0 3px 3px !important;
}
</style>
