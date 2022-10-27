import { defineStore } from 'pinia'
import AccountService from '@/services/account.service'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: null,
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
  getters: {
    getName() {
      return this.user.name
    },
    getEmail() {
      return this.user.email
    }
  },
  actions: {
    async saveUser(name, email, profilePic) {
      this.user.name = name
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
      this.user.name = token_user.name
      this.user.email = token_user.email
      this.user.profilePic = token_user.profilePic
    },
    async logout() {
      this.user.name = ''
      this.user.email = ''
      this.user.profilePic = ''
    }
  }
})
