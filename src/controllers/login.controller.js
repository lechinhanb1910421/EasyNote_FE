import AccountService from '@/services/account.service'
import router from '@/routers'
import { userStorage } from '@/stores/user'
export default {
  emits: {
    childCall: null
  },
  setup() {
    const userStore = userStorage()
    return {
      userStore
    }
  },
  data() {
    return {
      email: '',
      password: '',
      isValidEmail: false
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
      if (!this.isValidEmail) {
        this.$refs.continue.click()
        return
      } else {
        this.$refs.pwd_inp.click()
      }
      try {
        const result = await AccountService.login({
          email: this.email,
          password: this.password
        })
        if (result.message === 'Logged In') {
          localStorage.setItem('auth_token', result.token)
          localStorage.setItem('role_token', result.role)
          if (result.role === 'normal') {
            setTimeout(() => {
              router.push('/')
            }, 300)
          } else if (result.role === 'admin') {
            setTimeout(() => {
              router.push('/admin')
            }, 300)
          } else {
            router.push('/login')
          }
        } else throw error
      } catch (error) {
        if (error.response) {
          this.showErrorBox(error.response.data.message)
        }
        console.log(error)
      }
    },
    changeEmail() {
      this.email = ''
      this.isValidEmail = false
    },
    async continueLogin() {
      if (!this.email) {
        this.showErrorBox('Email can not be empty')
      } else {
        try {
          const result = await this.userStore.getUserByEmail(this.email)
          if (result.status === 'fail') {
            this.showErrorBox(result.message)
          } else {
            this.isValidEmail = true
          }
        } catch (error) {}
      }
    },
    async googleClick(event) {
      this.isValidEmail = !this.isValidEmail
      // this.$emit('childCall', 'Hello, please use this function later. Hehe')
    }
  }
}
