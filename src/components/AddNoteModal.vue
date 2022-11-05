<script>
export default {
  emits: {},
  data() {
    return {
      noteTitle: '',
      noteDescrip: ''
    }
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>
<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title" id="detailNoteTitle">Add a New ToDo Note</span>
        <button type="button" ref="clsModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-floating mb-3 login_inputs">
          <input type="text" name="title" class="form-control" placeholder="Example Modal Title" maxlength="36" />
          <label for="">Title</label>
        </div>
        <span class="desc_title">
          <i class="fa-solid fa-rectangle-list"></i>
          Description:
        </span>
        <div>
          <textarea class="desc_detail" name="noteEdit" ref="noteEdit" cols="100" rows="8" v-model.lazy="noteDescrip"></textarea>
        </div>
      </div>
      <div class="modal-footer"></div>
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
