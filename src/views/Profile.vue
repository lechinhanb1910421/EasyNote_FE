<script>
import MyHeader from '@/components/Header.vue'
import MyFooter from '@/components/Footer.vue'
import router from '@/routers'
import { useUserStore } from '@/stores/user'
export default {
  components: {
    MyFooter,
    MyHeader
  },
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>
<template>
  <MyHeader></MyHeader>

  <div class="container-fluid">
    <div id="login_main" class="container">dqwdw</div>
  </div>

  <MyFooter></MyFooter>
</template>

<style scoped>
#login_main {
  min-height: 100vh;
  display: block;
}
</style>
