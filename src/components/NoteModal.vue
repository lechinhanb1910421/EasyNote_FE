<script>
export default {
  props: {
    noteTitle: String,
    noteDescrip: String
  },
  methods: {}
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
        <span class="desc_title"><i class="fa-solid fa-rectangle-list"></i> Description: </span>
        <div class="editableDes">
          <textarea name="descripDetail" id="descripDetail" cols="90" rows="5">{{ noteDescrip }}</textarea>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <!-- <div class="modal-footer m-auto">
        <button type="button" class="btn btn-success">Go to Dash Board now</button>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.modal-title {
  margin-left: 15px;
  font-size: 24px;
  font-weight: 600;
}
.modal-content {
  height: 600px;
}
.modal-body {
  padding-left: 40px;
  padding-right: 40px;
}
.desc_title {
  font-size: 18px;
  font-weight: 500;
  padding-left: -10px;
}
.desc_title i {
  font-size: 24px;
  margin-left: -10px;
  margin-bottom: 14px;
}
.editableDes {
  text-align: center;
}
</style>
