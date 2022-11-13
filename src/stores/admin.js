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
      totalNotes: 'null',
      totalAccounts: 'null',
      totalFeedbacks: 'null'
    },
    feedbacks: {
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
    stringnifyDate(date) {
      const daySuffixes = ['st', 'nd', 'rd']
      const buffer = new Date(date)
      const res = buffer.toLocaleString('default', { day: 'numeric', month: 'short' }) + ' ' + buffer.getFullYear()
      return res
    },
    getAllStatistics() {
      const feedbackPromise = new Promise(async (resolve) => {
        const feedbacks = await FeedbackService.getAllFeedbacks()
        this.statistic.totalFeedbacks = feedbacks.length
        resolve(feedbacks)
      })
      const accountPromise = new Promise(async (resolve) => {
        const accounts = await AccountService.getAllAccounts()
        this.statistic.totalAccounts = accounts.length
        resolve()
      })
      const notesPromise = new Promise(async (resolve) => {
        const notes = await NoteService.getAllNotes()
        this.statistic.totalNotes = notes.length
        resolve()
      })

      feedbackPromise.then((feedbacks) => {
        feedbacks.forEach((feedback) => {
          if (feedback.email == 'anonymous@email.com') {
            feedback.createDate = this.stringnifyDate(feedback.createDate)
            this.feedbacks.anonymous.push(feedback)
          } else {
            feedback.createDate = this.stringnifyDate(feedback.createDate)
            this.feedbacks.named.push(feedback)
          }
        })
      })
    }
  }
})
