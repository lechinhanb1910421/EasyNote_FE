<script>
import InputSearch from '@/components/SearchBar.vue'
export default {
  components: {
    InputSearch
  },
  data() {
    return {
      searchText: ''
    }
  }
}
</script>
<template>
  <div class="container text-light text-center" style="padding-top: 170px">
    <!-- <h1>This function is still under development!</h1>
    <h2>Please stay tuned ;))</h2> -->
    <h2 class="text-dark">{{ searchText }}</h2>
    <InputSearch v-model="searchText" />
  </div>
</template>
<style></style>
