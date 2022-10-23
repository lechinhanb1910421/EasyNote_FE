import AccountService from '@/services/account.service'
import router from '@/routers'

export default {
  data() {
    return {
      email: '',
      password: '',
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
      $('#error_box').html('')
      $('#error_box').append(box)
    },
    async submit() {
      try {
        const result = await AccountService.create({
          email: this.email,
          password: this.password,
          name: this.firstName
        })
        if (confirm('Your account was created') == true) {
          router.push('/login')
        }
      } catch (error) {
        this.showErrorBox(error.response.data.message)
      }
    }
  }
}
