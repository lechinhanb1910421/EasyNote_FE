<script>
import axios from 'axios'
import router from '@/routers'
import { useUserStore } from '@/stores/user'
import AccountService from '@/services/account.service'

export default {
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      fact: '',
      author: '',
      profilePic: '',
      userName: '',
      userEmail: ''
    }
  },
  methods: {
    async logout() {
      localStorage.removeItem('auth_token')
      this.userStore.logout()
      router.push('/login')
    },
    getUserInfo() {
      this.userName = this.userStore.user.firstName + ' ' + this.userStore.user.lastName
      this.userEmail = this.userStore.user.email
      this.profilePic = this.userStore.user.profilePic
    },
    async getQuote() {
      try {
        const result = await axios({
          method: 'get',
          url: 'http://api.quotable.io/random',
          params: {
            tags: 'education|courage|success',
            maxLength: 70
          }
        })
          .then((response) => {
            return response.data
          })
          .catch((error) => {
            console.log(error)
            return { content: 'There is no escape from the enemy who lives within', author: 'Collected' }
          })
        this.fact = result.content
        this.author = result.author
      } catch (error) {
        console.log(error)
      }
    }
  },
  async created() {
    await this.getQuote()
    setInterval(() => {
      this.getQuote()
    }, 20000)
    this.getUserInfo()
  }
}
</script>
<template>
  <nav class="navbar bg fixed-top navbar-expand-lg m-auto px-3" style="background-color: #60c9e2">
    <div class="container">
      <button
        class="btn"
        type="button"
        title="sideBar"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample">
        <i class="fa-solid fa-bars" style="font-size: 23px"></i>
      </button>
      <router-link to="/">
        <span class="navbar-brand mb-0 h1">EverNote</span>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"></li>
        </ul>
        <ul class="navbar-nav me-auto">
          <li>
            <span class="text-dark text-center fw-semibold fst-italic" style="width: 800px; font-size: 18px">"{{ fact }}" - {{ author }}</span>
          </li>
        </ul>

        <ul class="navbar-nav me-end mb-2 mb-lg-0">
          <li>
            <div class="dropdown">
              <img :src="profilePic" alt="..." width="40" height="40" class="rounded-circle" data-bs-toggle="dropdown" aria-expanded="false" />
              <ul class="dropdown-menu dropdown-menu-end" style="width: 350px; border-radius: 0.75rem" id="profileDropdown">
                <li>
                  <button class="dropdown-item profile_myprofile" type="button">
                    <img :src="profilePic" alt="..." width="40" height="40" class="rounded-circle" data-bs-toggle="dropdown" aria-expanded="false" />
                    <div style="float: left; clear: left">
                      <span class="profile_userName">{{ userName }} </span>
                      <span class="profile_userEmail">{{ userStore.user.email }}</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item profile_btn" type="button">
                    <span class="icon_cover">
                      <i class="fa-solid fa-gear profile_icon"></i>
                    </span>
                    <span class="profile_span">Settings </span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item profile_btn" type="button">
                    <span class="icon_cover">
                      <i class="fa-solid fa-circle-question profile_icon"></i>
                    </span>
                    <span class="profile_span">Help </span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item profile_btn" type="button">
                    <span class="icon_cover">
                      <i class="fa-solid fa-message profile_icon"></i>
                    </span>
                    <span class="profile_span">Send Feedbacks </span>
                  </button>
                </li>
                <li>
                  <button class="dropdown-item profile_btn" type="button" @click="logout">
                    <span class="icon_cover">
                      <i class="fa-solid fa-right-from-bracket profile_icon"></i>
                    </span>
                    <span class="profile_span">Log Out </span>
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav me-end mb-2 mb-lg-0">
          <li class="pe-2"></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.profile_myprofile {
  height: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: rgb(240, 240, 240);
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 6px 0;
}
.profile_btn {
  display: flex;
  align-items: center;
  height: 45px;
  margin-bottom: 5px;
}
.profile_icon {
  font-size: 24px;
}
.icon_cover {
  display: flex;
  justify-content: center;
  background-color: rgb(220, 220, 220);
  padding: 7px;
  border-radius: 50%;
  margin-right: 20px;
}
.profile_userEmail {
  font-size: 14px;
  margin-left: 15px;
  font-weight: 400;
  float: left;
  clear: left;
}
.profile_userName {
  font-size: 17px;
  margin-left: 15px;
  font-weight: bold;
  float: left;
  clear: left;
}
.profile_span {
  font-weight: 500;
}
#profileDropdown li {
  padding-left: 15px;
  padding-right: 15px;
}
#profileDropdown li button {
  border-radius: 0.5rem;
}
#profileDropdown li button:hover {
  background-color: rgb(230, 230, 230);
}
</style>
