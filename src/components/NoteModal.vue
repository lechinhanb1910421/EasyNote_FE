<script>
export default {
  props: {
    name: String
  },
  methods: {}
}
</script>
<template>
  <div class="modal fade" id="myModal" ref="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="exampleModalLabel">Congratulations!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            Welcome on board <span class="modal_userName"> </span>
          </p>
          <p>Your EverNote account was successfully created.</p>
        </div>
        <div class="modal-footer m-auto">
          <button type="button" class="btn btn-success">Go to Dash Board now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
