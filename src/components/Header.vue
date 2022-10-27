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
  props: {},
  data() {
    return {
      fact: '',
      author: '',
      profilePic: ''
    }
  },
  methods: {
    async logout() {
      localStorage.removeItem('auth_token')
      this.userStore.logout()
      router.push('/login')
    },
    async getUser() {
      const token = localStorage.getItem('auth_token')
      try {
        if (token) {
          const token_user = await AccountService.getUser(token)
          this.userStore.saveUser(token_user.name, token_user.email, token_user.profilePic)
          console.table(this.userStore.user)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.log(error)
        router.push('/login')
      }
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
    await this.getUser()
    await this.getQuote()
    setInterval(() => {
      this.getQuote()
    }, 20000)
    this.profilePic = this.userStore.user.profilePic
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
              <ul class="dropdown-menu dropdown-menu-end" style="width: 300px" id="profileDropdown">
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li>
                  <button class="dropdown-item profile_btn" type="button" @click="logout">
                    <i class="fa-solid fa-right-from-bracket profile_icon" style="padding-right: 10px"></i>
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

  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <div class="dropdown mt-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropdown button</button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile_btn {
  display: flex;
  align-items: center;
  height: 45px;
}
.profile_icon {
  font-size: 22px;
}
.profile_span {
  margin-left: 5px;
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
