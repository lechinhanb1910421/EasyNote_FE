<script>
export default {
  data() {
    return {}
  },
  methods: {
    updateModelValue(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<template>
  <input type="text" class="form-control" @input="updateModelValue" />
</template>

<style></style>
