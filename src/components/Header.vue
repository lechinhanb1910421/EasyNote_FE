<script>
import axios from 'axios'
import router from '@/routers'
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
      fact: '',
      author: '',
      profilePic: '',
      userName: '',
      userEmail: '',
      searchMsg: ''
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
    },
    gotoProfile() {
      router.push('/profile')
    }
  },
  async created() {
    await this.getQuote()
    setInterval(() => {
      this.getQuote()
    }, 20000)
    this.getUserInfo()
  },
  watch: {
    searchMsg: async function (message) {
      if (message) {
        const result = await this.userStore.findByKeyword(message)
      }
    }
  }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #60c9e2">
    <div class="container-lg">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <form class="d-flex" role="search">
        <router-link to="/">
          <img src="src\assets\icons\favicon.png" alt="..." width="36" height="36" class="rounded-circle me-2" />
        </router-link>
        <input
          class="form-control me-2 empty header_search"
          type="search"
          placeholder="&#xF002; Search Note"
          aria-label="Search"
          v-model="searchMsg" />
      </form>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0">
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
                  <button class="dropdown-item profile_myprofile" type="button" @click="gotoProfile">
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
.navbar-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 22px;
  font-weight: 700;
}
input.empty {
  font-family: 'Arial', FontAwesome, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
}
.header_search {
  width: 350px;
  border-radius: 1rem;
}
/* .search_btn {
  width: 80px;
  background-color: #c8ffd4;
  font-weight: 500;
} */
.profile_myprofile {
  height: 80px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: rgb(240, 240, 240);
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 6px 0;
}
.profile_btn {
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
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
