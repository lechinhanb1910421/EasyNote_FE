<script>
export default {
  props: ['noteTitle', 'noteDescrip', 'noteState'],
  emits: {
    noteChanged: null,
    deleteNote: null,
    moveState: null,
    backState: null
  },
  data() {
    return {
      isEditting: false,
      editedNote: '',
      nextStateTitle: '',
      isDoing: false,
      isError: false,
      errorMsg: '',
      isEditTitle: false,
      editedTitle: ''
    }
  },
  methods: {
    toggleEdit() {
      this.editedTitle = this.noteTitle
      this.editedNote = this.noteDescrip
      this.isEditting = true
    },
    saveEditText() {
      let payload = {
        title: null,
        description: null
      }
      var flag = false
      if (this.noteTitle !== this.editedTitle) {
        payload.title = this.editedTitle.replace(/[\s]+/g, ' ')
        flag = true
      }
      if (this.noteDescrip !== this.editedNote) {
        payload.description = this.editedNote.replace(/[\n]+/g, '\n')
        flag = true
      }
      if (flag) {
        this.$emit('noteChanged', payload)
      }
      this.isEditting = false
      this.isEditTitle = false
    },
    cancelEdit() {
      this.isEditTitle = false
      this.isEditting = false
    },
    deleteNote() {
      if (confirm('Do you want to delete this note ?') == true) {
        this.$refs.clsModal.click()
        this.$emit('deleteNote')
      }
    },
    moveNextState() {
      this.$emit('moveState', this.noteState)
    },
    movePreState() {
      this.$emit('backState')
    },
    toggleEditTitle() {
      this.editedTitle = this.noteTitle
      this.isEditTitle = true
      this.isEditting = true
    }
  },

  watch: {
    noteState: function () {
      this.isEditting = false
      this.editedNote = this.noteDescrip
      if (this.noteState === 'pending') {
        this.nextStateTitle = 'Mark as Doing'
        this.isDoing = false
      } else if (this.noteState === 'doing') {
        this.nextStateTitle = 'Mark as Done'
        this.isDoing = true
      } else {
        this.nextStateTitle = ''
        this.isDoing = false
      }
    },
    editedNote: function (val) {
      var trimmed = val.replace(/\s+/g, '').toLowerCase()
      if (trimmed == null || trimmed == '') {
        this.errorMsg = 'Description can not be empty'
        this.isError = true
      } else {
        this.errorMsg = ''
        this.isError = false
      }
    },
    editedTitle: function (val) {
      var trimmed = val.replace(/\s+/g, '').toLowerCase()
      if (trimmed == null || trimmed == '') {
        this.errorMsg = 'Title can not be empty'
        this.isError = true
      } else {
        this.errorMsg = ''
        this.isError = false
      }
    }
  }
}
</script>
<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="detailNoteTitle" v-if="!isEditTitle" @click="toggleEditTitle">
          <i class="fa-solid fa-pager"></i>
          {{ noteTitle }}
        </span>
        <span class="modal-title" v-if="isEditTitle">
          <i class="fa-solid fa-pager"></i>
          <input type="text" class="editTitle_input" ref="editTitleInput" v-model="editedTitle" maxlength="36" />
        </span>
        <div class="text-center d-flex justify-content-center align-items-center">
          <span class="title_state"> <i class="fa-solid fa-wrench"></i> {{ noteState }}</span>
          <button type="button" ref="clsModal" class="btn-close pe-3 fs-5" data-bs-dismiss="modal" aria-label="Close" @click="cancelEdit"></button>
        </div>
      </div>
      <div class="modal-body">
        <span class="desc_title">
          <div style="flex: 1">
            <span class="d-flex align-items-center fs-5" style="height: 40px">
              <i class="fa-solid fa-rectangle-list"></i>
              Description
              <button v-if="!isEditting" @click="toggleEdit" type="button" class="btn editNote_btn ms-4">Edit</button>
            </span>
          </div>
          <div style="flex: 1" class="btn-group" role="group" aria-label="State Btn" v-if="nextStateTitle">
            <button type="button" class="btn btn_preState" v-if="isDoing" @click="movePreState" data-bs-dismiss="modal" aria-label="Close">
              Back to To Do
            </button>
            <button type="button" class="btn btn_nextState" @click="moveNextState" data-bs-dismiss="modal" aria-label="Close">
              {{ nextStateTitle }}
            </button>
          </div>
        </span>

        <div v-if="!isEditting" class="desc_detail" @click="toggleEdit">{{ noteDescrip }}</div>
        <div v-if="isEditting">
          <textarea class="desc_detail" name="noteEdit" ref="noteEdit" cols="100" rows="8" v-model="editedNote"></textarea>
          <div class="control_btn_ctn">
            <div>
              <button type="button" class="btn control_btns btn_bg_yellow" @click="cancelEdit">Cancel</button>
              <button type="button" class="btn control_btns btn_bg_blue" @click="saveEditText" :disabled="isError">Save</button>
            </div>
            <div style="width: 340px" class="alert alert-danger alert-dismissible fade show m-auto" role="alert" v-if="isError">
              {{ errorMsg }}
              <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn_del" @click="deleteNote">Delete Note</button>
        <button type="button" class="btn btn_closeNote" data-bs-dismiss="modal" aria-label="Close" @click="cancelEdit">Close Note</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-dialog {
  width: 700px;
}
.modal-title {
  margin-left: 15px;
  font-size: 24px;
  font-weight: 600;
}
.editTitle_input {
  border-radius: 0.5rem;
  border: none;
  width: 450px;
  border: 1px solid rgb(0 0 0 / 30%);
  font-weight: 600;
  font-size: 24px;
}
.editTitle_input:focus {
  border: none !important;
  outline: none;
  box-shadow: #8cc0de 0 0 3px 3px !important;
}
.modal-content {
  height: 620px;
}
.modal-header {
  background-color: #dfd3c3;
}

.modal-body {
  background-color: #f8ede3;
  padding-left: 30px;
  padding-right: 30px;
}
.modal-footer {
  display: flex;
  justify-content: space-evenly;
  background-color: #b19c8f;
}

.modal-footer button {
  flex: 1;
  margin-left: 7px;
  margin-right: 7px;
  max-width: 260px;
  font-weight: 500;
  font-size: 14px;
  width: 50%;
  background-color: #ff7878 !important;
  color: black;
  transition: transform 0.2s;
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
}

.modal-footer button:active {
  background-color: #9d5353;
}
.btn_preState {
  font-weight: 500;
  height: 40px;
  color: black !important;
  background-color: #fff89a !important;
  border: 2px solid #c7c782;
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
}
.btn_nextState {
  height: 40px;
  font-weight: 500;
  color: black !important;
  background-color: #94daff !important;
  border: 2px solid #79bdda;
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
}
.desc_title {
  display: flex;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
}
.editNote_btn {
  margin-left: 7px;
  height: 40px;
  padding: 5px;
  width: 90px;
  font-size: 16px;
  font-weight: 500;
  background-color: rgb(215, 215, 215);
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
  transition: transform 0.2s;
}

.title_state {
  font-size: 19px;
  font-weight: 500;
  margin-right: 15px;
  padding: 5px;
}
.desc_detail {
  height: 300px;
  white-space: pre-wrap;
  width: 94%;
  margin-left: 24px;
  font-size: 16px;
}
.desc_title i {
  font-size: 24px;
  padding-right: 7px;
}
textarea {
  height: 300px;
  resize: none;
}
.control_btn_ctn {
  display: flex;
  flex-direction: row-reverse;
  right: 0;
  width: 95%;
  margin: auto;
}
.control_btns {
  font-size: 16px;
  height: 40px;
  padding: 0;
  font-weight: 500;
  width: 100px;
  margin-top: 5px;
  margin-left: 10px;
  background-color: rgb(200, 200, 200);
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
  transition: transform 0.2s;
}
.btn_bg_blue {
  margin-right: 10px;
  background-color: #9adcff;
}
.btn_bg_yellow {
  background-color: #fff89a;
}

button:hover {
  transform: scale(1.03);
}
</style>
