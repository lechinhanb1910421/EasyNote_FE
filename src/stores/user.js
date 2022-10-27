import { defineStore } from 'pinia'
import AccountService from '@/services/account.service'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      firstName: null,
      lastName: null,
      email: null,
      profilePic: null
    },
    signupForm: {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  }),
  getters: {},
  actions: {
    async saveUser(firstName, lastName, email, profilePic) {
      this.user.firstName = firstName
      this.user.lastName = lastName
      this.user.email = email
      this.user.profilePic = profilePic
    },
    async saveSignUpForm(firstName, lastName, email) {
      this.signupForm.firstName = firstName
      this.signupForm.lastName = lastName
      this.signupForm.email = email
    },
    async getUser(token) {
      const token_user = await AccountService.getUser(token)
      this.user.firstName = token_user.firstName
      this.user.lastName = token_user.lastName
      this.user.email = token_user.email
      this.user.profilePic = token_user.profilePic
    },
    async logout() {
      this.user.firstName = ''
      this.user.lastName = ''
      this.user.email = ''
      this.user.profilePic = ''
    }
  }
})
