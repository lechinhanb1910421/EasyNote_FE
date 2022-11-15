<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { userStorage } from '@/stores/user'
import AccountService from '@/services/account.service'
import NotePanel from '@/components/EditNoteModal.vue'
import AddNotePanel from '@/components/AddNoteModal.vue'

import router from '@/routers'

export default {
  components: {
    Header,
    Footer,
    NotePanel,
    AddNotePanel
  },
  setup() {
    const userStore = userStorage()
    return {
      userStore
    }
  },
  data() {
    return {
      profilePic: '',
      detailTitle: '',
      detailDescrip: '',
      editNoteId: '',
      editNoteIndex: '',
      nextState: '',
      noteState: '',
      userRole: ''
    }
  },
  methods: {
    async getUser() {
      const token = localStorage.getItem('auth_token')
      try {
        if (token) {
          const token_user = await AccountService.getUser(token)
          if (!token_user) {
            throw new Error('Can not get user with this token')
          }
          this.userStore.saveUser(
            token_user.firstName,
            token_user.lastName,
            token_user.email,
            token_user.profilePic,
            token_user.createDate,
            token_user.role
          )
          this.userStore.getUserNotes(token_user.email)
          this.userRole = this.userStore.user.role
        } else {
          throw new Error('There is valid no token')
        }
      } catch (error) {
        router.push('/login')
      }
    },

    showEditNoteModal(payload) {
      this.detailTitle = payload.title
      this.detailDescrip = payload.description
      this.editNoteId = payload._id
      this.noteState = payload.state

      $(this.$refs.editNoteModal).modal('show')
    },
    async noteChanged(value) {
      let payload = { id: this.editNoteId, title: null, description: null }
      if (value.title) {
        payload.title = value.title
      }
      if (value.description) {
        payload.description = value.description
      }
      const result = await this.userStore.editNote(payload)
      try {
        if (result.message) {
          this.detailTitle = result.note.title
          this.detailDescrip = result.note.description
        }
      } catch (error) {
        console.log('can not change note', error)
      }
    },
    async deleteNote() {
      try {
        await this.userStore.deleteNote(this.editNoteId)
        const message = '<span> <i class="fa-regular fa-circle-check"></i> Note was deleted </span>'
        this.$toast.success(message, {
          duration: 3000
        })
      } catch (error) {}
    },
    async moveState(noteState) {
      if (noteState == 'pending') {
        this.nextState = 'doing'
      } else if (noteState == 'doing') {
        this.nextState = 'done'
      }
      const payload = { id: this.editNoteId, state: this.nextState }
      await this.userStore.editNote(payload)
    },
    showAddNoteModal() {
      $(this.$refs.addNoteModal).modal('show')
    },
    closeAddModal(value) {
      $(this.$refs.addNoteModal).modal('hide')
      if (value === 'added') {
        const message = '<span> <i class="fa-regular fa-circle-check"></i> Note was added </span>'
        this.$toast.success(message, {
          duration: 3000
        })
      }
    },
    async backState() {
      const payload = { id: this.editNoteId, state: 'pending' }
      await this.userStore.editNote(payload)
    }
  },

  async created() {
    await this.getUser()
  }
}
</script>
<template>
  <Header @show-note="showEditNoteModal" :is-search="true" :user-role="userRole"></Header>
  <div class="container text-dark" style="min-height: 100vh">
    <div class="notesPads_Container">
      <div class="noteToDo_ctn notes_ctn">
        <div>
          <h1 class="text-center">TODO</h1>
        </div>
        <button class="noteSumary_ctn noteAdd_ctn" type="button" @click="showAddNoteModal">
          <div style="float: left; clear: left">
            <span>
              <strong> <i class="fa-solid fa-plus hover_scroll"></i> Add a Note</strong>
            </span>
          </div>
        </button>
        <div id="note_content">
          <div v-if="!userStore.notes.pending.length">
            <button class="noteSumary_ctn" type="button">
              <div style="float: left; clear: left">
                <span><strong>Hooray! There is nothing to do today</strong> </span>
              </div>
            </button>
          </div>
          <div v-for="(item, idx) in userStore.notes.pending">
            <button class="noteSumary_ctn" type="button" @click="showEditNoteModal(item)">
              <div style="float: left; clear: left">
                <span class="noteSumary_title">Title: {{ item.title }}</span>
                <span class="noteSumary_des">Description: {{ item.description }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="noteDoing_ctn notes_ctn">
        <div>
          <h1 class="text-center">DOING</h1>
        </div>
        <div id="note_content">
          <div v-for="(item, idx) in userStore.notes.doing">
            <button class="noteSumary_ctn" type="button" @click="showEditNoteModal(item)">
              <div style="float: left; clear: left">
                <span class="noteSumary_title">Title: {{ item.title }}</span>
                <span class="noteSumary_des">Description: {{ item.description }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="noteDone_ctn notes_ctn">
        <div>
          <h1 class="text-center">DONE</h1>
        </div>
        <div id="note_content">
          <div v-for="(item, idx) in userStore.notes.done">
            <button class="noteSumary_ctn" type="button" @click="showEditNoteModal(item)">
              <div style="float: left; clear: left">
                <span class="noteSumary_title">Title: {{ item.title }}</span>
                <span class="noteSumary_des">Description: {{ item.description }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Show detail note modal -->
  <div
    class="modal fade modal-lg"
    id="editNoteModal"
    ref="editNoteModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <NotePanel
      :note-state="noteState"
      :note-title="detailTitle"
      :note-descrip="detailDescrip"
      @note-changed="noteChanged"
      @delete-note="deleteNote"
      @move-state="moveState"
      @back-state="backState"
      :noteId="editNoteId"></NotePanel>
  </div>
  <!-- End of Show detail note modal -->

  <!-- Add Note modal -->
  <div
    class="modal fade modal-lg"
    id="addNoteModal"
    ref="addNoteModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <AddNotePanel @close-modal="closeAddModal"></AddNotePanel>
  </div>
  <!-- End of Add Note modal -->
  <Footer></Footer>
</template>
<style scoped>
.notesPads_Container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.notes_ctn {
  max-height: 600px;
  width: 32%;
  padding: 12px;
  box-shadow: rgb(0 0 0 / 30%) 3px 7px 7px 2px;
  border-radius: 0.75rem;
}

.noteToDo_ctn {
  height: 600px;
  background-color: #f1f1ae;
  border: 3px solid #c7c782;
}
.noteDoing_ctn {
  background-color: #b2e5fb;
  border: 3px solid #94cbe2;
}
.noteDone_ctn {
  background-color: #b9f8c5;
  border: 3px solid #98d6a3;
}

#note_content {
  border-radius: 0.5rem;
  max-height: 450px;
  overflow: auto;
}
#note_content::-webkit-scrollbar {
  display: none;
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
.noteAdd_ctn {
  height: 50px;
  padding: 20px;
  background-color: #cdfcf6;
}
.noteAdd_ctn i.hover_scroll {
  transition: transform 0.3s;
}
.noteAdd_ctn:hover i.hover_scroll {
  transform: rotate(90deg);
}
</style>
