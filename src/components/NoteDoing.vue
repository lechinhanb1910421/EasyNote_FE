<script>
import { useUserStore } from '@/stores/user'
import NotePanel from '@/components/NoteModal.vue'
import NoteService from '@/services/note.service'
export default {
  components: {
    NotePanel
  },
  props: ['noteTitle', 'noteDescrip'],
  setup() {
    const userNotes = useUserStore().notes.doing
    return {
      userNotes
    }
  },
  data() {
    return {
      detailTitle: '',
      detailDescrip: '',
      editNoteId: ''
    }
  },
  methods: {
    showDetailNote(index) {
      this.detailTitle = this.userNotes[index].title
      this.detailDescrip = this.userNotes[index].description
      this.editNoteId = this.userNotes[index]._id
      $(this.$refs.detailNote).modal('show')
    },
    async noteChanged(note) {
      const payload = { note: note, id: this.editNoteId }
      const result = await NoteService.editNote(payload)
      try {
        if (result.message) {
          this.detailTitle = result.note.title
          this.detailDescrip = result.note.description
        }
      } catch (error) {
        console.log('can not change note', error)
      }
    }
  }
}
</script>
<template>
  <div>
    <h1 class="text-center">DOING</h1>
  </div>
  <div v-if="!userNotes.length">
    <button class="noteSumary_ctn" type="button">
      <div style="float: left; clear: left">
        <span><strong>Hooray! There is nothing to do today</strong> </span>
      </div>
    </button>
  </div>
  <div v-for="(item, idx) in userNotes">
    <button class="noteSumary_ctn" type="button" @click="showDetailNote(idx)">
      <div style="float: left; clear: left">
        <span class="noteSumary_title">Title: {{ item.title }}</span>
        <span class="noteSumary_des">Description: {{ item.description }}</span>
      </div>
    </button>
  </div>
  <div
    class="modal fade modal-lg"
    ref="detailNote"
    id="detailNote"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <NotePanel
      :note-state="'Doing'"
      :note-title="detailTitle"
      :note-descrip="detailDescrip"
      @note-changed="noteChanged"
      :noteId="editNoteId"></NotePanel>
  </div>
</template>
<style scoped>
.modal-lg {
  background-color: transparent;
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
  width: 320px;
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
  width: 300px;
  margin-left: 15px;
  float: left;
  clear: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
