<!-- <script>
import { useUserStore } from '@/stores/user'
import NotePanel from '@/components/EditNoteModal.vue'
import AddNotePanel from '@/components/AddNoteModal.vue'
export default {
  emits: {
    showNote: null,
    addNote: null
  },
  components: {
    NotePanel,
    AddNotePanel
  },
  props: ['noteTitle', 'noteDescrip'],
  setup() {
    const userNotes = useUserStore()

    return {
      userNotes
    }
  },
  data() {
    return {
      detailTitle: '',
      detailDescrip: '',
      editNoteId: '',
      editNoteIndex: '',
      nextState: ''
    }
  },
  methods: {
    showeditNoteModal(item) {
      this.$emit('showNote', item)
    },
    toggleAddModal() {
      this.$emit('addNote')
    }
  },
  created() {}
}
</script>
<template>
  <div>
    <h1 class="text-center">TODO</h1>
  </div>
  <button class="noteSumary_ctn noteAdd_ctn" type="button" @click="toggleAddModal">
    <div style="float: left; clear: left">
      <span>
        <strong> <i class="fa-solid fa-plus hover_scroll"></i> Add a Note</strong>
      </span>
    </div>
  </button>
  <div id="note_content">
    <div v-if="!userNotes.notes.pending.length">
      <button class="noteSumary_ctn" type="button">
        <div style="float: left; clear: left">
          <span><strong>Hooray! There is nothing to do today</strong> </span>
        </div>
      </button>
    </div>
    <div v-for="(item, idx) in userNotes.notes.pending">
      <button class="noteSumary_ctn" type="button" @click="showeditNoteModal(item)">
        <div style="float: left; clear: left">
          <span class="noteSumary_title">Title: {{ item.title }}</span>
          <span class="noteSumary_des">Description: {{ item.description }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
<style scoped>

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
</style> -->
