<script>
export default {
  props: ['noteTitle', 'noteDescrip'],
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
    this.editedNote = this.noteDescrip
  }
}
</script>
<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="detailNoteTitle"><i class="fa-solid fa-wrench"></i> {{ noteTitle }}</span>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <span class="desc_title">
          <i class="fa-solid fa-rectangle-list"></i>
          Description:
          <button v-if="!isEditting" @click="toggleEdit" type="button" class="btn editNote_btn">Edit</button>
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
      <div class="modal-footer m-auto">
        <button type="button" class="btn btn-success">Some buttons go here</button>
        <button type="button" class="btn btn-success">Some buttons go here</button>
        <button type="button" class="btn btn-success">Some buttons go here</button>
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
.modal-body {
  padding-left: 30px;
  padding-right: 30px;
}
.desc_title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  padding-left: -10px;
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
  margin-left: 10px;
  background-color: rgb(200, 200, 200);
}
.desc_control_btns button:first-child {
  background-color: #2192ff;
}
.editableDes {
  text-align: center;
}
.editNote_btn {
  margin-left: 7px;
  height: 35px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 500;
  background-color: rgb(215, 215, 215);
}
</style>
