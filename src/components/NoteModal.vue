<script>
export default {
  props: ['noteTitle', 'noteDescrip', 'noteState'],
  emits: {
    noteChanged: null
  },
  data() {
    return {
      isEditting: false,
      editedNote: ''
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
    }
  },
  created() {
    this.isEditting = false
    this.editedNote = this.noteDescrip
  }
}
</script>
<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="detailNoteTitle"><i class="fa-solid fa-wrench"></i> {{ noteTitle }}</span>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cancelEdit"></button>
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
        <button type="button" class="btn btn-closeModal">Delete note</button>
        <button type="button" class="btn btn-closeModal">Mark as unfulfilled</button>
        <button type="button" class="btn btn-closeModal" data-bs-dismiss="modal" aria-label="Close" @click="cancelEdit">Close</button>
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
  height: 600px;
}
.modal-header {
  background-color: #dfd3c3;
}
.btn-closeModal {
  color: white;
  width: 100px;
  font-weight: 500;
  font-size: 17px;
  background-color: rgb(220, 10, 10);
  box-shadow: rgb(0 0 0 / 30%) 2px 2px 6px 0;
}

.modal-body {
  background-color: #f8ede3;
  padding-left: 30px;
  padding-right: 30px;
}
.modal-footer {
  display: flex;
  justify-content: space-around;
  background-color: #b19c8f;
}
.modal-footer button {
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  transition: transform 0.2s;
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
  transform: scale(1.1);
}
/* .btn:active {
  border: none;
} */
</style>
