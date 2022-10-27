import AccountService from '@/services/account.service'
import router from '@/routers'
import { useUserStore } from '@/stores/user'
export default {
  emits: {
    childCall: null
  },

  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    showErrorBox(error) {
      var box =
        '<div class="alert alert-danger alert-dismissible fade show m-auto" role="alert" style="width: 80%">' +
        error +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      $('#error_box').fadeIn()
      $('#error_box').html('')
      $('#error_box').append(box)
    },
    hideErrorBox() {
      $('#error_box').fadeOut()
    },
    async submit() {
      try {
        const result = await AccountService.login({
          email: this.email,
          password: this.password
        })
        if (result.message === 'Logged In') {
          localStorage.setItem('auth_token', result.token)
          setTimeout(() => {
            router.push('/')
          }, 200)
        } else throw error
      } catch (error) {
        if (error.response) {
          this.showErrorBox(error.response.data.message)
        }
        console.log(error)
      }
    },
    async googleClick(event) {
      this.$emit('childCall', 'Hello, please use this function later. Hehe')
    }
  },
  async created() {},
  updated() {}
}
