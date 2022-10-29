<script>
import { useUserStore } from '@/stores/user'
import NotePanel from '@/components/NoteModal.vue'
export default {
  components: {
    NotePanel
  },
  props: ['noteTitle', 'noteDescrip'],
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {
      detailTitle: '',
      detailDescrip: ''
    }
  },
  methods: {
    showDetailNote(item) {
      this.detailTitle = item.title
      this.detailDescrip = item.description
      $(this.$refs.detailNote).modal('show')
    }
  },
  mounted() {}
}
</script>
<template>
  <div>
    <h1 class="text-center">TODO</h1>
  </div>
  <!-- <button class="dropdown-item profile_myprofile" type="button">
    <div style="float: left; clear: left">
      <span class="profile_userName">Title: {{ userStore.user.firstName + ' ' + userStore.user.lastName }}</span>
      <span class="profile_userEmail">Author: {{ userStore.user.email }}</span>
    </div>
  </button> -->
  <div v-if="!userStore.notes.length">
    <button class="noteSumary_ctn" type="button">
      <div style="float: left; clear: left">
        <span><strong>Hooray! There is nothing to do today</strong> </span>
      </div>
    </button>
  </div>
  <div v-for="(item, idx) in userStore.notes">
    <button class="noteSumary_ctn" type="button" @click="showDetailNote(item)">
      <div style="float: left; clear: left">
        <span class="noteSumary_title">Title: {{ item.title }}</span>
        <span class="noteSumary_des">Description: {{ item.description }}</span>
      </div>
    </button>
  </div>
  <div class="modal fade modal-lg" id="detailNote" ref="detailNote" tabindex="-1" aria-labelledby="detailNoteTitle" aria-hidden="true">
    <NotePanel :note-title="detailTitle" :note-descrip="detailDescrip"></NotePanel>
  </div>
</template>
<style scoped>
.modal-lg {
  background-color: transparent;
}
.noteSumary_ctn {
  border: 1px solid rgb(221, 221, 221);
  height: 80px;
  width: 380px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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
