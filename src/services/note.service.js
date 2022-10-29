import createApiClient from '@/services/api.service'

class NoteService {
  constructor(baseURL = '/api/notes') {
    this.api = createApiClient(baseURL)
  }

  async getAllNotes() {
    return (await this.api.get('/')).data
  }
  async getUserNotes(email) {
    return (await this.api.get('/', { params: { email: email } })).data
  }
  async editNote(payload) {
    return (await this.api.put(`/${payload.id}`, { description: payload.note })).data
  }
}

export default new NoteService()
