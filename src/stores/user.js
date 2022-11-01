import { defineStore } from 'pinia'
import AccountService from '@/services/account.service'
import NoteService from '@/services/note.service'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      firstName: null,
      lastName: null,
      email: null,
      profilePic: null
    },
    notes: {
      pending: [],
      doing: []
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
    async getUser(token) {
      const token_user = await AccountService.getUser(token)
      this.user.firstName = token_user.firstName
      this.user.lastName = token_user.lastName
      this.user.email = token_user.email
      this.user.profilePic = token_user.profilePic
    },
    async getUserByEmail(email) {
      try {
        const isEmailExist = await AccountService.getUserByEmail(email)
        if (isEmailExist) {
          return { status: 'success', account: isEmailExist }
        }
      } catch (error) {
        if (error.response) {
          return { status: 'fail', message: error.response.data.message }
        }
      }
    },
    async getUserNotes(email) {
      // this.removeStoreNote()
      const userNotes = await NoteService.getUserNotes(email)
      userNotes.forEach((elem) => {
        if (elem.state == 'doing') {
          this.notes.doing.push(elem)
        }
        if (elem.state == 'pending') {
          this.notes.pending.push(elem)
        }
      })
    },
    getUserFullName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
    getUserProPic() {
      return this.user.profilePic
    },
    async logout() {
      this.user.firstName = ''
      this.user.lastName = ''
      this.user.email = ''
      this.user.profilePic = ''
    },
    async deleteNote(id, state, index) {
      try {
        await NoteService.deleteNote(id)
        if (state === 'pending') {
          const start = this.notes.pending.slice(0, index)
          const end = this.notes.pending.slice(index + 1)
          this.notes.pending = start.concat(end)
        } else if (state === 'doing') {
          const start = this.notes.doing.slice(0, index)
          const end = this.notes.doing.slice(index + 1)
          this.notes.doing = start.concat(end)
        }
      } catch (error) {}
    }
  }
})
