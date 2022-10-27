<script>
import { useUserStore } from '@/stores/user'
import NoteTodo from '@/components/NoteTodo.vue'
import NoteDoing from '@/components/NoteDoing.vue'
import NoteDone from '@/components/NoteDone.vue'
export default {
  components: {
    NoteTodo,
    NoteDoing,
    NoteDone
  },
  setup() {
    const useUser = useUserStore()
    return {
      useUser
    }
  },
  data() {
    return {
      name: '',
      email: ''
    }
  }
}
</script>
<template>
  <div class="container text-dark" style="padding-top: 70px; min-height: 100vh">
    <h3>Hello {{ useUser.user.firstName + ' ' + useUser.user.lastName }}</h3>
    <h5>Your email address is: {{ useUser.user.email }}</h5>
    <div class="row text-center">
      <div class="col-4"><NoteTodo></NoteTodo></div>
      <div class="col-4"><NoteDoing></NoteDoing></div>
      <div class="col-4"><NoteDone></NoteDone></div>
    </div>
  </div>
</template>
<style scoped>
.notes_ctn {
  height: 500px;
  border-radius: 1rem;
}
</style>
