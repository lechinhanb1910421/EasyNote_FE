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
      doing: [],
      done: []
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
      this.notes = { pending: [], doing: [], done: [] }
      const userNotes = await NoteService.getUserNotes(email)
      userNotes.forEach((elem) => {
        if (elem.state == 'doing') {
          this.notes.doing.push(elem)
        } else if (elem.state == 'pending') {
          this.notes.pending.push(elem)
        } else if (elem.state == 'done') {
          this.notes.done.push(elem)
        } else {
          this.deleteNote(elem._id)
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
      this.pending = []
      this.doing = []
      this.done = []
    },
    async deleteNote(id) {
      try {
        await NoteService.deleteNote(id)
        this.getUserNotes(this.user.email)
      } catch (error) {}
    },
    async editNote(payload) {
      try {
        const result = await NoteService.updateNote(payload)
        this.getUserNotes(this.user.email)
        return result
      } catch (error) {}
    },
    async updateNoteState(id, nextState) {
      try {
        const result = await NoteService.updateNote(id, nextState)
        this.getUserNotes(this.user.email)
      } catch (error) {}
    },
    async addNote(title, desc) {
      const payload = {
        email: this.user.email,
        title: title,
        description: desc,
        state: 'pending'
      }
      try {
        const result = await NoteService.addNote(payload)
        this.getUserNotes(this.user.email)
      } catch (error) {}
    },
    async updateUserInfo(firstName, lastName, email) {
      var payload = {
        firstName: null,
        lastName: null
      }
      if (firstName != this.user.firstName) {
        payload.firstName = firstName
      }
      if (lastName != this.user.lastName) {
        payload.lastName = lastName
      }
      try {
        await AccountService.updateUserInfo(email, payload)
        const res = await this.getUserByEmail(this.user.email).account
        await saveUser(res.firstName, res.lastName, res.profilePic)
        await this.getUserNotes(this.user.email)
      } catch (error) {}
    }
  }
})
