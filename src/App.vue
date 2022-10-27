<script>
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Footer
  }
}
</script>

<template>
  <router-view name="header"></router-view>
  <router-view name="mainBody"></router-view>
  <Footer></Footer>
</template>

<style></style>
