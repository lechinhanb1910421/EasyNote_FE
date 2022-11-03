<template lang="">
  <div>
    <h1>Welcome to welcome page {{ name }}</h1>
    <input type="button" class="btn" @click="getUserName" />
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: 'Nguyen'
    }
  },
  methods: {
    async getUserName() {
      try {
        const result = await axios({
          method: 'get',
          url: 'http://api.quotable.io/random',
          params: {
            tags: 'education|courage|success',
            maxLength: 70
          }
        })
          .then((response) => {
            return response.data
          })
          .catch((error) => {
            console.log(error)
            return { content: 'There is no escape from the enemy who lives within', author: 'Collected' }
          })
        this.name = result.author
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang=""></style>
