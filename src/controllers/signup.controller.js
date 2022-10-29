import AccountService from '@/services/account.service'
import router from '@/routers'
import { useUserStore } from '@/stores/user'

export default {
  emits: {
    accountCreated: null
  },
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      firstName: '',
      userName: '',
      logInEmail: '',
      logInPass: ''
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
    hideErr() {
      $('#error_box').fadeOut()
      $('#fname').removeClass('outline-danger')
      $('#lname').removeClass('outline-danger')
      $('#email').removeClass('outline-danger')
      $('#pwd').removeClass('outline-danger')
      $('#cpwd').removeClass('outline-danger')
    },
    async validateForm() {
      var errors = []
      if (this.firstName === '' || this.firstName == null) {
        errors.push('Firstname can not be empty')
        $('#fname').addClass('outline-danger')
      }
      if (this.lastName === '' || this.lastName == null) {
        errors.push('Lastname can not be empty')
        $('#lname').addClass('outline-danger')
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        $('#email').addClass('outline-danger')
        errors.push('Email is invalid')
      }
      if (this.password === '' || this.password == null) {
        errors.push('Password can not be empty')
        $('#pwd').addClass('outline-danger')
      } else if (Object.keys(this.password).length < 4) {
        errors.push('Password must has at least 4 characters')
        $('#pwd').addClass('outline-danger')
      }
      if (this.password !== this.confirmPassword) {
        errors.push('Confirm password does not match')
        $('#cpwd').addClass('outline-danger')
      }
      return errors
    },
    async logInAndGoHome() {
      this.hideConfirmModal()
      try {
        const result = await AccountService.login({
          email: this.logInEmail,
          password: this.logInPass
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
    async createAccount() {
      try {
        const result = await AccountService.createAccount({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        this.userName = result.account.firstName + ' ' + result.account.lastName
        this.resetFormInfo()
        this.showConfirmModal()
      } catch (error) {
        if (error.response) {
          this.showErrorBox(error.response.data.message)
        }
      }
    },
    resetFormInfo() {
      this.logInEmail = this.email
      this.logInPass = this.password
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.lastName = ''
      this.firstName = ''
    },
    showConfirmModal() {
      $(() => {
        $('#myModal').modal('show')
      })
    },
    hideConfirmModal() {
      $(() => {
        $('#myModal').modal('hide')
      })
    },
    async submit() {
      var errors = await this.validateForm()
      if (Object.keys(errors).length > 0) {
        var errMsg = errors.join('. ')
        this.showErrorBox(errMsg)
      } else {
        this.createAccount()
      }
    }
  },
  created() {
    this.password = ''
    this.confirmPassword = ''
  },
  mounted() {}
}
