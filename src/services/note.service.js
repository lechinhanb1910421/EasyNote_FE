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
  async updateNote(payload) {
    return (await this.api.put(`/${payload.id}`, payload)).data
  }
  async deleteNote(id) {
    return (await this.api.delete(`/${id}`)).data
  }
  async addNote(payload) {
    return (await this.api.post('/add', payload)).data
  }
}

export default new NoteService()
