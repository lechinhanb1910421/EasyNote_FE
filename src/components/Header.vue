<script>
import axios from 'axios'
import router from '@/routers'
import { useUserStore } from '@/stores/user'
import EditPasswordModal from '@/components/EditPasswordModal.vue'
import DeleteAccountModal from '@/components/DeleteAccountModal.vue'

export default {
  emits: {
    noteContent: null,
    showNote: null
  },
  components: {
    EditPasswordModal,
    DeleteAccountModal
  },
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
      searchMsg: '',
      dropPage: 'main',
      editModel_title: '',
      searchedNotes: [],
      isSearching: false
    }
  },
  watch: {
    async searchMsg(val, oldVal) {
      await this.searchForNotes(val)
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
    },
    toggleSetting() {
      this.dropPage = 'settings'
    },
    goBackMain() {
      this.dropPage = 'main'
    },
    toggle_pwdModal() {
      this.editModel_title = 'Change Password'
      $(this.$refs.editPassModal).modal('show')
      this.goBackMain()
    },
    toggle_delAccModal() {
      this.editModel_title = 'Delete Account'
      $(this.$refs.delAccModal).modal('show')
      this.goBackMain()
    },
    togglePCModal() {
      $(this.$refs.editPassModal).modal('hide')
      $(this.$refs.changePassSuccess).modal('show')
    },
    triggerReload() {
      this.$router.go({ name: 'profile' })
    },
    farewell() {
      $(this.$refs.delAccModal).modal('hide')
      this.logout()
    },
    async searchForNotes(keyword) {
      if (keyword == null || keyword == '') {
        this.isSearching = false
        return
      }
      this.searchedNotes = []
      this.isSearching = true
      try {
        const documents = await this.userStore.searchNotes(keyword)
        if (Object.keys(documents).length > 0) {
          documents.forEach((note) => {
            this.searchedNotes.push(note)
          })
        } else {
          this.searchedNotes = []
        }
      } catch (error) {}
    },
    hideSearchRes() {
      this.searchedNotes = []
      this.isSearching = false
    },
    async showNote(payload) {
      this.onDisplayNote = true
      this.$emit('showNote', payload)
    }
  },

  async created() {
    await this.getQuote()
    setInterval(() => {
      this.getQuote()
    }, 20000)
    this.getUserInfo()
    this.dropPage = 'main'
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
      <div class="position-relative">
        <div class="d-flex">
          <router-link to="/">
            <img src="src\assets\icons\favicon.png" alt="..." width="36" height="36" class="rounded-circle me-2" />
          </router-link>
          <input
            class="form-control me-2 empty header_search"
            type="search"
            placeholder="&#xF002; Search Note"
            aria-label="Search"
            v-model="searchMsg"
            @click="searchForNotes(searchMsg)" />
        </div>
        <div class="search_result" id="search_result" v-if="isSearching" v-click-outside="hideSearchRes">
          <div class="search_result_ctn" v-if="searchedNotes.length">
            <div v-for="(item, idx) in searchedNotes" @click="showNote(item)">
              <button class="noteSumary_ctn" type="button">
                <div style="float: left; clear: left">
                  <span class="noteSumary_title">Title: {{ item.title }}</span>
                  <span class="noteSumary_des">Description: {{ item.description }}</span>
                </div>
              </button>
            </div>
          </div>
          <div class="search_result_ctn" v-if="searchedNotes.length == 0 || !searchedNotes.length">
            <button class="noteSumary_ctn" type="button" style="height: 50px">
              <div style="float: left; clear: left">
                <span class="ps-3"><strong>Note not found</strong> </span>
              </div>
            </button>
          </div>
        </div>
      </div>

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
              <ul class="dropdown-menu dropdown-menu-end" id="dropDownMain">
                <div v-if="dropPage == 'main'">
                  <li>
                    <button class="dropdown-item profile_myprofile" type="button" @click="gotoProfile">
                      <img
                        :src="profilePic"
                        alt="..."
                        width="40"
                        height="40"
                        class="rounded-circle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false" />
                      <div style="float: left; clear: left">
                        <span class="profile_userName">{{ userName }} </span>
                        <span class="profile_userEmail">{{ userStore.user.email }}</span>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item profile_btn" type="button" @click.stop="toggleSetting">
                      <span class="icon_cover">
                        <i class="fa-solid fa-gear profile_icon"></i>
                      </span>
                      <span class="profile_span">Settings </span>
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item profile_btn" type="button" @click="testSearch">
                      <span class="icon_cover">
                        <i class="fa-solid fa-circle-question profile_icon"></i>
                      </span>
                      <span class="profile_span">Help </span>
                    </button>
                  </li>
                  <li>
                    <router-link to="/feedback">
                      <button class="dropdown-item profile_btn" type="button">
                        <span class="icon_cover">
                          <i class="fa-solid fa-message profile_icon"></i>
                        </span>
                        <span class="profile_span">Send Feedbacks </span>
                      </button>
                    </router-link>
                  </li>
                  <li>
                    <button class="dropdown-item profile_btn" type="button" @click="logout">
                      <span class="icon_cover">
                        <i class="fa-solid fa-right-from-bracket profile_icon"></i>
                      </span>
                      <span class="profile_span">Log Out </span>
                    </button>
                  </li>
                </div>
                <div v-if="dropPage == 'settings'">
                  <li>
                    <div class="dropDown_ctn">
                      <button class="back_iconCover" type="button" @click.stop="goBackMain">
                        <i class="fa-solid fa-arrow-left profile_icon"></i>
                      </button>
                      <span class="dropDown_ctnTitle">Settings</span>
                    </div>
                  </li>
                  <li>
                    <button class="dropdown-item profile_btn" type="button" @click="toggle_pwdModal">
                      <span class="icon_cover">
                        <i class="fa-solid fa-lock profile_icon"></i>
                      </span>
                      <span class="profile_span">Change Password</span>
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item profile_btn" type="button" @click="toggle_delAccModal">
                      <span class="icon_cover">
                        <i class="fa-solid fa-trash profile_icon"></i>
                      </span>
                      <span class="profile_span">Delete Account</span>
                    </button>
                  </li>
                </div>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav me-end mb-2 mb-lg-0">
          <li class="pe-2"></li>
        </ul>
      </div>
    </div>
    <!-- Modal edit account info such as change password and delete -->
    <div
      class="modal fade modal-lg"
      id="editPassModal"
      ref="editPassModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <EditPasswordModal :modal-title="editModel_title" @password-changed="togglePCModal"></EditPasswordModal>
    </div>
    <div
      class="modal fade modal-lg"
      id="delAccModal"
      ref="delAccModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <DeleteAccountModal :modal-title="editModel_title" @acc-deleted="farewell"></DeleteAccountModal>
    </div>
    <!-- End of Modal edit account info such as change password and delete -->
    <!-- Change Pass success Modal -->
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade" id="changePassSuccess" ref="changePassSuccess" tabindex="-1" aria-labelledby="passChanged" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #b2e5fb">
            <h1 class="modal-title fs-5" id="passChanged">Your password was changed</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="font-weight: 500; font-size: 18px">
            <p class="ps-3 pt-2">
              We are about to lift off. <br />
              Do you want to stay signed in ?
            </p>
          </div>
          <div class="modal-footer modal_passChange-footer">
            <button type="button" class="btn btn_logout" data-bs-dismiss="modal" @click="logout">Log out</button>
            <button type="button" class="btn btn_stayin" @click="triggerReload">Stay signed in</button>
          </div>
        </div>
      </div>
    </div>

    <!-- End of Change Pass success Modal -->
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
.search_result {
  position: absolute;
  top: 40px;
  left: 45px;
  background-color: rgb(0 0 0 / 60%);
  border-radius: 0.5rem;
  width: 400px;
  padding-top: 5px;
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 4px 2px;
  max-height: 400px;
}
.search_result_ctn {
  padding: 3px;
  max-height: 385px;
  border-radius: 0.5rem;
  overflow: scroll;
}
.search_result_ctn::-webkit-scrollbar {
  display: none;
}
.dropdown-menu {
  width: 350px;
  border-radius: 0.75rem;
}
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

.dropDown_ctn {
  display: flex;
  align-items: center;
  height: 70px;
  margin-left: 5px;
  margin-right: 5px;
  border-bottom: 1px solid rgb(0 0 0 / 30%);
  margin-bottom: 20px;
}
.dropDown_ctnTitle {
  font-size: 26px;
  font-weight: bold;
  padding-left: 20px;
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
.back_iconCover {
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 50% !important;
  border: none;
  background-color: white;
}
.back_iconCover:hover {
  background-color: rgb(220, 220, 220);
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
#dropDownMain li {
  padding-left: 15px;
  padding-right: 15px;
}
#dropDownMain li button {
  border-radius: 0.5rem;
}
#dropDownMain li button:hover {
  background-color: rgb(230, 230, 230);
}
.modal_passChange-footer {
  display: flex;
  justify-content: center;
}
.modal_passChange-footer button {
  flex: 1;
  font-size: 17px;
  font-weight: 500;
}
.btn_logout {
  background-color: #f1f1ae;
}
.btn_stayin {
  background-color: #b9f8c5;
}
.noteSumary_ctn {
  border: 1px solid rgb(221, 221, 221);
  height: 80px;
  width: 98%;
  margin: auto;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  border-radius: 0.75rem;
  background-color: rgb(240, 240, 240);
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 6px 0;
}
.noteSumary_title {
  text-align: left;
  width: 98%;
  margin: auto;
  font-size: 17px;
  margin-left: 15px;
  font-weight: bold;
  float: left;
  clear: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.noteSumary_des {
  text-align: left;
  font-size: 14px;
  max-width: 300px;
  margin-left: 15px;
  float: left;
  clear: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
