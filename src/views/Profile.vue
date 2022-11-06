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
      <div class="col-6 mt-3 mb-3 d-flex profile_info">
        <div class="profile_pic">
          <img src="src\assets\imgs\Everett2.jpg" alt="..." height="150" width="150" class="rounded-circle" />
        </div>
        <div class="general_info">
          <p class="prof_userName">{{ userName }}</p>
          <p class="prof_userEmail">{{ userEmail }}</p>
        </div>
        <div class="edit_ctn">
          <button class="btn btn_editProfile" type="button">
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
</template>

<style scoped>
.container {
  min-height: 100vh;
}
.profile_info {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 20px 20px 20px 35px;
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
</style>
