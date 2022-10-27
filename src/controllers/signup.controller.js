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
      firstName: ''
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
    async createdAccount() {
      try {
        const result = await AccountService.createAccount({
          email: this.email,
          password: this.password,
          name: this.firstName + this.lastName
        })
        if (confirm('Your account was created. Go to homepage?') == true) {
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
        }
        this.$emit('accountCreated', result)
      } catch (error) {
        if (error.response) {
          this.showErrorBox(error.response.data.message)
        }
      }
    },
    async submit() {
      var errors = await this.validateForm()
      if (Object.keys(errors).length > 0) {
        var errMsg = errors.join('. ')
        this.showErrorBox(errMsg)
      } else {
        this.createdAccount()
      }
    }
  },
  created() {
    this.firstName = this.userStore.signupForm.firstName
    this.lastName = this.userStore.signupForm.lastName
    this.email = this.userStore.signupForm.email
    this.password = ''
    this.confirmPassword = ''
  },
  updated() {
    this.userStore.saveSignUpForm(this.firstName, this.lastName, this.email)
  }
}
