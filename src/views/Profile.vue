<script>
import router from '@/routers'
import AccountService from '@/services/account.service'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { userStorage } from '@/stores/user'
import { storage } from '@/services/firebase.config.js'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        proPic: '',
        createDate: ''
      },
      errors: {
        isErr: false,
        fNameErr: false,
        lNameErr: false,
        validUpdate: false
      },
      isMainPage: true,
      editedFName: '',
      editedLName: '',
      errorMsg: '',
      newImagePreview: '',
      statistics: {
        totalNotes: null,
        totalDone: null,
        easyScore: null,
        totalDays: null,
        accountCreatedDate: null
      },
      newImageURL: '',
      newImageData: '',
      isImageChanged: false,
      isUploading: false,
      uploadProgress: 0,
      userRole: ''
    }
  },
  setup() {
    const userStore = userStorage()
    return {
      userStore
    }
  },
  methods: {
    async getUser() {
      const token = localStorage.getItem('auth_token')
      this.userRole = localStorage.getItem('role') ?? 'normal'
      try {
        if (token) {
          const token_user = await AccountService.getUser(token)
          if (token_user) {
            await this.userStore.saveUser(token_user.firstName, token_user.lastName, token_user.email, token_user.profilePic, token_user.createDate)
            await this.userStore.getUserNotes(token_user.email)
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
      this.user.firstName = this.userStore.user.firstName
      this.user.lastName = this.userStore.user.lastName
      this.user.fullname = this.user.firstName + ' ' + this.user.lastName
      this.user.email = this.userStore.user.email
      this.user.proPic = this.userStore.user.profilePic
      this.user.createDate = this.userStore.user.createDate
      this.editedFName = this.user.firstName
      this.editedLName = this.user.lastName

      this.getStatistic()
    },
    getStatistic() {
      var count = this.userStore.notes.done.length
      this.statistics.totalDone = count
      count += this.userStore.notes.doing.length
      count += this.userStore.notes.pending.length
      this.statistics.totalNotes = count
      this.statistics.easyScore = this.statistics.totalDone / this.statistics.totalNotes
      this.statistics.easyScore = Math.round(this.statistics.easyScore * 100)
      const dateBuffer = new Date(this.userStore.user.createDate)
      this.statistics.accountCreatedDate =
        dateBuffer.getDate() + ' ' + dateBuffer.toLocaleString('default', { month: 'long' }) + ' ' + dateBuffer.getFullYear()
      const timeDifference = Math.abs(dateBuffer.getTime() - Date.now())
      this.statistics.totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24))
    },
    discardEdit() {
      this.editedFName = this.user.firstName
      this.editedLName = this.user.lastName
    },
    showErrBox(error) {
      this.errorMsg = error
      this.errors.isErr = true
    },
    hideErrBox() {
      this.errorMsg = ''
      this.errors.isErr = false
    },
    async updateInfo() {
      if (this.errors.fNameErr || this.errors.lNameErr || this.isErr) {
        return
      }
      try {
        const newFName = this.editedFName.replace(/\s+/g, ' ')
        const newLName = this.editedLName.replace(/\s+/g, ' ')
        await this.userStore.updateUserInfo(newFName, newLName, null, this.user.email)
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
    },
    async previewImage(event) {
      this.newImageData = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.newImageData)
      reader.onload = (e) => {
        this.newImagePreview = e.target.result
      }
      this.isImageChanged = true
    },
    async uploadImage() {
      const newImageName = Math.floor(Date.now() / 1000) + this.newImageData.name
      const storageRef = ref(storage, `userImages/${newImageName}`)
      const uploadTask = uploadBytesResumable(storageRef, this.newImageData)
      this.isUploading = true
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            this.newImageLink = downloadURL
            await this.userStore.updateUserInfo(this.editedFName, this.editedLName, downloadURL, this.user.email)
            this.informUploaded()
            this.newImageData = ''
            this.isImageChanged = false
            this.isUploading = false
          })
        }
      )
    },
    informUploaded() {
      const message = '<span> <i class="fa-regular fa-circle-check"></i> Profile Image Uploaded </span>'
      this.$toast.success(message, {
        duration: 3000
      })
    }
  },

  async created() {
    await this.getUser()
    this.getUserInfo()
  },

  watch: {
    editedFName: async function (message, oldMess) {
      var trimmedMessage = message.replace(/\s+/g, '').toLowerCase()
      var trimmedFName = this.user.firstName.replace(/\s+/g, '').toLowerCase()
      if (message == null || message == '') {
        this.showErrBox('First Name can not be empty')
        this.errors.fNameErr = true
      } else {
        if (trimmedMessage != trimmedFName) {
          this.errors.validUpdate = true
        } else {
          this.errors.validUpdate = false
        }
        this.errors.fNameErr = false
        this.hideErrBox()
      }
    },
    editedLName: async function (message) {
      var trimmedMessage = message.replace(/\s+/g, '').toLowerCase()
      var trimmedLName = this.user.lastName.replace(/\s+/g, '').toLowerCase()
      if (message == null || message == '') {
        this.showErrBox('Last Name can not be empty')
        this.errors.lNameErr = true
      } else {
        if (trimmedMessage != trimmedLName) {
          this.errors.validUpdate = true
        } else {
          this.errors.validUpdate = false
        }
        this.errors.lNameErr = false
        this.hideErrBox()
      }
    }
  }
}
</script>
<template>
  <Header :isSearch="false" :user-role="userRole"></Header>
  <div class="container">
    <div class="row mt-5">
      <!-- Personal information  -->
      <div class="col-6">
        <div class="personal_info profile_info_ctn">
          <div class="row">
            <span class="profile_info_title">Personal Informations</span>
          </div>
          <div class="row mt-5 mb-3" style="width: 98%; margin: auto">
            <div class="col-5 d-block">
              <img v-if="!newImagePreview" class="avatar_edit" :src="user.proPic" alt="..." />
              <img v-if="newImagePreview" class="avatar_edit" :src="newImagePreview" alt="..." />
              <div class="text-center">
                <label for="files" class="btn btn_avatar"><i class="fa-solid fa-camera"></i> Select New Image</label>
                <input id="files" class="d-none" type="file" @change="previewImage" />
              </div>
            </div>
            <div class="col-7">
              <div class="form-floating mb-2 row">
                <input type="email" class="form-control" v-model="user.email" id="email" disabled />
                <label for="email">Email address</label>
              </div>
              <div class="form-floating mb-2 row">
                <input
                  type="text"
                  name="firstName"
                  v-model="editedFName"
                  id="fname"
                  class="form-control shadow-none"
                  :class="{ inputError: errors.fNameErr }"
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
                  :class="{ inputError: errors.lNameErr }"
                  class="form-control shadow-none outline"
                  placeholder="Last Name"
                  autocomplete="nope" />
                <label for="lastName" class="">Last Name</label>
              </div>
              <div class="row mb-3" v-if="errors.isErr">
                <div class="alert alert-danger alert-dismissible fade show m-auto" role="alert" style="width: 95%">
                  {{ errorMsg }}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div>
              <div class="row mt-3" v-if="errors.validUpdate">
                <button type="button" class="btn btn_saveChange" @click="updateInfo">Save Changes</button>
              </div>
            </div>
          </div>
          <div class="row d-flex justify-content-center align-items-center" style="width: 98%; margin: auto" v-if="isImageChanged">
            <div class="col-3">
              <div>
                <button type="button" class="btn btn_upImage" @click="uploadImage">Upload</button>
              </div>
            </div>
            <div class="col-9">
              <div class="progress" v-if="isUploading">
                <div
                  class="progress-bar progress-bar-striped bg-info"
                  role="progressbar"
                  aria-label="Default striped example"
                  :style="{ width: uploadProgress + '%' }"
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Personal information  -->

      <!-- EasyNote achievement -->
      <div class="col-6">
        <div class="achievement profile_info_ctn">
          <div class="row">
            <span class="profile_info_title">EasyNote Achievements</span>
          </div>
          <div class="row mt-3 d-flex justify-content-center">
            <div class="col-10">
              <div class="row d-flex align-items-center">
                <div class="col-5">
                  <span class="achievement_label"> Total Notes: </span>
                </div>
                <div class="col-7">
                  <span class="achievement_number"> {{ statistics.totalNotes }}</span>
                </div>
              </div>
              <div class="row d-flex align-items-center">
                <div class="col-5">
                  <span class="achievement_label"> Total Notes: </span>
                </div>
                <div class="col-7">
                  <span class="achievement_number"> {{ statistics.totalDone }}</span>
                </div>
              </div>
              <div class="row d-flex align-items-center">
                <div class="col-5">
                  <span class="achievement_label" style="font-size: 24px"> EasyNote Score: </span>
                </div>
                <div class="col-7">
                  <span class="achievement_number"> {{ statistics.easyScore }}</span>
                </div>
              </div>
              <div class="row mb-1 d-flex align-items-center">
                <div class="col-6">
                  <span class="achievement_label"> Total Active Days: </span>
                </div>
                <div class="col-5">
                  <span class="achievement_number"> {{ statistics.totalDays }}</span>
                </div>
              </div>
              <div class="row mb-1 d-flex align-items-center">
                <div class="col-5">
                  <span class="achievement_label"> Created Day: </span>
                </div>
                <div class="col-7">
                  <span class="achievement_date"> {{ statistics.accountCreatedDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of EasyNote achievement -->
    </div>
  </div>

  <Footer></Footer>
</template>

<style scoped>
.container {
  min-height: 100vh;
}

.btn_avatar {
  margin-top: 10px;
  width: 200px;
  border-radius: 0.75rem;
  background-color: #e5ebb2 !important;
  border: 2px solid rgb(0 0 0 / 30%);
  font-weight: 500;
}
.btn_avatar:hover {
  transition: transform 0.3s;
  background-color: rgb(240, 240, 240);
}
.avatar_edit {
  width: 200px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.profile_info_ctn {
  height: 500px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: block;
  border: 3px solid rgb(0 0 0 / 20%);
  box-shadow: rgb(0 0 0 / 20%) 4px 4px 8px 0;
}
.personal_info {
  border-radius: 0.75rem;
  background-color: #b2e5fb;
}
.achievement {
  background-color: #b9f8c5;
  border-radius: 0.75rem;
}
.achievement_label {
  font-size: 26px;
  font-weight: 700;
}
.achievement_number {
  padding: 0px;
  font-size: 45px;
  font-weight: 700;
}
.achievement_date {
  font-size: 30px;
  font-weight: 700;
}
.profile_info_title {
  text-align: center;
  width: 600px;
  margin: auto;
  padding-top: 20px;
  font-weight: 700;
  font-size: 40px;
}
.btn_saveChange {
  margin: auto;
  padding: 10px;
  font-weight: 500;
  width: 270px;
  border-radius: 0.75rem;
  transition: all 0.3s;
  background-color: #b9f8c5;
  border: 2px solid #85d193;
}
.inputError {
  box-shadow: #ff7878 0 0 3px 3px !important;
}
.btn_upImage {
  font-weight: 500;
  width: 130px;
  height: 40px;
  border-radius: 0.75rem;
  transition: all 0.3s;
  background-color: #b9f8c5;
  border: 2px solid #85d193;
}
.btn:hover {
  transform: scale(1.03);
}
</style>
