<script>
import { useUserStore } from '@/stores/user'
import CustomModal from '@/components/CustomModal.vue'
export default {
  components: {
    CustomModal
  },
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  mounted() {}
}
</script>
<template>
  <div class="">
    <h1 class="text-center">TODO</h1>
  </div>
  <button class="dropdown-item profile_myprofile" type="button">
    <img src="../assets/imgs/Everett.png" alt="..." width="40" height="40" class="rounded-circle" />
    <div style="float: left; clear: left">
      <span class="profile_userName">Title: {{ userStore.user.firstName + ' ' + userStore.user.lastName }}</span>
      <span class="profile_userEmail">Author: {{ userStore.user.email }}</span>
    </div>
  </button>
</template>
<style scoped>
.profile_myprofile {
  height: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 0.75rem;
  padding: 15px;
  background-color: rgb(240, 240, 240);
  box-shadow: rgb(0 0 0 / 20%) 2px 2px 6px 0;
}
.profile_userEmail {
  font-size: 14px;
  margin-left: 15px;
  font-weight: 400;
  float: left;
  clear: left;
}
.profile_userName {
  font-size: 17px;
  margin-left: 15px;
  font-weight: bold;
  float: left;
  clear: left;
}
</style>
