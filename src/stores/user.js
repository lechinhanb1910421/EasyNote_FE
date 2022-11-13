import { defineStore } from 'pinia'
import AccountService from '@/services/account.service'
import NoteService from '@/services/note.service'
import FeedbackService from '@/services/feedback.service'

export const userStorage = defineStore('user', {
  state: () => ({
    user: {
      firstName: null,
      lastName: null,
      email: null,
      profilePic: null,
      createDate: null,
      role: ''
    },
    notes: {
      pending: [],
      doing: [],
      done: []
    }
  }),
  getters: {},
  actions: {
    async saveUser(firstName, lastName, email, profilePic, createDate) {
      this.user.firstName = firstName
      this.user.lastName = lastName
      this.user.email = email
      this.user.profilePic = profilePic
      this.user.createDate = createDate
    },
    async saveUserRole(role) {
      this.user.role = role
    },
    async getUser(token) {
      const token_user = await AccountService.getUser(token)
      this.user.firstName = token_user.firstName
      this.user.lastName = token_user.lastName
      this.user.email = token_user.email
      this.user.profilePic = token_user.profilePic
      this.user.createDate = token_user.createDate
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
    async changePass(newPassword) {
      const payload = { password: newPassword }
      return await AccountService.updateUserInfo(this.user.email, payload)
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
    async updateUserInfo(firstName, lastName, profilePic, email) {
      var payload = {
        firstName: null,
        lastName: null,
        profilePic: null
      }
      if (firstName != this.user.firstName) {
        payload.firstName = firstName
      }
      if (lastName != this.user.lastName) {
        payload.lastName = lastName
      }
      if (profilePic != this.user.profilePic) {
        payload.profilePic = profilePic
      }
      try {
        await AccountService.updateUserInfo(email, payload)
        const res = await this.getUserByEmail(this.user.email).account
        await saveUser(res.firstName, res.lastName, res.profilePic)
        await this.getUserNotes(this.user.email)
      } catch (error) {}
    },
    async deleteAccount(email) {
      try {
        return await AccountService.delete(email)
      } catch (error) {}
    },
    async addFeedback(payload) {
      return await FeedbackService.addFeedback(payload)
    },
    async searchNotes(keyword) {
      let documents = []
      this.notes.pending.forEach((note) => {
        if (note.title.toLowerCase().includes(keyword)) {
          documents.push(note)
        }
      })
      this.notes.doing.forEach((note) => {
        if (note.title.toLowerCase().includes(keyword)) {
          documents.push(note)
        }
      })
      this.notes.done.forEach((note) => {
        if (note.title.toLowerCase().includes(keyword)) {
          documents.push(note)
        }
      })
      return documents
    },
    async countAllNotes() {
      // if (!Object.keys(this.notes.doing).length) {
      //   await this.getUserNotes(this.user.email)
      // }
      let count = this.notes.pending.length
      count += this.notes.doing.length
      count += this.notes.done.length
      return count
    },
    async countNotesDone() {
      // if (!Object.keys(this.notes.done).length) {
      //   await this.getUserNotes(this.user.email)
      // }
      return this.notes.done.length
    }
  }
})
