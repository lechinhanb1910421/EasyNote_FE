<script>
import router from '@/routers'
import AccountService from '@/services/account.service'
import { useUserStore } from '@/stores/user'
export default {
  data() {
    return {
      userName: '',
      userEmail: '',
      userProPic: ''
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
      this.userName = this.userStore.user.firstName + ' ' + this.userStore.user.lastName
      this.userEmail = this.userStore.user.email
      this.userProPic = this.userStore.user.profilePic
    }
  },
  async created() {
    await this.getUser()
    this.getUserInfo()
  }
}
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-11 mt-3 mb-3 d-flex profile_info">
        <div class="profile_pic">
          <img src="src\assets\imgs\Everett2.jpg" alt="..." height="150" width="150" class="rounded-circle" />
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
      <div id="profile_analyse" class="col-4">Total notes</div>
      <div id="profile_analyse" class="col-4">Total done</div>
      <div id="profile_analyse" class="col-4">Score</div>
    </div>
  </div>

  <!-- Modal  Edit Profile info -->
  <div
    class="modal fade modal-lg"
    id="edit_profile"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit profile info</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4 d-block">
              <img class="avatar_edit" :src="userProPic" alt="..." />
              <div>
                <label for="files" class="btn btn_avatar"><i class="fa-solid fa-camera"></i> Select Image</label>
                <input id="files" class="d-none" type="file" />
                dqwdqwdqwd
              </div>
            </div>
            <div class="col-8">
              
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
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
  display: flex;
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
#profile_analyse {
  background-color: rgb(43, 137, 226);
}
.modal-content {
  width: 650px;
  margin: auto;
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
</style>
