<script>
import router from '@/routers'
import AccountService from '@/services/account.service'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useUserStore } from '@/stores/user'
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
        proPic: ''
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
        easyScore: null
      },
      newImageURL: '',
      newImageData: '',
      isImageChanged: false,
      isUploading: false,
      uploadProgress: 0
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
            await this.userStore.saveUser(token_user.firstName, token_user.lastName, token_user.email, token_user.profilePic)
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
      this.statistics.easyScore = Math.round(this.statistics.easyScore * 100) / 100
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
        await this.userStore.updateUserInfo(this.editedFName, this.editedLName, this.user.email)
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
      if (message == null || message == '') {
        this.showErrBox('First Name can not be empty')
        this.errors.fNameErr = true
      } else {
        if (message != this.user.firstName) {
          this.errors.validUpdate = true
        } else {
          this.errors.validUpdate = false
        }
        this.errors.fNameErr = false
        this.hideErrBox()
      }
    },
    editedLName: async function (message) {
      if (message == null || message == '') {
        this.showErrBox('Last Name can not be empty')
        this.errors.lNameErr = true
      } else {
        if (message != this.user.lastName) {
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
  <Header></Header>
  <div class="container">
    <!-- <div class="row">
      <div class="col-12 mt-3 mb-3 d-flex profile_info">
        <div class="profile_pic">
          <img :src="user.proPic" alt="..." height="150" width="150" class="rounded-circle" />
        </div>
        <div class="general_info">
          <p class="prof_userName">{{ user.fullname }}</p>
          <p class="prof_userEmail">{{ user.email }}</p>
        </div>
        <div class="edit_ctn">
          <button class="btn btn_editProfile" type="button" data-bs-toggle="modal" data-bs-target="#edit_profile">
            <i class="fa-solid fa-pen-to-square"></i>
            Edit Profile
          </button>
        </div>
      </div>
    </div> -->
    <div class="row mt-4">
      <div class="col-6">
        <div class="personal_info profile_info_ctn">
          <div class="row">
            <span class="profile_info_title">Personal Informations</span>
          </div>
          <div class="row mt-5 mb-3" style="width: 90%; margin: auto">
            <div class="col-4 d-block">
              <img v-if="!newImagePreview" class="avatar_edit" :src="user.proPic" alt="..." />
              <img v-if="newImagePreview" class="avatar_edit" :src="newImagePreview" alt="..." />
              <!-- <img v-if="newImagePreview" class="avatar_edit" :src="newImageLink" alt="..." height="200" width="200" /> -->
              <div v-if="!isImageChanged">
                <label for="files" class="btn btn_avatar"><i class="fa-solid fa-camera"></i> Select Image</label>
                <input id="files" class="d-none" type="file" @change="previewImage" />
              </div>
              <div v-if="isImageChanged">
                <button type="button" class="btn btn_upImage" @click="uploadImage">Upload Image</button>
              </div>
              <!-- <button type="button" @click="uploadImage">upload image</button> -->
            </div>
            <div class="col-8">
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
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-10">
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
          <div class="row mt-3 d-flex justify-content-center">
            <div class="col-10 d-flex justify-content-center">
              <button type="button" class="btn btn_saveChange" @click="updateInfo" :disabled="!errors.validUpdate" data-bs-dismiss="modal">
                Update Information
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="achievement profile_info_ctn">
          <span class="profile_info_title">EasyNote Achievements</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal  Edit Profile info -->
  <!-- <div
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
              <img class="avatar_edit" :src="user.proPic" alt="..." />
              <div>
                <label for="files" class="btn btn_avatar"><i class="fa-solid fa-camera"></i> Select Image</label>
                <input id="files" class="d-none" type="file" />
              </div>
            </div>
            <div class="col-8">
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
              <div class="row mb-3" v-if="errors.isErr">
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
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn_delAccount" data-bs-dismiss="modal" @click="discardEdit">Discard and Close</button>
          <button type="button" class="btn btn_saveChange" @click="updateInfo" :disabled="!errors.validUpdate" data-bs-dismiss="modal">
            Update Information
          </button>
        </div>
      </div>
    </div>
  </div> -->
  <Footer></Footer>
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
  width: 150px;
  aspect-ratio: 1/1;
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

.profile_info_ctn {
  height: 500px;
  margin-left: 10px;
  margin-right: 10px;
  display: block;
}
.personal_info {
  border-radius: 0.75rem;
  background-color: #b2e5fb;
}
.achievement {
  background-color: #b9f8c5;
  border-radius: 0.75rem;
}
.profile_info_title {
  text-align: center;
  width: 400px;
  margin: auto;
  padding-top: 20px;
  font-weight: 500;
  font-size: 36px;
}
.modal-header {
  background-color: #dfd3c3;
}
.editProfile_btn {
  display: flex;
  justify-content: space-around;
}
.editProfile_btn button:hover {
  transform: scale(1.03);
}
.btn_saveChange {
  padding: 10px;
  font-weight: 500;
  width: 400px;
  border-radius: 0.75rem;
  transition: all 0.3s;
  background-color: #b9f8c5;
  border: 2px solid #85d193;
}
.inputError {
  box-shadow: #ff7878 0 0 3px 3px !important;
}
.btn_upImage {
  margin-top: 10px;
  font-weight: 500;
  width: 150px;
  height: 40px;
  border-radius: 0.75rem;
  transition: all 0.3s;
  background-color: #b9f8c5;
  border: 2px solid #85d193;
}
</style>
