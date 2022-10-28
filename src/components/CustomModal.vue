<script>
export default {
  props: {
    name: String
  },
  methods: {
    goHome() {
      this.$emit('goHome', '')
    }
  }
}
</script>
<template>
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="exampleModalLabel">Congratulations!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            Welcome on board <span class="modal_userName"> {{ name }}</span>
          </p>
          <p>Your EverNote account was successfully created.</p>
        </div>
        <div class="modal-footer m-auto">
          <button type="button" class="btn btn-success" @click="goHome">Go to Dash Board now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-title {
  font-size: 24px;
  font-weight: bold;
}
.modal-body {
  padding-left: 30px;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
}
.modal-body p {
  margin-bottom: 0.5rem;
}
.modal_userName {
  font-size: 20px;
  font-weight: bold;
}
</style>
