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
      isDoing: false
    }
  },
  methods: {
    toggleEdit() {
      this.editedNote = this.noteDescrip
      this.isEditting = true
    },
    endEdit() {
      this.isEditting = false
    },
    saveEditText() {
      if (this.noteDescrip !== this.editedNote) {
        this.$emit('noteChanged', this.editedNote)
      }
      this.isEditting = false
    },
    cancelEdit() {
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
    }
  },
  // created() {
  //   this.isEditting = false
  //   this.editedNote = this.noteDescrip
  //   if (this.noteState == 'doing') {
  //     this.isDoing = true
  //   }
  //   console.log('hello')
  // },
  // mounted() {
  //   if (this.noteState === 'pending') {
  //     this.nextStateTitle = 'Mark as Doing'
  //   } else if (this.noteState === 'doing') {
  //     this.nextStateTitle = 'Mark as Done'
  //   }
  //   console.log('state in edit', this.nextStateTitle)
  // },
  watch: {
    noteState: function () {
      this.isEditting = false
      this.editedNote = this.noteDescrip
      if (this.noteState == 'doing') {
        this.isDoing = true
      }
      if (this.noteState === 'pending') {
        this.nextStateTitle = 'Mark as Doing'
      } else if (this.noteState === 'doing') {
        this.nextStateTitle = 'Mark as Done'
      } else {
        this.nextStateTitle = ''
      }
    }
  }
}
</script>
<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="detailNoteTitle"><i class="fa-solid fa-wrench"></i> {{ noteTitle }}</span>
        <button type="button" ref="clsModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelEdit"></button>
      </div>
      <div class="modal-body">
        <span class="desc_title">
          <i class="fa-solid fa-rectangle-list"></i>
          Description:
          <button v-if="!isEditting" @click="toggleEdit" type="button" class="btn editNote_btn">Edit</button>
          <span class="title_state">Status: {{ noteState }}</span>
        </span>

        <p v-if="!isEditting" class="desc_detail" @click="toggleEdit">{{ noteDescrip }}</p>
        <div v-if="isEditting">
          <textarea class="desc_detail" name="noteEdit" ref="noteEdit" cols="100" rows="8" v-model.lazy="editedNote"></textarea>
          <div class="desc_control_btns">
            <button type="button" class="btn" @click="saveEditText">Save</button>
            <button type="button" class="btn" @click="cancelEdit">Cancel</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div id="state_btn" class="mb-2" v-if="nextStateTitle">
          <button type="button" class="btn btn_preState" v-if="isDoing" @click="movePreState" data-bs-dismiss="modal" aria-label="Close">
            Back to ToDo
          </button>
          <button type="button" class="btn btn_nextState" @click="moveNextState" data-bs-dismiss="modal" aria-label="Close">
            {{ nextStateTitle }}
          </button>
          <button type="button" class="btn btn_unff">Mark as unfulfilled</button>
        </div>
        <div id="control_btn">
          <button type="button" class="btn btn_del" @click="deleteNote">Delete Note</button>
          <button type="button" class="btn btn_closeNote" data-bs-dismiss="modal" aria-label="Close" @click="cancelEdit">Close Note</button>
        </div>
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
  display: block;
  background-color: #b19c8f;
}
#state_btn,
#control_btn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.modal-footer button {
  flex: 1;
  margin-left: 7px;
  margin-right: 7px;
  max-width: 260px;
  font-weight: 500;
  font-size: 14px;
  width: 50%;
  color: black;
  transition: transform 0.2s;
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
}
#control_btn button,
.btn_unff {
  background-color: #ff7878;
}
.modal-footer button:active {
  background-color: #9d5353;
}
.btn_preState {
  color: black !important;
  background-color: #fff89a !important;
}
.btn_nextState {
  color: black !important;
  background-color: #94daff !important;
}
.desc_title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  padding-left: -10px;
}
.editNote_btn {
  margin-left: 7px;
  height: 35px;
  padding: 5px;
  width: 90px;
  font-size: 16px;
  font-weight: 500;
  background-color: rgb(215, 215, 215);
  transition: transform 0.2s;
}

.title_state {
  font-size: 17px;
  font-weight: 500;
  margin-left: auto;
  padding: 5px;
}
.desc_detail {
  white-space: pre-wrap;
  width: 90%;
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
.desc_control_btns {
  margin-left: 15px;
}
.desc_control_btns button {
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
.desc_control_btns button:first-child {
  margin-right: 10px;
  background-color: #9adcff;
}
.desc_control_btns button:last-child {
  background-color: #fff89a;
}
.editableDes {
  text-align: center;
}
button:hover {
  transform: scale(1.03);
}
/* .btn:active {
  border: none;
} */
</style>
