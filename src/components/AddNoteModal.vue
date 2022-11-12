<script>
import { useUserStore } from '@/stores/user'
export default {
  emits: { closeModal: null },
  setup() {
    const noteStore = useUserStore()
    return {
      noteStore
    }
  },
  data() {
    return {
      noteTitle: '',
      noteDescrip: '',
      is_error: false,
      errorMsg: ''
    }
  },
  methods: {
    discardNote() {
      this.$emit('closeModal', 'discard')
      this.noteTitle = ''
      this.noteDescrip = ''
    },
    addNote() {
      if (this.noteTitle == null || this.noteTitle == '') {
        this.errorMsg = 'Title can not be null'
        this.is_error = true
        return
      }
      if (this.noteDescrip == null || this.noteDescrip == '') {
        this.errorMsg = 'Description can not be null'
        this.is_error = true
        return
      }
      this.errorMsg = ''
      this.is_error = false
      try {
        this.noteStore.addNote(this.noteTitle, this.noteDescrip)
        this.$emit('closeModal', 'added')
        this.noteTitle = ''
        this.noteDescrip = ''
      } catch (error) {
        console.log(error)
        this.errorMsg = 'Can not add note'
        this.is_error = true
      }
    }
  },
  updated() {}
}
</script>
<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="detailNoteTitle">
          <i class="fa-solid fa-plus"></i>
          Add a New ToDo Note
        </span>
        <button type="button" ref="clsModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="input-group mb-3">
          <span class="input-group-text addNote_labels" id="addNote_title">Note Title</span>
          <input
            type="text"
            class="form-control addNote_inputs"
            placeholder="Example Title"
            aria-label="addNote_title"
            aria-describedby="addNote_title"
            maxlength="36"
            v-model="noteTitle" />
        </div>

        <div class="mb-3">
          <label for="addNote_descrip" class="form-label ms-2 addNote_labels">Detail Description:</label>
          <textarea class="form-control addNote_inputs" id="addNote_descrip" rows="9" v-model.lazy="noteDescrip"></textarea>
        </div>

        <div id="error_box" class="mb-3" v-if="is_error">
          <div class="alert alert-danger alert-dismissible fade show m-auto" role="alert">
            {{ errorMsg }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn_close" @click="discardNote">Discard Note</button>
        <button type="button" class="btn btn_add" @click="addNote">Add Note</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-dialog {
  width: 650px;
}
.modal-title {
  margin-left: 15px;
  font-size: 24px;
  font-weight: 600;
}
.modal-content {
  height: 600px;
}
.modal-header {
  background-color: #dfd3c3;
}

.modal-body {
  background-color: #f8ede3;
  padding-left: 30px;
  padding-right: 30px;
}
.addNote_labels {
  font-size: 18px;
  font-weight: 500;
}
.addNote_inputs {
  border-radius: 0.5rem;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  padding-left: 7%;
  padding-right: 7%;
  background-color: #b19c8f;
}
.modal-footer button {
  max-width: 260px;
  font-weight: 500;
  font-size: 16px;
  width: 50%;
  color: black;
  transition: transform 0.2s;
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
}
.btn_close {
  background-color: #ff7878;
}
.btn_add {
  background-color: #c1ffd7;
}
.modal-footer button:active {
  background-color: #9d5353;
}
textarea {
  resize: none;
}
button:hover {
  transform: scale(1.05);
}
/* .btn:active {
  border: none;
} */
</style>
