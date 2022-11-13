import { defineStore } from 'pinia'
import AccountService from '@/services/account.service'
import NoteService from '@/services/note.service'
import FeedbackService from '@/services/feedback.service'

export const adminStorage = defineStore('admin', {
  state: () => ({
    admin: {
      firstName: null,
      lastName: null,
      email: null,
      profilePic: null,
      createDate: null
    },
    statistic: {
      totalNote: '',
      totalAccount: '',
      totalContact
    },
    contacts: {
      anonymous: [],
      named: []
    }
  }),
  getters: {},
  actions: {
    async saveAdmin(firstName, lastName, email, profilePic, createDate) {
      this.admin.firstName = firstName
      this.admin.lastName = lastName
      this.admin.email = email
      this.admin.profilePic = profilePic
      this.admin.createDate = createDate
    },
    async getAdmin(token) {
      const token_admin = await AccountService.getUser(token)
      this.admin.firstName = token_admin.firstName
      this.admin.lastName = token_admin.lastName
      this.admin.email = token_admin.email
      this.admin.profilePic = token_admin.profilePic
      this.admin.createDate = token_admin.createDate
    }
  }
})
